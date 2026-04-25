import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
declare let appWindow: ReturnType<typeof getCurrentWebviewWindow>;
export { appWindow };
