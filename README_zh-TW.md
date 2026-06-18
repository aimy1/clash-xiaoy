# 🚀 Clash-Xiaoy


[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/clashxiaoy)
[![GitHub 發布](https://img.shields.io/github/v/release/aimy1/clash-xiaoy?style=for-the-badge&logo=github)](https://github.com/aimy1/clash-xiaoy/releases)
[![許可證](https://img.shields.io/github/license/aimy1/clash-xiaoy?style=for-the-badge&logo=gnu)](https://github.com/aimy1/clash-xiaoy/blob/main/LICENSE)
[![星標](https://img.shields.io/github/stars/aimy1/clash-xiaoy?style=for-the-badge&logo=github)](https://github.com/aimy1/clash-xiaoy/stargazers)
[![復刻](https://img.shields.io/github/forks/aimy1/clash-xiaoy?style=for-the-badge&logo=github)](https://github.com/aimy1/clash-xiaoy/network/members)

**基於 Clash Nyanpasu 的現代化 UI 增強版本**

*[English](./README.md) • [简体中文](./README_zh-CN.md)*

</div>

---

## ✨ 為什麼選擇 Clash-Xiaoy?

> 🎯 **工程級 UI 重構 + 安裝體驗優化**

Clash-Xiaoy 是一個現代化的 UI 增強分支，它徹底重新構想了 Clash Nyanpasu 的使用體驗。在不修改核心代理邏輯的前提下，我們系統性地重構了使用者介面、內核管理和視覺標識，提供了前所未有的精美程度和可靠性。

與簡單的「換皮」或表面修改不同，Clash-Xiaoy 代表了專注於**穩定性**、**可用性**和**完整性**的真正工程努力。

---

## 🎨 功能特點

### 🔧 內核管理

| 功能 | 描述 |
|------|------|
| 🚀 **穩定下載** | 使用更可靠下載源，成功率更高 |
| ⚡ **自動化安裝** | 簡化安裝流程，清晰進度指示 |
| 🎯 **清晰錯誤提示** | 下載失敗更容易診斷和解決 |
| ✅ **高可靠性** | 顯著提高整體成功率 |

### 🎨 現代化介面

| 功能 | 描述 |
|------|------|
| 🌙 **深色主題** | 針對長時間使用優化的現代化深色主題 |
| 📐 **清晰佈局** | 重新設計的介面結構，資訊層級更清晰 |
| 📱 **響應式設計** | 完美適配不同螢幕尺寸 |
| ✨ **視覺一致性** | 所有組件具有更高的視覺完整性 |

### 🖼️ 品牌標識

| 功能 | 描述 |
|------|------|
| 🎨 **全新 Logo** | 全新設計的 Logo |
| 🎯 **統一風格** | 貫穿始終的視覺語言 |
| 🖥️ **多平台圖標** | 適配視窗、托盤和啟動圖標 |

### 🔗 連結與資源

| 功能 | 描述 |
|------|------|
| ✔️ **已驗證連結** | 所有連結均已測試確認可用 |
| 📦 **內核下載** | 穩定可靠的內核下載源 |
| 🔄 **自動更新** | 無縫的更新檢查和安裝 |

---


## 📥 安裝

### Windows
```powershell
# 從 GitHub Releases 下載
# 執行安裝程式並按提示完成
# 啟動 Clash-Xiaoy
```

### macOS
```bash
# 從 GitHub Releases 下載 DMG
# 拖到應用程式資料夾
# 啟動 Clash-Xiaoy
```

### Linux
```bash
# AppImage
chmod +x Clash-Xiaoy-*.AppImage
./Clash-Xiaoy-*.AppImage

# DEB 包
sudo dpkg -i clash-xiaoy_*.deb
```

[![下載最新版本](https://img.shields.io/badge/下載-最新版本-2CA5E0?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aimy1/clash-xiaoy/releases)

---

## 🛠️ 開發

### 前置要求
- Node.js 16+
- Rust 1.60+
- Tauri CLI

### 快速開始
```bash
# 複製倉庫
git clone https://github.com/aimy1/clash-xiaoy.git
cd clash-xiaoy

# 安裝前端依賴
cd frontend/clash-xiaoy
npm install

# 啟動開發伺服器
npm run dev
```

### 從原始碼建構
```bash
# 建構後端
cd ../../backend/tauri
cargo tauri build
```

---

## 💡 設計理念

> **「只增強體驗，不破壞原有功能。」**

- ✅ 核心 Clash 行為保持不變
- ✅ 規則系統相容性已維護
- ✅ 策略組邏輯已保留
- ✅ 設定檔案格式未改變
- ✅ 100% 相容 Clash 生態系統

---

## 📊 功能矩陣

| 功能 | 狀態 |
|------|:----:|
| 節點管理與切換 | ✅ |
| 策略組 | ✅ |
| 配置載入 | ✅ |
| 訂閱更新 | ✅ |
| 流量統計 | ✅ |
| 系統托盤 | ✅ |
| 開機啟動 | ✅ |
| 代理啟動/停止 | ✅ |

---

## ⚠️ 免責聲明

- 本專案不提供任何代理服務
- 不包含任何節點資源
- 不對網路內容進行推薦或引導
- 僅增強 Clash-Xiaoy 的介面和使用者體驗
- 請遵守當地法律法規使用

---

## 🙏 鳴謝

<div align="center">

| 專案 | 描述 |
|------|------|
| [Clash](https://github.com/Dreamacro/clash) | 核心代理引擎 |
| [Clash Nyanpasu](https://github.com/keiko233/clash-nyanpasu) | 基礎專案 |
| [Tauri](https://tauri.app/) | 跨平台框架 |
| [React](https://react.dev/) | UI 庫 |
| [MUI](https://mui.com/) | 組件庫 |

*以及所有開源貢獻者*

</div>

---

## 📞 聯絡方式

<div align="center">

[![郵箱](https://img.shields.io/badge/郵箱-aisaniya12@proton.me-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:aisaniya12@proton.me)
[![Telegram](https://img.shields.io/badge/Telegram-加入社群-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/clashxiaoy)

</div>

---

<div align="center">
  <p>
    <strong>由 ❤️ 為 Clash-Xiaoy 團隊打造</strong>
  </p>
  <p>
    <sub>© 2024 Clash-Xiaoy. 保留所有權利。</sub>
  </p>
</div>
