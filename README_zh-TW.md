# Clash-Xiaoy

<div align="center">
  <img src="https://github.com/user-attachments/assets/cd080422-a3f5-4fa0-817c-233b49fb31d3" alt="Clash-Xiaoy Interface" width="80%" />
  <br />
  <p>🚀 基於 Clash Nyanpasu 的現代化 UI 增強版本</p>
  <br />
  <a href="https://t.me/clashxiaoy"><img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" /></a>
  <a href="https://github.com/aimy1/clash-xiaoy/releases"><img src="https://img.shields.io/github/v/release/aimy1/clash-xiaoy?style=for-the-badge" alt="GitHub Release" /></a>
  <a href="https://github.com/aimy1/clash-xiaoy/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aimy1/clash-xiaoy?style=for-the-badge" alt="License" /></a>
</div>

## 📖 專案簡介

Clash-Xiaoy 是一個基於 Clash Nyanpasu 的深度 UI 增強分支版本，在完全不修改 Clash 核心代理邏輯的前提下，對使用者介面、內核下載與安裝流程、視覺標識系統進行系統性重構，提升整體穩定性、可用性與完成度。

本專案定位為：**工程級 UI 重構 + 安裝體驗優化版本**，而不是簡單的「換皮」或功能魔改。

## ✨ 核心特性

### 🔧 內核管理
- 使用更穩定的下載源
- 安裝流程更自動化
- 下載失敗提示更清晰
- 提高整體成功率與可靠性

### 🎨 現代化介面
- 全新介面結構與佈局
- 現代化深色主題
- 更清晰的資訊層級
- 更高的視覺完成度與一致性
- 響應式設計，適配不同螢幕尺寸

### 🖼 品牌標識
- 全新 Logo 設計
- 與 UI 風格統一
- 適配視窗、托盤、啟動圖標
- 增強品牌識別度

### 🔗 連結與資源
- 所有連結已驗證
- 內核下載連結可用
- 更新與資源地址穩定
- 確保使用者體驗的連續性

## 📸 介面預覽

### 儀表板
![Dashboard](https://github.com/user-attachments/assets/cd080422-a3f5-4fa0-817c-233b49fb31d3)

### 代理管理
![Proxies](https://github.com/user-attachments/assets/262a8e94-16d6-4917-b5c9-43522910d527)

## 🚀 安裝方法

### Windows
1. 從 [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases) 下載最新的安裝包
2. 執行安裝程式並按照提示完成安裝
3. 啟動 Clash-Xiaoy 即可使用

### macOS
1. 從 [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases) 下載最新的 DMG 包
2. 打開 DMG 檔案並將 Clash-Xiaoy 拖入 Applications 資料夾
3. 啟動 Clash-Xiaoy 即可使用

### Linux
1. 從 [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases) 下載最新的 AppImage 或 DEB 包
2. 對於 AppImage：添加執行權限並執行
   ```bash
   chmod +x Clash-Xiaoy-*.AppImage
   ./Clash-Xiaoy-*.AppImage
   ```
3. 對於 DEB 包：使用 dpkg 安裝
   ```bash
   sudo dpkg -i clash-xiaoy_*.deb
   ```

## 🧠 設計原則

> 只增強體驗，不破壞原有功能。

- ✅ 不修改 Clash 核心行為
- ✅ 不修改規則系統
- ✅ 不修改策略組邏輯
- ✅ 不改變配置檔案格式
- ✅ 完全相容 Clash 原生態

## 📦 功能完整性

以下功能全部保持與原版一致：

| 功能 | 狀態 |
|------|------|
| 節點管理與切換 | ✅ 完整支援 |
| 策略組 | ✅ 完整支援 |
| 配置載入 | ✅ 完整支援 |
| 訂閱更新 | ✅ 完整支援 |
| 流量統計 | ✅ 完整支援 |
| 系統托盤 | ✅ 完整支援 |
| 開機啟動 | ✅ 完整支援 |
| 啟動 / 停止代理 | ✅ 完整支援 |

## ⚠️ 免責聲明

- 本專案不提供任何代理服務
- 不包含任何節點資源
- 不對網路內容進行推薦或引導
- 僅對 Clash-Xiaoy 的介面與使用體驗進行增強
- 請遵守當地法律法規使用

## 🔧 開發與建構

### 前置要求
- Node.js 16+
- Rust 1.60+
- Tauri CLI

### 開發流程
1. 克隆倉庫
   ```bash
   git clone https://github.com/aimy1/clash-xiaoy.git
   cd clash-xiaoy
   ```

2. 安裝依賴
   ```bash
   # 前端依賴
   cd frontend/clash-xiaoy
   npm install
   
   # 後端依賴
   cd ../../backend/tauri
   cargo install
   ```

3. 啟動開發伺服器
   ```bash
   # 前端開發伺服器
   cd frontend/clash-xiaoy
   npm run dev
   
   # 後端開發
   cd ../../backend/tauri
   cargo tauri dev
   ```

4. 建構發布版本
   ```bash
   cd backend/tauri
   cargo tauri build
   ```

## ❤️ 鳴謝

- [Clash](https://github.com/Dreamacro/clash) - 核心代理引擎
- [Clash Nyanpasu](https://github.com/keiko233/clash-nyanpasu) - 基礎專案
- [Tauri](https://tauri.app/) - 跨平台應用框架
- [React](https://react.dev/) - 前端 UI 庫
- 所有開源貢獻者

## 📞 聯絡方式

- 反饋 bug：aisaniya12@proton.me
- 加入社群：[Telegram 群組](https://t.me/clashxiaoy)

---

<div align="center">
  <p>Made with ❤️ by the Clash-Xiaoy team</p>
</div>