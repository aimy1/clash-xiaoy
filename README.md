# Clash-Xiaoy

<div align="center">
  <img src="https://github.com/user-attachments/assets/cd080422-a3f5-4fa0-817c-233b49fb31d3" alt="Clash-Xiaoy Interface" width="80%" />
  <br />
  <p>🚀 基于 Clash Nyanpasu 的现代化 UI 增强版本</p>
  <br />
  <a href="https://t.me/clashxiaoy"><img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" /></a>
  <a href="https://github.com/aimy1/clash-xiaoy/releases"><img src="https://img.shields.io/github/v/release/aimy1/clash-xiaoy?style=for-the-badge" alt="GitHub Release" /></a>
  <a href="https://github.com/aimy1/clash-xiaoy/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aimy1/clash-xiaoy?style=for-the-badge" alt="License" /></a>
</div>

## 🌐 语言选择 / Language Selector

- [简体中文](#简体中文)
- [English](#english)
- [繁體中文](#繁體中文)

---

## 简体中文

### 📖 项目简介

Clash-Xiaoy 是一个基于 Clash Nyanpasu 的深度 UI 增强分支版本，在完全不修改 Clash 核心代理逻辑的前提下，对用户界面、内核下载与安装流程、视觉标识系统进行系统性重构，提升整体稳定性、可用性与完成度。

本项目定位为：**工程级 UI 重构 + 安装体验优化版本**，而不是简单的"换皮"或功能魔改。

### ✨ 核心特性

#### 🔧 内核管理
- 使用更稳定的下载源
- 安装流程更自动化
- 下载失败提示更清晰
- 提高整体成功率与可靠性

#### 🎨 现代化界面
- 全新界面结构与布局
- 现代化深色主题
- 更清晰的信息层级
- 更高的视觉完成度与一致性
- 响应式设计，适配不同屏幕尺寸

#### 🖼 品牌标识
- 全新 Logo 设计
- 与 UI 风格统一
- 适配窗口、托盘、启动图标
- 增强品牌识别度

#### 🔗 链接与资源
- 所有链接已验证
- 内核下载链接可用
- 更新与资源地址稳定
- 确保用户体验的连续性

### 📸 界面预览

#### 仪表盘
![Dashboard](https://github.com/user-attachments/assets/cd080422-a3f5-4fa0-817c-233b49fb31d3)

#### 代理管理
![Proxies](https://github.com/user-attachments/assets/262a8e94-16d6-4917-b5c9-43522910d527)

### 🚀 安装方法

#### Windows
1. 从 [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases) 下载最新的安装包
2. 运行安装程序并按照提示完成安装
3. 启动 Clash-Xiaoy 即可使用

#### macOS
1. 从 [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases) 下载最新的 DMG 包
2. 打开 DMG 文件并将 Clash-Xiaoy 拖入 Applications 文件夹
3. 启动 Clash-Xiaoy 即可使用

#### Linux
1. 从 [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases) 下载最新的 AppImage 或 DEB 包
2. 对于 AppImage：添加执行权限并运行
   ```bash
   chmod +x Clash-Xiaoy-*.AppImage
   ./Clash-Xiaoy-*.AppImage
   ```
3. 对于 DEB 包：使用 dpkg 安装
   ```bash
   sudo dpkg -i clash-xiaoy_*.deb
   ```

### 🧠 设计原则

> 只增强体验，不破坏原有功能。

- ✅ 不修改 Clash 核心行为
- ✅ 不修改规则系统
- ✅ 不修改策略组逻辑
- ✅ 不改变配置文件格式
- ✅ 完全兼容 Clash 原生态

### 📦 功能完整性

以下功能全部保持与原版一致：

| 功能 | 状态 |
|------|------|
| 节点管理与切换 | ✅ 完整支持 |
| 策略组 | ✅ 完整支持 |
| 配置加载 | ✅ 完整支持 |
| 订阅更新 | ✅ 完整支持 |
| 流量统计 | ✅ 完整支持 |
| 系统托盘 | ✅ 完整支持 |
| 开机启动 | ✅ 完整支持 |
| 启动 / 停止代理 | ✅ 完整支持 |

### ⚠️ 免责声明

- 本项目不提供任何代理服务
- 不包含任何节点资源
- 不对网络内容进行推荐或引导
- 仅对 Clash-Xiaoy 的界面与使用体验进行增强
- 请遵守当地法律法规使用

### 🔧 开发与构建

#### 前置要求
- Node.js 16+
- Rust 1.60+
- Tauri CLI

#### 开发流程
1. 克隆仓库
   ```bash
   git clone https://github.com/aimy1/clash-xiaoy.git
   cd clash-xiaoy
   ```

2. 安装依赖
   ```bash
   # 前端依赖
   cd frontend/clash-xiaoy
   npm install
   
   # 后端依赖
   cd ../../backend/tauri
   cargo install
   ```

3. 启动开发服务器
   ```bash
   # 前端开发服务器
   cd frontend/clash-xiaoy
   npm run dev
   
   # 后端开发
   cd ../../backend/tauri
   cargo tauri dev
   ```

4. 构建发布版本
   ```bash
   cd backend/tauri
   cargo tauri build
   ```

### ❤️ 鸣谢

- [Clash](https://github.com/Dreamacro/clash) - 核心代理引擎
- [Clash Nyanpasu](https://github.com/keiko233/clash-nyanpasu) - 基础项目
- [Tauri](https://tauri.app/) - 跨平台应用框架
- [React](https://react.dev/) - 前端 UI 库
- 所有开源贡献者

### 📞 联系方式

- 反馈 bug：aisaniya12@proton.me
- 加入社区：[Telegram 群组](https://t.me/clashxiaoy)

---

## English

### 📖 Project Introduction

Clash-Xiaoy is a modern UI enhancement fork based on Clash Nyanpasu. Without modifying the core proxy logic of Clash, it systematically reconstructs the user interface, kernel download and installation process, and visual identification system to improve overall stability, usability, and completeness.

This project is positioned as: **Engineering-level UI reconstruction + installation experience optimization version**, not just a simple "skin change" or feature modification.

### ✨ Core Features

#### 🔧 Kernel Management
- Use more stable download sources
- More automated installation process
- Clearer download failure prompts
- Improve overall success rate and reliability

#### 🎨 Modern Interface
- New interface structure and layout
- Modern dark theme
- Clearer information hierarchy
- Higher visual completeness and consistency
- Responsive design, adapting to different screen sizes

#### 🖼 Brand Identity
- New Logo design
- Unified with UI style
- Adapted to window, tray, and startup icons
- Enhanced brand recognition

#### 🔗 Links and Resources
- All links verified
- Kernel download links available
- Stable update and resource addresses
- Ensure continuity of user experience

### 📸 Interface Preview

#### Dashboard
![Dashboard](https://github.com/user-attachments/assets/cd080422-a3f5-4fa0-817c-233b49fb31d3)

#### Proxy Management
![Proxies](https://github.com/user-attachments/assets/262a8e94-16d6-4917-b5c9-43522910d527)

### 🚀 Installation Method

#### Windows
1. Download the latest installation package from [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases)
2. Run the installer and follow the prompts to complete the installation
3. Start Clash-Xiaoy to use

#### macOS
1. Download the latest DMG package from [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases)
2. Open the DMG file and drag Clash-Xiaoy into the Applications folder
3. Start Clash-Xiaoy to use

#### Linux
1. Download the latest AppImage or DEB package from [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases)
2. For AppImage: Add execution permission and run
   ```bash
   chmod +x Clash-Xiaoy-*.AppImage
   ./Clash-Xiaoy-*.AppImage
   ```
3. For DEB package: Install using dpkg
   ```bash
   sudo dpkg -i clash-xiaoy_*.deb
   ```

### 🧠 Design Principles

> Only enhance experience, not break original functionality.

- ✅ Do not modify Clash core behavior
- ✅ Do not modify the rule system
- ✅ Do not modify policy group logic
- ✅ Do not change the configuration file format
- ✅ Fully compatible with Clash original ecology

### 📦 Feature Completeness

All the following features remain consistent with the original version:

| Feature | Status |
|---------|--------|
| Node management and switching | ✅ Full support |
| Policy groups | ✅ Full support |
| Configuration loading | ✅ Full support |
| Subscription update | ✅ Full support |
| Traffic statistics | ✅ Full support |
| System tray | ✅ Full support |
| Startup on boot | ✅ Full support |
| Start / stop proxy | ✅ Full support |

### ⚠️ Disclaimer

- This project does not provide any proxy services
- Does not contain any node resources
- Does not recommend or guide network content
- Only enhances the interface and user experience of Clash-Xiaoy
- Please use it in compliance with local laws and regulations

### 🔧 Development and Building

#### Prerequisites
- Node.js 16+
- Rust 1.60+
- Tauri CLI

#### Development Process
1. Clone the repository
   ```bash
   git clone https://github.com/aimy1/clash-xiaoy.git
   cd clash-xiaoy
   ```

2. Install dependencies
   ```bash
   # Frontend dependencies
   cd frontend/clash-xiaoy
   npm install
   
   # Backend dependencies
   cd ../../backend/tauri
   cargo install
   ```

3. Start development server
   ```bash
   # Frontend development server
   cd frontend/clash-xiaoy
   npm run dev
   
   # Backend development
   cd ../../backend/tauri
   cargo tauri dev
   ```

4. Build release version
   ```bash
   cd backend/tauri
   cargo tauri build
   ```

### ❤️ Acknowledgments

- [Clash](https://github.com/Dreamacro/clash) - Core proxy engine
- [Clash Nyanpasu](https://github.com/keiko233/clash-nyanpasu) - Base project
- [Tauri](https://tauri.app/) - Cross-platform application framework
- [React](https://react.dev/) - Frontend UI library
- All open source contributors

### 📞 Contact

- Bug feedback: aisaniya12@proton.me
- Join community: [Telegram Group](https://t.me/clashxiaoy)

---

## 繁體中文

### 📖 專案簡介

Clash-Xiaoy 是一個基於 Clash Nyanpasu 的深度 UI 增強分支版本，在完全不修改 Clash 核心代理邏輯的前提下，對使用者介面、內核下載與安裝流程、視覺標識系統進行系統性重構，提升整體穩定性、可用性與完成度。

本專案定位為：**工程級 UI 重構 + 安裝體驗優化版本**，而不是簡單的「換皮」或功能魔改。

### ✨ 核心特性

#### 🔧 內核管理
- 使用更穩定的下載源
- 安裝流程更自動化
- 下載失敗提示更清晰
- 提高整體成功率與可靠性

#### 🎨 現代化介面
- 全新介面結構與佈局
- 現代化深色主題
- 更清晰的資訊層級
- 更高的視覺完成度與一致性
- 響應式設計，適配不同螢幕尺寸

#### 🖼 品牌標識
- 全新 Logo 設計
- 與 UI 風格統一
- 適配視窗、托盤、啟動圖標
- 增強品牌識別度

#### 🔗 連結與資源
- 所有連結已驗證
- 內核下載連結可用
- 更新與資源地址穩定
- 確保使用者體驗的連續性

### 📸 介面預覽

#### 儀表板
![Dashboard](https://github.com/user-attachments/assets/cd080422-a3f5-4fa0-817c-233b49fb31d3)

#### 代理管理
![Proxies](https://github.com/user-attachments/assets/262a8e94-16d6-4917-b5c9-43522910d527)

### 🚀 安裝方法

#### Windows
1. 從 [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases) 下載最新的安裝包
2. 執行安裝程式並按照提示完成安裝
3. 啟動 Clash-Xiaoy 即可使用

#### macOS
1. 從 [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases) 下載最新的 DMG 包
2. 打開 DMG 檔案並將 Clash-Xiaoy 拖入 Applications 資料夾
3. 啟動 Clash-Xiaoy 即可使用

#### Linux
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

### 🧠 設計原則

> 只增強體驗，不破壞原有功能。

- ✅ 不修改 Clash 核心行為
- ✅ 不修改規則系統
- ✅ 不修改策略組邏輯
- ✅ 不改變配置檔案格式
- ✅ 完全相容 Clash 原生態

### 📦 功能完整性

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

### ⚠️ 免責聲明

- 本專案不提供任何代理服務
- 不包含任何節點資源
- 不對網路內容進行推薦或引導
- 僅對 Clash-Xiaoy 的介面與使用體驗進行增強
- 請遵守當地法律法規使用

### 🔧 開發與建構

#### 前置要求
- Node.js 16+
- Rust 1.60+
- Tauri CLI

#### 開發流程
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

### ❤️ 鳴謝

- [Clash](https://github.com/Dreamacro/clash) - 核心代理引擎
- [Clash Nyanpasu](https://github.com/keiko233/clash-nyanpasu) - 基礎專案
- [Tauri](https://tauri.app/) - 跨平台應用框架
- [React](https://react.dev/) - 前端 UI 庫
- 所有開源貢獻者

### 📞 聯絡方式

- 反饋 bug：aisaniya12@proton.me
- 加入社群：[Telegram 群組](https://t.me/clashxiaoy)

---

<div align="center">
  <p>Made with ❤️ by the Clash-Xiaoy team</p>
</div>