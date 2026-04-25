# Clash-Xiaoy

<div align="center">
  <img src="https://github.com/user-attachments/assets/cd080422-a3f5-4fa0-817c-233b49fb31d3" alt="Clash-Xiaoy Interface" width="80%" />
  <br />
  <p>🚀 A Modern UI Enhancement Fork Based on Clash Nyanpasu</p>
  <br />
  <a href="https://t.me/clashxiaoy"><img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" /></a>
  <a href="https://github.com/aimy1/clash-xiaoy/releases"><img src="https://img.shields.io/github/v/release/aimy1/clash-xiaoy?style=for-the-badge" alt="GitHub Release" /></a>
  <a href="https://github.com/aimy1/clash-xiaoy/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aimy1/clash-xiaoy?style=for-the-badge" alt="License" /></a>
</div>

## 📖 Project Introduction

Clash-Xiaoy is a modern UI enhancement fork based on Clash Nyanpasu. Without modifying the core proxy logic of Clash, it systematically reconstructs the user interface, kernel download and installation process, and visual identification system to improve overall stability, usability, and completeness.

This project is positioned as: **Engineering-level UI reconstruction + installation experience optimization version**, not just a simple "skin change" or feature modification.

## ✨ Core Features

### 🔧 Kernel Management
- Use more stable download sources
- More automated installation process
- Clearer download failure prompts
- Improve overall success rate and reliability

### 🎨 Modern Interface
- New interface structure and layout
- Modern dark theme
- Clearer information hierarchy
- Higher visual completeness and consistency
- Responsive design, adapting to different screen sizes

### 🖼 Brand Identity
- New Logo design
- Unified with UI style
- Adapted to window, tray, and startup icons
- Enhanced brand recognition

### 🔗 Links and Resources
- All links verified
- Kernel download links available
- Stable update and resource addresses
- Ensure continuity of user experience

## 📸 Interface Preview

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/cd080422-a3f5-4fa0-817c-233b49fb31d3)

### Proxy Management
![Proxies](https://github.com/user-attachments/assets/262a8e94-16d6-4917-b5c9-43522910d527)

## 🚀 Installation Method

### Windows
1. Download the latest installation package from [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases)
2. Run the installer and follow the prompts to complete the installation
3. Start Clash-Xiaoy to use

### macOS
1. Download the latest DMG package from [GitHub Releases](https://github.com/aimy1/clash-xiaoy/releases)
2. Open the DMG file and drag Clash-Xiaoy into the Applications folder
3. Start Clash-Xiaoy to use

### Linux
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

## 🧠 Design Principles

> Only enhance experience, not break original functionality.

- ✅ Do not modify Clash core behavior
- ✅ Do not modify the rule system
- ✅ Do not modify policy group logic
- ✅ Do not change the configuration file format
- ✅ Fully compatible with Clash original ecology

## 📦 Feature Completeness

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

## ⚠️ Disclaimer

- This project does not provide any proxy services
- Does not contain any node resources
- Does not recommend or guide network content
- Only enhances the interface and user experience of Clash-Xiaoy
- Please use it in compliance with local laws and regulations

## 🔧 Development and Building

### Prerequisites
- Node.js 16+
- Rust 1.60+
- Tauri CLI

### Development Process
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

## ❤️ Acknowledgments

- [Clash](https://github.com/Dreamacro/clash) - Core proxy engine
- [Clash Nyanpasu](https://github.com/keiko233/clash-nyanpasu) - Base project
- [Tauri](https://tauri.app/) - Cross-platform application framework
- [React](https://react.dev/) - Frontend UI library
- All open source contributors

## 📞 Contact

- Bug feedback: aisaniya12@proton.me
- Join community: [Telegram Group](https://t.me/clashxiaoy)

---

<div align="center">
  <p>Made with ❤️ by the Clash-Xiaoy team</p>
</div>