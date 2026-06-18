use clash_xiaoy_lib::config::profile::item::try_convert_and_sanitize;
use std::fs;

fn main() {
    println!("=== Testing Convert Logic ===");

    // 1. 准备混合协议的节点列表（包含 Base64 加密与明文）
    let raw_links = vec![
        "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@127.0.0.1:1080#测试Shadowsocks节点",
        "vmess://eyJ2IjoiMiIsInBzIjoi5rWL6K+VVk1lc3Pio6IiLCJhZGQiOiIxMjcuMC4wLjEiLCJwb3J0IjoiMTAwODYiLCJpZCI6ImE4YjktYzg5ZC00OGUzLWExYjItYzNkNCIsImFpZCI6IjAiLCJzY3kiOiJhdXRvIiwibmV0Ijoid3MiLCJwYXRoIjoiL3dhdGNoIiwiZ3JwYy1zZXJ2aWNlLW5hbWUiOiIiLCJ0bHMiOiJ0bHMifQ==",
        "vless://uuid-vless-1234@127.0.0.1:443?security=reality&pbk=hDdu2MxcfCcba5G7zrw4Ar9y8Jgd3A9B2v9011Jgd0w&sid=8f2a4e&sni=target.com&type=grpc&serviceName=grpc-vless#测试VLESSReality节点",
        "trojan://password123@127.0.0.1:1088?sni=trojan.com#测试Trojan节点",
        "hysteria2://auth123@127.0.0.1:2000?sni=hy2.com&insecure=1#测试Hysteria2节点",
        "tuic://uuid-tuic:pass-tuic@127.0.0.1:3000?sni=tuic.com&alpn=h3#测试TUIC节点"
    ].join("\n");

    // 2. 对这一串链接进行 Base64 编码，模拟典型的 Base64 订阅返回数据
    let b64_subscription = base64::Engine::encode(&base64::engine::general_purpose::STANDARD, raw_links);

    println!("Converting Base64 subscription...");
    match try_convert_and_sanitize(&b64_subscription) {
        Ok(mapping) => {
            println!("Conversion successful!");
            let yaml_str = serde_yaml::to_string(&mapping).unwrap();
            
            // 将转换生成的配置文件保存到测试目录中
            let output_path = "tauri/tests/converted_test.yaml";
            fs::write(output_path, &yaml_str).expect("Failed to write yaml file");
            println!("YAML config written to: {}", output_path);
        }
        Err(e) => {
            eprintln!("Conversion failed: {}", e);
            std::process::exit(1);
        }
    }
}
