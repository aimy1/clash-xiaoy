use std::{borrow::Cow, collections::HashMap};

#[cfg(windows)]
use std::os::windows::process::CommandExt;

use crate::consts::{BUILD_INFO, BuildInfo};
use humansize::{BINARY, SizeFormatter};
use nyanpasu_utils::core::{ClashCoreType, CoreType};
use serde::Serialize;
use sysinfo::System;

#[derive(Debug, Serialize, specta::Type)]
pub struct DeviceInfo<'a> {
    /// Device name, such as "Intel Core i5-8250U CPU @ 1.60GHz x 8"
    pub cpu: Vec<Cow<'a, str>>,
    /// GPU name, such as "Intel UHD Graphics 620 (Kabylake GT2)"
    pub gpu: Vec<Cow<'a, str>>,
    /// Memory size in bytes
    pub memory: Cow<'a, str>,
    /// System uptime in seconds
    pub uptime: u64,
    /// Kernel version
    pub kernel: Cow<'a, str>,
}

#[derive(Debug, Serialize, specta::Type)]
pub struct EnvInfo<'a> {
    pub os: Cow<'a, str>,
    pub arch: Cow<'a, str>,
    pub core: CoreInfo<'a>,
    pub device: DeviceInfo<'a>,
    pub build_info: Cow<'a, BuildInfo>,
    // TODO: add service info
    // pub service_info: xxx
}

pub type CoreInfo<'a> = HashMap<Cow<'a, str>, Cow<'a, str>>;

#[cfg(windows)]
fn get_gpu_info() -> Vec<String> {
    use serde::Deserialize;
    // In wmi 0.18+, WMIConnection and COMLibrary might have changed.
    // If COMLibrary is gone, we just use WMIConnection.
    use wmi::WMIConnection;

    #[derive(Deserialize, Debug)]
    #[serde(rename = "Win32_VideoController")]
    #[serde(rename_all = "PascalCase")]
    struct VideoController {
        name: String,
    }

    // Attempt to create WMI connection directly.
    // Note: This requires COM to be initialized. In a typical Windows app,
    // the runtime or winit might have already initialized it.
    // If not, we might need unsafe { CoInitializeEx(...) } or similar,
    // but wmi crate usually handles this or provides helpers.
    // Given the error history, we'll try the simplest WMIConnection::new() first.
    let wmi_con = WMIConnection::new().ok();

    if let Some(wmi_con) = wmi_con {
        let results: Result<Vec<VideoController>, _> = wmi_con.query();
        if let Ok(results) = results {
            return results.into_iter().map(|v| v.name).collect();
        }
    }
    vec![]
}

#[cfg(not(windows))]
fn get_gpu_info() -> Vec<String> {
    vec![]
}

pub fn collect_envs<'a>() -> Result<EnvInfo<'a>, std::io::Error> {
    let mut system = sysinfo::System::new_all();
    system.refresh_all();

    let device = DeviceInfo {
        cpu: {
            let mut cpus: Vec<(u64, &str, i32)> = Vec::new();
            for cpu in system.cpus().iter() {
                let item = cpus.iter_mut().find(|(_, name, _)| name == &cpu.brand());
                match item {
                    Some((_, _, count)) => *count += 1,
                    None => cpus.push((cpu.frequency(), cpu.brand(), 1)),
                }
            }
            cpus.iter()
                .map(|(freq, name, count)| {
                    Cow::Owned(format!(
                        "{} @ {:.2}GHz x {}",
                        name,
                        *freq as f64 / 1000.0,
                        count
                    ))
                })
                .collect()
        },
        gpu: get_gpu_info().into_iter().map(Cow::Owned).collect(),
        memory: Cow::Owned(SizeFormatter::new(system.total_memory(), BINARY).to_string()),
        uptime: System::uptime(),
        kernel: Cow::Owned(System::kernel_version().unwrap_or("".to_string())),
    };

    let mut core = HashMap::new();
    for c in CoreType::get_supported_cores() {
        let name: &str = c.as_ref();

        let mut command = std::process::Command::new(
            super::dirs::get_data_or_sidecar_path(name)
                .map_err(|e| std::io::Error::other(e.to_string()))?,
        );
        command.args(if matches!(c, CoreType::Clash(ClashCoreType::ClashRust)) {
            ["-V"]
        } else {
            ["-v"]
        });
        #[cfg(windows)]
        let command = command.creation_flags(0x08000000);
        let output = command.output().expect("failed to execute sidecar command");
        let stdout = String::from_utf8_lossy(&output.stdout);
        core.insert(
            Cow::Borrowed(name),
            Cow::Owned(stdout.replace("\n\n", " ").trim().to_owned()),
        );
    }
    Ok(EnvInfo {
        os: Cow::Owned(System::long_os_version().unwrap_or("".to_string())),
        arch: Cow::Owned(System::cpu_arch()),
        core,
        device,
        build_info: Cow::Borrowed(&BUILD_INFO),
    })
}
