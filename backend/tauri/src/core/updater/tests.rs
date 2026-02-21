use super::{
    super::super::config::{Config, xiaoy::ClashCore},
    UpdaterManager,
};
use crate::utils::dirs;
use std::time::Duration;

#[tokio::test]
async fn test_update_mihomo_core_from_github_and_replace() {
    let verge = Config::verge();
    verge.draft().clash_core = Some(ClashCore::ClashRs);
    verge.apply();

    let mut mgr: tokio::sync::RwLockWriteGuard<UpdaterManager> =
        UpdaterManager::global().write().await;
    let _ = mgr.fetch_latest().await.unwrap();
    let id = mgr.update_core(&ClashCore::Mihomo).await.unwrap();

    let start = std::time::Instant::now();
    loop {
        let summary = mgr.inspect_updater(id).unwrap();
        match summary.state {
            super::instance::UpdaterState::Done => break,
            super::instance::UpdaterState::Failed(e) => panic!("{}", e),
            _ => {}
        }
        if start.elapsed() > Duration::from_secs(180) {
            panic!("timeout waiting for updater");
        }
        tokio::time::sleep(Duration::from_millis(500)).await;
    }

    #[cfg(target_os = "windows")]
    let core_name = "mihomo.exe";
    #[cfg(not(target_os = "windows"))]
    let core_name = "mihomo";
    let core_path = dirs::app_data_dir().unwrap().join(core_name);
    let meta = std::fs::metadata(&core_path).unwrap();
    assert!(meta.len() > 0);

    let latest = mgr.get_latest_versions();
    let expected = latest.mihomo;
    let output = std::process::Command::new(core_path)
        .arg("-v")
        .output()
        .expect("failed to run mihomo -v");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains(&expected));
}
