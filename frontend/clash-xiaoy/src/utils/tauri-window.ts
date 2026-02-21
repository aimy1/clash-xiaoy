import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'

// Define a safe wrapper for the Tauri window object
// This allows the app to run in a standard browser (like for UI preview) without crashing
let appWindow: ReturnType<typeof getCurrentWebviewWindow>

try {
  appWindow = getCurrentWebviewWindow()
} catch (e) {
  console.warn(
    'Tauri API not available, running in browser mode with mock window',
  )

  // Mock implementation of the Tauri window API for browser preview
  appWindow = {
    theme: async () => 'dark',
    onThemeChanged: async () => () => {},
    listen: async () => () => {},
    isMaximized: async () => false,
    isFullscreen: async () => false,
    startDragging: async () => {},
    minimize: async () => {},
    toggleMaximize: async () => {},
    setAlwaysOnTop: async () => {},
    close: async () => {},
    show: async () => {},
    unminimize: async () => {},
    setFocus: async () => {},
    onFocusChanged: async () => () => {},
    onResized: async () => () => {},
    onMoved: async () => () => {},
    onScaleChanged: async () => () => {},
    onCloseRequested: async () => () => {},
    onFileDropEvent: async () => () => {},
  } as unknown as ReturnType<typeof getCurrentWebviewWindow>
}

export { appWindow }
