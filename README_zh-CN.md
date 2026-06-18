# 🚀 Clash-Xiaoy


[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/clashxiaoy)
[![GitHub 发布](https://img.shields.io/github/v/release/aimy1/clash-xiaoy?style=for-the-badge&logo=github)](https://github.com/aimy1/clash-xiaoy/releases)
[![许可证](https://img.shields.io/github/license/aimy1/clash-xiaoy?style=for-the-badge&logo=gnu)](https://github.com/aimy1/clash-xiaoy/blob/main/LICENSE)
[![星标](https://img.shields.io/github/stars/aimy1/clash-xiaoy?style=for-the-badge&logo=github)](https://github.com/aimy1/clash-xiaoy/stargazers)
[![复刻](https://img.shields.io/github/forks/aimy1/clash-xiaoy?style=for-the-badge&logo=github)](https://github.com/aimy1/clash-xiaoy/network/members)

**基于 Clash Nyanpasu 的现代化 UI 增强版本**

*[English](./README.md) • [繁體中文](./README_zh-TW.md)*

</div>

---

## ✨ 为什么选择 Clash-Xiaoy?

> 🎯 **工程级 UI 重构 + 安装体验优化**

Clash-Xiaoy 是一个现代化的 UI 增强分支，它彻底重新构想了 Clash Nyanpasu 的使用体验。在不修改核心代理逻辑的前提下，我们系统性地重构了用户界面、内核管理和视觉标识，提供了前所未有的精美程度和可靠性。

与简单的"换皮"或表面修改不同，Clash-Xiaoy 代表了专注于**稳定性**、**可用性**和**完整性**的真正工程努力。

---

## 🎨 功能特点

### 🔧 内核管理

| 功能 | 描述 |
|------|------|
| 🚀 **稳定下载** | 使用更可靠下载源，成功率更高 |
| ⚡ **自动化安装** | 简化安装流程，清晰进度指示 |
| 🎯 **清晰错误提示** | 下载失败更容易诊断和解决 |
| ✅ **高可靠性** | 显著提高整体成功率 |

### 🎨 现代化界面

| 功能 | 描述 |
|------|------|
| 🌙 **深色主题** | 针对长时间使用优化的现代化深色主题 |
| 📐 **清晰布局** | 重新设计的界面结构，信息层级更清晰 |
| 📱 **响应式设计** | 完美适配不同屏幕尺寸 |
| ✨ **视觉一致性** | 所有组件具有更高的视觉完整性 |

### 🖼️ 品牌标识

| 功能 | 描述 |
|------|------|
| 🎨 **全新 Logo** | 全新设计的 Logo |
| 🎯 **统一风格** | 贯穿始终的视觉语言 |
| 🖥️ **多平台图标** | 适配窗口、托盘和启动图标 |

### 🔗 链接与资源

| 功能 | 描述 |
|------|------|
| ✔️ **已验证链接** | 所有链接均已测试确认可用 |
| 📦 **内核下载** | 稳定可靠的内核下载源 |
| 🔄 **自动更新** | 无缝的更新检查和安装 |

---


## 📥 安装

### Windows
```powershell
# 从 GitHub Releases 下载
# 运行安装程序并按提示完成
# 启动 Clash-Xiaoy
```

### macOS
```bash
# 从 GitHub Releases 下载 DMG
# 拖到应用程序文件夹
# 启动 Clash-Xiaoy
```

### Linux
```bash
# AppImage
chmod +x Clash-Xiaoy-*.AppImage
./Clash-Xiaoy-*.AppImage

# DEB 包
sudo dpkg -i clash-xiaoy_*.deb
```

[![下载最新版本](https://img.shields.io/badge/下载-最新版本-2CA5E0?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aimy1/clash-xiaoy/releases)

---

## 🛠️ 开发

### 前置要求
- Node.js 16+
- Rust 1.60+
- Tauri CLI

### 快速开始
```bash
# 克隆仓库
git clone https://github.com/aimy1/clash-xiaoy.git
cd clash-xiaoy

# 安装前端依赖
cd frontend/clash-xiaoy
npm install

# 启动开发服务器
npm run dev
```

### 从源码构建
```bash
# 构建后端
cd ../../backend/tauri
cargo tauri build
```

---

## 💡 设计理念

> **"只增强体验，不破坏原有功能。"**

- ✅ 核心 Clash 行为保持不变
- ✅ 规则系统兼容性已维护
- ✅ 策略组逻辑已保留
- ✅ 配置文件格式未改变
- ✅ 100% 兼容 Clash 生态系统

---

## 📊 功能矩阵

| 功能 | 状态 |
|------|:----:|
| 节点管理与切换 | ✅ |
| 策略组 | ✅ |
| 配置加载 | ✅ |
| 订阅更新 | ✅ |
| 流量统计 | ✅ |
| 系统托盘 | ✅ |
| 开机启动 | ✅ |
| 代理启动/停止 | ✅ |

---

## ⚠️ 免责声明

- 本项目不提供任何代理服务
- 不包含任何节点资源
- 不对网络内容进行推荐或引导
- 仅增强 Clash-Xiaoy 的界面和用户体验
- 请遵守当地法律法规使用

---

## 🙏 鸣谢

<div align="center">

| 项目 | 描述 |
|------|------|
| [Clash](https://github.com/Dreamacro/clash) | 核心代理引擎 |
| [Clash Nyanpasu](https://github.com/keiko233/clash-nyanpasu) | 基础项目 |
| [Tauri](https://tauri.app/) | 跨平台框架 |
| [React](https://react.dev/) | UI 库 |
| [MUI](https://mui.com/) | 组件库 |

*以及所有开源贡献者*

</div>

---

## 📞 联系方式

<div align="center">

[![邮箱](https://img.shields.io/badge/邮箱-aisaniya12@proton.me-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:aisaniya12@proton.me)
[![Telegram](https://img.shields.io/badge/Telegram-加入社区-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/clashxiaoy)

</div>

---

<div align="center">
  <p>
    <strong>由 ❤️ 为 Clash-Xiaoy 团队打造</strong>
  </p>
  <p>
    <sub>© 2024 Clash-Xiaoy. 保留所有权利。</sub>
  </p>
</div>
