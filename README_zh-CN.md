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

## 📖 项目简介

Clash-Xiaoy 是一个基于 Clash Nyanpasu 的深度 UI 增强分支版本，在完全不修改 Clash 核心代理逻辑的前提下，对用户界面、内核下载与安装流程、视觉标识系统进行系统性重构，提升整体稳定性、可用性与完成度。

本项目定位为：**工程级 UI 重构 + 安装体验优化版本**，而不是简单的"换皮"或功能魔改。

## ✨ 核心特性

### 🔧 内核管理
- 使用更稳定的下载源
- 安装流程更自动化
- 下载失败提示更清晰
- 提高整体成功率与可靠性

### 🎨 现代化界面
- 全新界面结构与布局
- 现代化深色主题
- 更清晰的信息层级
- 更高的视觉完成度与一致性
- 响应式设计，适配不同屏幕尺寸

### 🖼 品牌标识
- 全新 Logo 设计
- 与 UI 风格统一
- 适配窗口、托盘、启动图标
- 增强品牌识别度

### 🔗 链接与资源
- 所有链接已验证
- 内核下载链接可用
- 更新与资源地址稳定
- 确保用户体验的连续性

## 📸 界面预览

### 仪表盘
![Dashboard](https://github.com/user-attachments/assets/cd080422-a3f5-4fa0-817c-233b49fb31d3)

### 代理管理
![Proxies](https://github.com/user-attachments/assets/262a8e94-16d6-4917-b5c9-43522910d527)

## 🚀 安装方法

### Windows
1. 从 [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases) 下载最新的安装包
2. 运行安装程序并按照提示完成安装
3. 启动 Clash-Xiaoy 即可使用

### macOS
1. 从 [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases) 下载最新的 DMG 包
2. 打开 DMG 文件并将 Clash-Xiaoy 拖入 Applications 文件夹
3. 启动 Clash-Xiaoy 即可使用

### Linux
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

## 🧠 设计原则

> 只增强体验，不破坏原有功能。

- ✅ 不修改 Clash 核心行为
- ✅ 不修改规则系统
- ✅ 不修改策略组逻辑
- ✅ 不改变配置文件格式
- ✅ 完全兼容 Clash 原生态

## 📦 功能完整性

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

## ⚠️ 免责声明

- 本项目不提供任何代理服务
- 不包含任何节点资源
- 不对网络内容进行推荐或引导
- 仅对 Clash-Xiaoy 的界面与使用体验进行增强
- 请遵守当地法律法规使用

## 🔧 开发与构建

### 前置要求
- Node.js 16+
- Rust 1.60+
- Tauri CLI

### 开发流程
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

## ❤️ 鸣谢

- [Clash](https://github.com/Dreamacro/clash) - 核心代理引擎
- [Clash Nyanpasu](https://github.com/keiko233/clash-nyanpasu) - 基础项目
- [Tauri](https://tauri.app/) - 跨平台应用框架
- [React](https://react.dev/) - 前端 UI 库
- 所有开源贡献者

## 📞 联系方式

- 反馈 bug：aisaniya12@proton.me
- 加入社区：[Telegram 群组](https://t.me/clashxiaoy)

---

<div align="center">
  <p>Made with ❤️ by the Clash-Xiaoy team</p>
</div>