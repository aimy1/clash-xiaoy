use chrono::{DateTime, SecondsFormat, Utc};
use rustc_version::version_meta;
use serde::Deserialize;
use std::{
    env,
    fs::{exists, read},
    process::Command,
};
#[derive(Deserialize)]
struct PackageJson {
    version: String, // we only need the version
}

#[derive(Deserialize)]
struct GitInfo {
    hash: String,
    author: String,
    time: String,
}

fn main() {
    let version: String = match exists("../../package.json") {
        Ok(true) => {
            match read("../../package.json") {
                Ok(raw) => {
                    match serde_json::from_slice(&raw) {
                        Ok(pkg_json) => {
                            let pkg_json: PackageJson = pkg_json;
                            pkg_json.version
                        }
                        Err(_) => "2.7.20".to_string()
                    }
                }
                Err(_) => {
                    match read("./tauri.conf.json") {
                        Ok(raw) => {
                            match serde_json::from_slice(&raw) {
                                Ok(tauri_json) => {
                                    let tauri_json: PackageJson = tauri_json;
                                    tauri_json.version
                                }
                                Err(_) => "2.7.20".to_string()
                            }
                        }
                        Err(_) => "2.7.20".to_string()
                    }
                }
            }
        }
        _ => {
            match read("./tauri.conf.json") {
                Ok(raw) => {
                    match serde_json::from_slice(&raw) {
                        Ok(tauri_json) => {
                            let tauri_json: PackageJson = tauri_json;
                            tauri_json.version
                        }
                        Err(_) => "2.7.20".to_string()
                    }
                }
                Err(_) => "2.7.20".to_string()
            }
        }
    };
    let version = match semver::Version::parse(&version) {
        Ok(v) => v,
        Err(_) => semver::Version::parse("2.7.20").unwrap()
    };
    let is_prerelase = !version.pre.is_empty();
    println!("cargo:rustc-env=NYANPASU_VERSION={version}");
    println!("cargo:rustc-env=CLASH_XIAOY_VERSION={version}");
    // Git Information
    let (commit_hash, commit_author, commit_date) = if let Ok(true) = exists("./tmp/git-info.json")
    {
        match read("./tmp/git-info.json") {
            Ok(git_info) => {
                match serde_json::from_slice(&git_info) {
                    Ok(git_info) => {
                        let git_info: GitInfo = git_info;
                        (git_info.hash, git_info.author, git_info.time)
                    }
                    Err(_) => ("unknown".to_string(), "unknown".to_string(), Utc::now().to_rfc3339_opts(SecondsFormat::Millis, true))
                }
            }
            Err(_) => ("unknown".to_string(), "unknown".to_string(), Utc::now().to_rfc3339_opts(SecondsFormat::Millis, true))
        }
    } else {
        ("unknown".to_string(), "unknown".to_string(), Utc::now().to_rfc3339_opts(SecondsFormat::Millis, true))
    };
    println!("cargo:rustc-env=COMMIT_HASH={commit_hash}");
    println!("cargo:rustc-env=COMMIT_AUTHOR={commit_author}");
    let commit_date = match DateTime::parse_from_rfc3339(&commit_date) {
        Ok(date) => date.with_timezone(&Utc).to_rfc3339_opts(SecondsFormat::Millis, true),
        Err(_) => Utc::now().to_rfc3339_opts(SecondsFormat::Millis, true)
    };
    println!("cargo:rustc-env=COMMIT_DATE={commit_date}");

    // Build Date
    let build_date = Utc::now().to_rfc3339_opts(SecondsFormat::Millis, true);
    println!("cargo:rustc-env=BUILD_DATE={build_date}");

    // Build Profile
    println!(
        "cargo:rustc-env=BUILD_PROFILE={}",
        if is_prerelase {
            "Nightly"
        } else {
            match env::var("PROFILE") {
                Ok(profile) => match profile.as_str() {
                    "release" => "Release",
                    "debug" => "Debug",
                    _ => "Unknown",
                },
                Err(_) => "Unknown"
            }
        }
    );
    // Build Platform
    println!(
        "cargo:rustc-env=BUILD_PLATFORM={}",
        match env::var("TARGET") {
            Ok(target) => target,
            Err(_) => "unknown".to_string()
        }
    );
    // Rustc Version & LLVM Version
    let rustc_version = match version_meta() {
        Ok(v) => v,
        Err(_) => return
    };
    println!(
        "cargo:rustc-env=RUSTC_VERSION={}",
        rustc_version.short_version_string
    );
    println!(
        "cargo:rustc-env=LLVM_VERSION={}",
        match rustc_version.llvm_version {
            Some(v) => v.to_string(),
            None => "Unknown".to_string(),
        }
    );
    tauri_build::build()
}
