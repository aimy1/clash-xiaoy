use base64::{Engine, engine::general_purpose};
use serde_yaml::{Mapping, Value};
use std::collections::{HashSet, HashMap};
use url::Url;

/// 尝试将输入的内容转换为 Mihomo (Clash Meta) Mapping
/// 如果内容是 Base64 或者是节点分享链接列表，将其解析并组装为完整配置；
/// 如果是普通的 YAML，则解析之，并清洗其中过期的不兼容字段。
pub fn try_convert_and_sanitize(data: &str) -> anyhow::Result<Mapping> {
    let trimmed = data.trim();
    if trimmed.is_empty() {
        return Err(anyhow::anyhow!("input data is empty"));
    }

    // 1. 尝试 Base64 解码，看是否包含节点或 YAML
    let working_data = try_base64_decode(trimmed).unwrap_or_else(|| trimmed.to_string());

    // 2. 检查数据中是否包含至少一个合法的单节点协议前缀的行
    let mut proxies = Vec::new();
    for line in working_data.lines() {
        let line = line.trim();
        if line.is_empty() || line.starts_with('#') || line.starts_with("//") {
            continue;
        }

        let node_map = if line.starts_with("ss://") {
            parse_ss(line).ok()
        } else if line.starts_with("vmess://") {
            parse_vmess(line).ok()
        } else if line.starts_with("vless://") {
            parse_vless(line).ok()
        } else if line.starts_with("trojan://") {
            parse_trojan(line).ok()
        } else if line.starts_with("hysteria2://") || line.starts_with("hy2://") {
            parse_hysteria2(line).ok()
        } else if line.starts_with("tuic://") {
            parse_tuic(line).ok()
        } else {
            None
        };

        if let Some(map) = node_map {
            proxies.push(map);
        }
    }

    let mut mapping = if !proxies.is_empty() {
        // 解析出了单节点，自动生成完整 Clash Meta 配置
        build_clash_meta_config(proxies)
    } else {
        // 没有解析出节点链接，它可能是一个直接的 YAML 字符串 (可能是 base64 解密出来的，或者是未加密的)
        serde_yaml::from_str::<Mapping>(trimmed)
            .or_else(|_| serde_yaml::from_str::<Mapping>(&working_data))?
    };

    // 3. 对 Mapping 执行最后的检查和清理
    sanitize_mapping(&mut mapping);

    Ok(mapping)
}

/// 尝试使用各种 base64 方式解码
fn try_base64_decode(data: &str) -> Option<String> {
    let cleaned = data.trim().replace("\r", "").replace("\n", "").replace(" ", "");
    if let Ok(bytes) = general_purpose::STANDARD.decode(&cleaned) {
        if let Ok(s) = String::from_utf8(bytes) {
            return Some(s);
        }
    }
    if let Ok(bytes) = general_purpose::URL_SAFE.decode(&cleaned) {
        if let Ok(s) = String::from_utf8(bytes) {
            return Some(s);
        }
    }
    if let Ok(bytes) = general_purpose::STANDARD_NO_PAD.decode(&cleaned) {
        if let Ok(s) = String::from_utf8(bytes) {
            return Some(s);
        }
    }
    if let Ok(bytes) = general_purpose::URL_SAFE_NO_PAD.decode(&cleaned) {
        if let Ok(s) = String::from_utf8(bytes) {
            return Some(s);
        }
    }
    None
}

/// 解析 Shadowsocks (ss://)
/// 格式: ss://BASE64_ENCODED@server:port#remarks 或 ss://BASE64(method:password@server:port)
fn parse_ss(link: &str) -> anyhow::Result<Mapping> {
    let cleaned = link.strip_prefix("ss://").unwrap_or(link);
    let mut has_at = false;
    let mut before_at = "";
    let mut after_at = "";
    if let Some(pos) = cleaned.find('@') {
        has_at = true;
        before_at = &cleaned[..pos];
        after_at = &cleaned[pos + 1..];
    }

    let (method_pw, server_part) = if has_at {
        let decoded = try_base64_decode(before_at).unwrap_or_else(|| before_at.to_string());
        (decoded, after_at.to_string())
    } else {
        // 没有 @ 符号，可能是整个都进行了 base64 编码
        let base_part = cleaned.split(&['#', '?'][..]).next().unwrap_or(cleaned);
        let decoded = try_base64_decode(base_part)
            .ok_or_else(|| anyhow::anyhow!("invalid ss base64 format"))?;
        if let Some(pos) = decoded.find('@') {
            let b_at = &decoded[..pos];
            let mut a_at = decoded[pos + 1..].to_string();
            if let Some(idx) = cleaned.find('?') {
                a_at.push_str(&cleaned[idx..]);
            } else if let Some(idx) = cleaned.find('#') {
                a_at.push_str(&cleaned[idx..]);
            }
            (b_at.to_string(), a_at)
        } else {
            return Err(anyhow::anyhow!("invalid decoded ss link: missing @"));
        }
    };

    let parts: Vec<&str> = method_pw.splitn(2, ':').collect();
    if parts.len() < 2 {
        return Err(anyhow::anyhow!("invalid ss method:password structure"));
    }
    let method = parts[0].to_string();
    let password = parts[1].to_string();

    let pseudo_url_str = if server_part.contains("://") {
        server_part.clone()
    } else {
        format!("http://{}", server_part)
    };
    let parsed_url = Url::parse(&pseudo_url_str)?;
    let server = parsed_url.host_str().unwrap_or("").to_string();
    let port = parsed_url.port().unwrap_or(0);

    let remarks = match parsed_url.fragment() {
        Some(f) => percent_encoding::percent_decode_str(f).decode_utf8_lossy().into_owned(),
        None => format!("ss-{}:{}", server, port),
    };

    let mut map = Mapping::new();
    map.insert("type".into(), "ss".into());
    map.insert("name".into(), remarks.trim().into());
    map.insert("server".into(), server.into());
    map.insert("port".into(), port.into());
    map.insert("cipher".into(), method.into());
    map.insert("password".into(), password.into());

    let mut query_params = HashMap::new();
    for (k, v) in parsed_url.query_pairs() {
        query_params.insert(k.into_owned(), v.into_owned());
    }

    if let Some(plugin_str) = query_params.get("plugin") {
        let plugin_parts: Vec<&str> = plugin_str.split(';').collect();
        if !plugin_parts.is_empty() {
            let plugin_name = plugin_parts[0].to_string();
            map.insert("plugin".into(), plugin_name.into());

            let mut plugin_opts = Mapping::new();
            for opt in &plugin_parts[1..] {
                let opt_parts: Vec<&str> = opt.splitn(2, '=').collect();
                if opt_parts.len() == 2 {
                    plugin_opts.insert(opt_parts[0].into(), opt_parts[1].into());
                } else if opt_parts.len() == 1 {
                    plugin_opts.insert(opt_parts[0].into(), true.into());
                }
            }
            if !plugin_opts.is_empty() {
                map.insert("plugin-opts".into(), Value::Mapping(plugin_opts));
            }
        }
    }

    Ok(map)
}

/// 解析 VMess (vmess://)
fn parse_vmess(link: &str) -> anyhow::Result<Mapping> {
    let raw_b64 = link.strip_prefix("vmess://").unwrap_or(link).trim();
    let decoded_bytes = try_base64_decode(raw_b64)
        .map(|s| s.into_bytes())
        .or_else(|| general_purpose::STANDARD.decode(raw_b64).ok())
        .or_else(|| general_purpose::URL_SAFE.decode(raw_b64).ok())
        .or_else(|| general_purpose::STANDARD_NO_PAD.decode(raw_b64).ok())
        .ok_or_else(|| anyhow::anyhow!("failed to decode vmess base64"))?;

    let decoded_str = String::from_utf8(decoded_bytes)?;
    let val: serde_json::Value = serde_json::from_str(&decoded_str)?;

    let mut map = Mapping::new();
    map.insert("type".into(), "vmess".into());

    let name = val["ps"].as_str().unwrap_or("vmess-node").to_string();
    map.insert("name".into(), name.trim().into());

    let server = val["add"].as_str().unwrap_or("").to_string();
    map.insert("server".into(), server.into());

    let port = match &val["port"] {
        serde_json::Value::Number(n) => n.as_u64().unwrap_or(0) as u16,
        serde_json::Value::String(s) => s.parse::<u16>().unwrap_or(0),
        _ => 0,
    };
    map.insert("port".into(), port.into());

    let uuid = val["id"].as_str().unwrap_or("").to_string();
    map.insert("uuid".into(), uuid.into());

    let alter_id = match &val["aid"] {
        serde_json::Value::Number(n) => n.as_u64().unwrap_or(0) as u32,
        serde_json::Value::String(s) => s.parse::<u32>().unwrap_or(0),
        _ => 0,
    };
    map.insert("alterId".into(), alter_id.into());

    let cipher = val["scy"].as_str().unwrap_or("auto").to_string();
    map.insert("cipher".into(), cipher.into());

    let tls = match &val["tls"] {
        serde_json::Value::String(s) => s == "tls",
        serde_json::Value::Bool(b) => *b,
        _ => false,
    };
    map.insert("tls".into(), tls.into());

    if let Some(sni) = val["sni"].as_str() {
        if !sni.is_empty() {
            map.insert("servername".into(), sni.to_string().into());
        }
    }

    let network = val["net"].as_str().unwrap_or("tcp").to_string();
    if network != "tcp" {
        map.insert("network".into(), network.clone().into());
        if network == "ws" {
            let mut ws_opts = Mapping::new();
            let path = val["path"].as_str().unwrap_or("/").to_string();
            ws_opts.insert("path".into(), path.into());

            let host = val["host"].as_str().unwrap_or("").to_string();
            if !host.is_empty() {
                let mut headers = Mapping::new();
                headers.insert("Host".into(), host.into());
                ws_opts.insert("headers".into(), Value::Mapping(headers));
            }
            map.insert("ws-opts".into(), Value::Mapping(ws_opts));
        } else if network == "grpc" {
            let mut grpc_opts = Mapping::new();
            let service_name = val["path"].as_str()
                .or_else(|| val["serviceName"].as_str())
                .unwrap_or("")
                .to_string();
            grpc_opts.insert("grpc-service-name".into(), service_name.into());
            map.insert("grpc-opts".into(), Value::Mapping(grpc_opts));
        }
    }

    Ok(map)
}

/// 解析 VLESS (vless://)
fn parse_vless(link: &str) -> anyhow::Result<Mapping> {
    let parsed_url = Url::parse(link)?;
    let uuid = parsed_url.username().to_string();
    let server = parsed_url.host_str().unwrap_or("").to_string();
    let port = parsed_url.port().unwrap_or(0);

    let mut map = Mapping::new();
    map.insert("type".into(), "vless".into());

    let remarks = match parsed_url.fragment() {
        Some(f) => percent_encoding::percent_decode_str(f).decode_utf8_lossy().into_owned(),
        None => format!("vless-{}:{}", server, port),
    };
    map.insert("name".into(), remarks.trim().into());
    map.insert("server".into(), server.into());
    map.insert("port".into(), port.into());
    map.insert("uuid".into(), uuid.into());
    map.insert("cipher".into(), "none".into());

    let mut query_params = HashMap::new();
    for (k, v) in parsed_url.query_pairs() {
        query_params.insert(k.into_owned(), v.into_owned());
    }

    let security = query_params.get("security").cloned().unwrap_or_default();
    if security == "tls" || security == "xtls" || security == "reality" {
        map.insert("tls".into(), true.into());
    }

    if let Some(flow) = query_params.get("flow") {
        map.insert("flow".into(), flow.clone().into());
    }

    if let Some(fp) = query_params.get("fp") {
        map.insert("client-fingerprint".into(), fp.clone().into());
    }

    if security == "reality" {
        let mut reality_opts = Mapping::new();
        if let Some(pbk) = query_params.get("pbk") {
            reality_opts.insert("public-key".into(), pbk.clone().into());
        }
        if let Some(sid) = query_params.get("sid") {
            reality_opts.insert("short-id".into(), sid.clone().into());
        }
        map.insert("reality-opts".into(), Value::Mapping(reality_opts));
    }

    let network = query_params.get("type").or_else(|| query_params.get("net")).cloned().unwrap_or("tcp".to_string());
    if network != "tcp" {
        map.insert("network".into(), network.clone().into());
        if network == "ws" {
            let mut ws_opts = Mapping::new();
            let path = query_params.get("path").cloned().unwrap_or("/".to_string());
            ws_opts.insert("path".into(), path.into());
            if let Some(host) = query_params.get("host") {
                let mut headers = Mapping::new();
                headers.insert("Host".into(), host.clone().into());
                ws_opts.insert("headers".into(), Value::Mapping(headers));
            }
            map.insert("ws-opts".into(), Value::Mapping(ws_opts));
        } else if network == "grpc" {
            let mut grpc_opts = Mapping::new();
            let service_name = query_params.get("serviceName").or_else(|| query_params.get("path")).cloned().unwrap_or_default();
            grpc_opts.insert("grpc-service-name".into(), service_name.into());
            map.insert("grpc-opts".into(), Value::Mapping(grpc_opts));
        }
    }

    if let Some(sni) = query_params.get("sni") {
        map.insert("servername".into(), sni.clone().into());
    }

    Ok(map)
}

/// 解析 Trojan (trojan://)
fn parse_trojan(link: &str) -> anyhow::Result<Mapping> {
    let parsed_url = Url::parse(link)?;
    let password = parsed_url.username().to_string();
    let server = parsed_url.host_str().unwrap_or("").to_string();
    let port = parsed_url.port().unwrap_or(0);

    let remarks = match parsed_url.fragment() {
        Some(f) => percent_encoding::percent_decode_str(f).decode_utf8_lossy().into_owned(),
        None => format!("trojan-{}:{}", server, port),
    };

    let mut map = Mapping::new();
    map.insert("type".into(), "trojan".into());
    map.insert("name".into(), remarks.trim().into());
    map.insert("server".into(), server.into());
    map.insert("port".into(), port.into());
    map.insert("password".into(), password.into());

    let mut query_params = HashMap::new();
    for (k, v) in parsed_url.query_pairs() {
        query_params.insert(k.into_owned(), v.into_owned());
    }

    if let Some(sni) = query_params.get("sni").or_else(|| query_params.get("peer")) {
        map.insert("sni".into(), sni.clone().into());
    }

    if let Some(allow_insecure) = query_params.get("allowInsecure") {
        let skip = allow_insecure == "1" || allow_insecure == "true";
        map.insert("skip-cert-verify".into(), skip.into());
    }

    let network = query_params.get("type").or_else(|| query_params.get("net")).cloned().unwrap_or("tcp".to_string());
    if network != "tcp" {
        map.insert("network".into(), network.clone().into());
        if network == "ws" {
            let mut ws_opts = Mapping::new();
            let path = query_params.get("path").cloned().unwrap_or("/".to_string());
            ws_opts.insert("path".into(), path.into());
            if let Some(host) = query_params.get("host") {
                let mut headers = Mapping::new();
                headers.insert("Host".into(), host.clone().into());
                ws_opts.insert("headers".into(), Value::Mapping(headers));
            }
            map.insert("ws-opts".into(), Value::Mapping(ws_opts));
        } else if network == "grpc" {
            let mut grpc_opts = Mapping::new();
            let service_name = query_params.get("serviceName").or_else(|| query_params.get("path")).cloned().unwrap_or_default();
            grpc_opts.insert("grpc-service-name".into(), service_name.into());
            map.insert("grpc-opts".into(), Value::Mapping(grpc_opts));
        }
    }

    Ok(map)
}

/// 解析 Hysteria2 (hysteria2:// 或 hy2://)
fn parse_hysteria2(link: &str) -> anyhow::Result<Mapping> {
    let normalized = if link.starts_with("hy2://") {
        format!("hysteria2://{}", &link[6..])
    } else {
        link.to_string()
    };
    let parsed_url = Url::parse(&normalized)?;
    let auth = parsed_url.username().to_string();
    let server = parsed_url.host_str().unwrap_or("").to_string();
    let port = parsed_url.port().unwrap_or(0);

    let remarks = match parsed_url.fragment() {
        Some(f) => percent_encoding::percent_decode_str(f).decode_utf8_lossy().into_owned(),
        None => format!("hysteria2-{}:{}", server, port),
    };

    let mut map = Mapping::new();
    map.insert("type".into(), "hysteria2".into());
    map.insert("name".into(), remarks.trim().into());
    map.insert("server".into(), server.into());
    map.insert("port".into(), port.into());
    if !auth.is_empty() {
        map.insert("password".into(), auth.into());
    }

    let mut query_params = HashMap::new();
    for (k, v) in parsed_url.query_pairs() {
        query_params.insert(k.into_owned(), v.into_owned());
    }

    if let Some(sni) = query_params.get("sni") {
        map.insert("sni".into(), sni.clone().into());
    }
    if let Some(insecure) = query_params.get("insecure") {
        let skip = insecure == "1" || insecure == "true";
        map.insert("skip-cert-verify".into(), skip.into());
    }
    if let Some(obfs) = query_params.get("obfs") {
        map.insert("obfs".into(), obfs.clone().into());
    }
    if let Some(obfs_pw) = query_params.get("obfs-password") {
        map.insert("obfs-password".into(), obfs_pw.clone().into());
    }

    Ok(map)
}

/// 解析 TUIC (tuic://)
fn parse_tuic(link: &str) -> anyhow::Result<Mapping> {
    let parsed_url = Url::parse(link)?;
    let uuid = parsed_url.username().to_string();
    let password = parsed_url.password().unwrap_or("").to_string();
    let server = parsed_url.host_str().unwrap_or("").to_string();
    let port = parsed_url.port().unwrap_or(0);

    let remarks = match parsed_url.fragment() {
        Some(f) => percent_encoding::percent_decode_str(f).decode_utf8_lossy().into_owned(),
        None => format!("tuic-{}:{}", server, port),
    };

    let mut map = Mapping::new();
    map.insert("type".into(), "tuic".into());
    map.insert("name".into(), remarks.trim().into());
    map.insert("server".into(), server.into());
    map.insert("port".into(), port.into());
    map.insert("uuid".into(), uuid.into());
    if !password.is_empty() {
        map.insert("password".into(), password.into());
    }

    let mut query_params = HashMap::new();
    for (k, v) in parsed_url.query_pairs() {
        query_params.insert(k.into_owned(), v.into_owned());
    }

    if let Some(sni) = query_params.get("sni") {
        map.insert("sni".into(), sni.clone().into());
    }
    if let Some(insecure) = query_params.get("insecure") {
        let skip = insecure == "1" || insecure == "true";
        map.insert("skip-cert-verify".into(), skip.into());
    }
    if let Some(alpn) = query_params.get("alpn") {
        let alpn_list: Vec<Value> = alpn.split(',').map(|s| s.trim().to_string().into()).collect();
        map.insert("alpn".into(), Value::Sequence(alpn_list));
    }

    Ok(map)
}

/// 补全完整的 Clash Meta (Mihomo) 配置结构，附带核心策略组与基本分流规则
fn build_clash_meta_config(proxies: Vec<Mapping>) -> Mapping {
    let mut config = Mapping::new();

    // 基础全局参数
    config.insert("port".into(), 7890.into());
    config.insert("socks-port".into(), 7891.into());
    config.insert("mixed-port".into(), 7893.into());
    config.insert("allow-lan".into(), true.into());
    config.insert("mode".into(), "rule".into());
    config.insert("log-level".into(), "info".into());
    config.insert("external-controller".into(), "127.0.0.1:9090".into());

    // DNS 配置
    let mut dns = Mapping::new();
    dns.insert("enable".into(), true.into());
    dns.insert("ipv6".into(), false.into());
    dns.insert("enhanced-mode".into(), "fake-ip".into());
    dns.insert("fake-ip-range".into(), "198.18.0.1/16".into());

    let dns_servers: Vec<Value> = vec![
        "223.5.5.5".into(),
        "119.29.29.29".into(),
    ];
    dns.insert("nameserver".into(), Value::Sequence(dns_servers));

    let fallback_servers: Vec<Value> = vec![
        "8.8.8.8".into(),
        "1.1.1.1".into(),
        "https://dns.cloudflare.com/dns-query".into(),
    ];
    dns.insert("fallback".into(), Value::Sequence(fallback_servers));
    config.insert("dns".into(), Value::Mapping(dns));

    // 处理代理节点名排重
    let mut name_counts = HashMap::new();
    let mut final_proxies = Vec::new();
    let mut node_names = Vec::new();

    for mut p in proxies {
        let raw_name = p.get(&Value::String("name".to_string()))
            .and_then(|v| v.as_str())
            .unwrap_or("Node")
            .to_string();

        let count = name_counts.entry(raw_name.clone()).or_insert(0);
        let final_name = if *count == 0 {
            raw_name
        } else {
            format!("{}-{}", raw_name, count)
        };
        *count += 1;

        p.insert("name".into(), final_name.clone().into());
        node_names.push(Value::String(final_name));
        final_proxies.push(Value::Mapping(p));
    }

    config.insert("proxies".into(), Value::Sequence(final_proxies));

    // 核心策略组
    let mut proxy_groups = Vec::new();

    // 🚀 Proxy 节点选择策略组
    let mut proxy_group = Mapping::new();
    proxy_group.insert("name".into(), "Proxy".into());
    proxy_group.insert("type".into(), "select".into());
    let mut proxy_group_proxies = vec![
        Value::String("AUTO".to_string()),
        Value::String("FALLBACK".to_string()),
        Value::String("DIRECT".to_string()),
    ];
    proxy_group_proxies.extend(node_names.clone());
    proxy_group.insert("proxies".into(), Value::Sequence(proxy_group_proxies));
    proxy_groups.push(Value::Mapping(proxy_group));

    // ⚡ AUTO 自动选择延迟低节点
    let mut auto_group = Mapping::new();
    auto_group.insert("name".into(), "AUTO".into());
    auto_group.insert("type".into(), "url-test".into());
    auto_group.insert("url".into(), "http://www.gstatic.com/generate_204".into());
    auto_group.insert("interval".into(), 300.into());
    auto_group.insert("proxies".into(), Value::Sequence(node_names.clone()));
    proxy_groups.push(Value::Mapping(auto_group));

    // 🛡️ FALLBACK 故障自动转移
    let mut fallback_group = Mapping::new();
    fallback_group.insert("name".into(), "FALLBACK".into());
    fallback_group.insert("type".into(), "fallback".into());
    fallback_group.insert("url".into(), "http://www.gstatic.com/generate_204".into());
    fallback_group.insert("interval".into(), 300.into());
    fallback_group.insert("proxies".into(), Value::Sequence(node_names.clone()));
    proxy_groups.push(Value::Mapping(fallback_group));

    config.insert("proxy-groups".into(), Value::Sequence(proxy_groups));

    // 基础路由规则
    let rules: Vec<Value> = vec![
        "GEOIP,CN,DIRECT".into(),
        "GEOSITE,CN,DIRECT".into(),
        "MATCH,Proxy".into(),
    ];
    config.insert("rules".into(), Value::Sequence(rules));

    config
}

/// 清洗和修复已有的 Mapping 内容以在最新版内核正常工作
fn sanitize_mapping(mapping: &mut Mapping) {
    // 1. 清理全局废弃指纹字段
    mapping.remove(&Value::String("global-client-fingerprint".to_string()));

    // 2. 清洗 proxy-groups
    if let Some(groups_val) = mapping.get_mut(&Value::String("proxy-groups".to_string())) {
        if let Some(groups) = groups_val.as_sequence_mut() {
            for group_val in groups {
                if let Some(group) = group_val.as_mapping_mut() {
                    let type_key = Value::String("type".to_string());
                    if let Some(type_val) = group.get(&type_key) {
                        if type_val.as_str() == Some("relay") {
                            group.insert(type_key, Value::String("select".to_string()));
                        }
                    }
                }
            }
        }
    }

    // 3. 修复 proxies 属性中的被误解析为数组的占位符/字符
    if let Some(proxies_val) = mapping.get_mut(&Value::String("proxies".to_string())) {
        if let Some(proxies) = proxies_val.as_sequence_mut() {
            for proxy_val in proxies {
                if let Some(proxy) = proxy_val.as_mapping_mut() {
                    sanitize_proxy_fields(proxy);
                }
            }
        }
    }
}

fn sanitize_proxy_fields(proxy: &mut Mapping) {
    let fields = vec!["server", "password", "uuid", "public-key", "short-id"];
    for field in fields {
        let key = Value::String(field.to_string());
        if let Some(val) = proxy.get(&key) {
            if let Some(seq) = val.as_sequence() {
                let s = seq.iter()
                    .filter_map(|v| v.as_str())
                    .collect::<Vec<&str>>()
                    .join(", ");
                let s_val = if s.is_empty() {
                    let raw_str = serde_json::to_string(seq).unwrap_or_default();
                    let trimmed = raw_str.trim_start_matches('[').trim_end_matches(']').trim().to_string();
                    trimmed.replace('\"', "")
                } else {
                    s
                };
                proxy.insert(key, Value::String(s_val));
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_base64_decode() {
        let decoded = try_base64_decode("c3M6Ly9tZXRob2Q6cGFzc3dvcmRAMTI3LjAuMC4xOjEwODAjVGVzdE5vZGU=");
        assert!(decoded.is_some());
        assert_eq!(decoded.unwrap(), "ss://method:password@127.0.0.1:1080#TestNode");
    }

    #[test]
    fn test_parse_ss() {
        let ss = "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@127.0.0.1:1080#TestSS";
        let map = parse_ss(ss).unwrap();
        assert_eq!(map.get(&Value::String("type".to_string())).unwrap().as_str().unwrap(), "ss");
        assert_eq!(map.get(&Value::String("name".to_string())).unwrap().as_str().unwrap(), "TestSS");
        assert_eq!(map.get(&Value::String("server".to_string())).unwrap().as_str().unwrap(), "127.0.0.1");
        assert_eq!(map.get(&Value::String("port".to_string())).unwrap().as_u64().unwrap(), 1080);
        assert_eq!(map.get(&Value::String("cipher".to_string())).unwrap().as_str().unwrap(), "aes-256-gcm");
        assert_eq!(map.get(&Value::String("password".to_string())).unwrap().as_str().unwrap(), "password");
    }

    #[test]
    fn test_parse_vmess() {
        let json_vmess = r#"{"v":"2","ps":"TestVMess","add":"127.0.0.1","port":"10086","id":"uuid-uuid","aid":"0","scy":"auto","net":"ws","path":"/path","tls":"tls"}"#;
        let b64 = general_purpose::STANDARD.encode(json_vmess);
        let link = format!("vmess://{}", b64);
        let map = parse_vmess(&link).unwrap();
        assert_eq!(map.get(&Value::String("type".to_string())).unwrap().as_str().unwrap(), "vmess");
        assert_eq!(map.get(&Value::String("name".to_string())).unwrap().as_str().unwrap(), "TestVMess");
        assert_eq!(map.get(&Value::String("server".to_string())).unwrap().as_str().unwrap(), "127.0.0.1");
        assert_eq!(map.get(&Value::String("port".to_string())).unwrap().as_u64().unwrap(), 10086);
        assert_eq!(map.get(&Value::String("uuid".to_string())).unwrap().as_str().unwrap(), "uuid-uuid");
        assert_eq!(map.get(&Value::String("network".to_string())).unwrap().as_str().unwrap(), "ws");
    }

    #[test]
    fn test_try_convert_and_sanitize() {
        // 单节点 Base64 订阅测试
        let raw = "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@127.0.0.1:1080#TestSS\nvmess://eyJ2IjoiMiIsInBzIjoiVGVzdFZNZXNzIiwiYWRkIjoiMTI3LjAuMC4xIiwicG9ydCI6IjEwMDg2IiwiaWQiOiJ1dWlkLXV1aWQiLCJhaWQiOiIwIiwic2N5IjoiYXV0byIsIm5ldCI6IndzIiwicGF0aCI6Ii9wYXRoIiwidGxzIjoidGxzIn0=\n";
        let b64 = general_purpose::STANDARD.encode(raw);
        let mapping = try_convert_and_sanitize(&b64).unwrap();

        let proxies = mapping.get(&Value::String("proxies".to_string())).unwrap().as_sequence().unwrap();
        assert_eq!(proxies.len(), 2);
        assert_eq!(proxies[0].get(&Value::String("name".to_string())).unwrap().as_str().unwrap(), "TestSS");
        assert_eq!(proxies[1].get(&Value::String("name".to_string())).unwrap().as_str().unwrap(), "TestVMess");
    }
}
