import { Notice } from '@/components/base';
import { isPortable } from '@nyanpasu/interface';
import { message as tauriMessage, } from '@tauri-apps/plugin-dialog';
import { isPermissionGranted, requestPermission, sendNotification, } from '@tauri-apps/plugin-notification';
let permissionGranted = null;
let portable = null;
const checkPermission = async () => {
    if (permissionGranted == null) {
        permissionGranted = await isPermissionGranted();
    }
    if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === 'granted';
    }
    return permissionGranted;
};
export var NotificationType;
(function (NotificationType) {
    NotificationType["Success"] = "success";
    NotificationType["Info"] = "info";
    // Warn = "warn",
    NotificationType["Error"] = "error";
})(NotificationType || (NotificationType = {}));
export const notification = async ({ title, body, type = NotificationType.Info, }) => {
    if (!title) {
        throw new Error('missing message argument!');
    }
    if (portable === null) {
        portable = await isPortable();
    }
    const permissionGranted = portable || (await checkPermission());
    if (portable || !permissionGranted) {
        // fallback to mui notification
        Notice[type](`${title} ${body ? `: ${body}` : ''}`);
        // throw new Error("notification permission not granted!");
        return;
    }
    const options = {
        title,
    };
    if (body)
        options.body = body;
    sendNotification(options);
};
export const message = async (value, options) => {
    if (typeof options === 'object') {
        await tauriMessage(value, {
            ...options,
            title: options.title
                ? `clash-xiaoy - ${options.title}`
                : 'clash-xiaoy',
        });
    }
    else {
        await tauriMessage(value, options);
    }
};
