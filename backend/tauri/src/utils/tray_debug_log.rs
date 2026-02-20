use std::{
    env,
    fs::{self, OpenOptions},
    io::Write,
    path::PathBuf,
};

use chrono::Utc;
use tauri::{AppHandle, Manager, Runtime, WebviewWindow};

fn log_file() -> Option<PathBuf> {
    let appdata = env::var_os("APPDATA")?;
    let mut path = PathBuf::from(appdata);
    path.push("clash-xiaoy");
    path.push("tray-debug.log");
    Some(path)
}

pub fn log(msg: impl AsRef<str>) {
    let Some(log_file) = log_file() else {
        return;
    };
    if let Some(parent) = log_file.parent() {
        let _ = fs::create_dir_all(parent);
    }
    let mut file = match OpenOptions::new().create(true).append(true).open(&log_file) {
        Ok(f) => f,
        Err(_) => return,
    };
    let _ = writeln!(file, "[{}] {}", Utc::now().to_rfc3339(), msg.as_ref());
}

pub fn log_webview_window_state<R: Runtime>(prefix: &str, window: &WebviewWindow<R>) {
    let visible = window.is_visible().map(|v| v.to_string()).unwrap_or_else(|e| e.to_string());
    let size = window
        .outer_size()
        .map(|s| format!("{}x{}", s.width, s.height))
        .unwrap_or_else(|e| e.to_string());
    let pos = window
        .outer_position()
        .map(|p| format!("{},{}", p.x, p.y))
        .unwrap_or_else(|e| e.to_string());
    log(format!(
        "{prefix} state visible={visible} size={size} position={pos}"
    ));
}

pub fn log_window_lookup<R: Runtime>(prefix: &str, app_handle: &AppHandle<R>, label: &str) {
    match app_handle.get_webview_window(label) {
        Some(win) => {
            log(format!("{prefix} window label={label} found"));
            log_webview_window_state(prefix, &win);
        }
        None => {
            log(format!("{prefix} window label={label} not_found"));
        }
    }
}

