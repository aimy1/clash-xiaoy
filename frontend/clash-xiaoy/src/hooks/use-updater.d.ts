import { Update } from '@tauri-apps/plugin-updater';
export declare function useUpdaterPlatformSupported(): boolean;
export declare function checkUpdate(): Promise<Update | null>;
export declare function useUpdater(): void;
export declare const UpdaterProvider: () => null;
