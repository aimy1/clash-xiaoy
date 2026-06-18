import { MessageDialogOptions } from '@tauri-apps/plugin-dialog';
export type NotificationOptions = {
    title: string;
    body?: string;
    type?: NotificationType;
};
export declare enum NotificationType {
    Success = "success",
    Info = "info",
    Error = "error"
}
export declare const notification: ({ title, body, type, }: NotificationOptions) => Promise<void>;
export declare const message: (value: string, options?: string | MessageDialogOptions | undefined) => Promise<void>;
