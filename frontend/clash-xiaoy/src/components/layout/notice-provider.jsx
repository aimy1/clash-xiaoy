import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { notification, NotificationType } from '@/utils/notification';
import { listen } from '@tauri-apps/api/event';
const safeListen = (event, handler) => {
    const w = globalThis;
    if (!w?.__TAURI_INTERNALS__ && !w?.__TAURI__) {
        return Promise.resolve(() => { });
    }
    try {
        return listen(event, handler);
    }
    catch {
        return Promise.resolve(() => { });
    }
};
export const NoticeProvider = () => {
    const { t } = useTranslation();
    const unlistenFn = useRef(null);
    useEffect(() => {
        safeListen('nyanpasu://notice-message', ({ payload }) => {
            if ('ok' in payload?.set_config) {
                notification({
                    title: t('Successful'),
                    body: 'Refresh Clash Config',
                    type: NotificationType.Success,
                });
            }
            else if ('err' in payload?.set_config) {
                notification({
                    title: t('Error'),
                    body: payload.set_config.err,
                    type: NotificationType.Error,
                });
            }
        })
            .then((unlisten) => {
            unlistenFn.current = unlisten;
        })
            .catch((e) => {
            notification({
                title: t('Error'),
                body: e.message,
                type: NotificationType.Error,
            });
        });
        return () => {
            unlistenFn.current?.();
        };
    }, [t]);
    return null;
};
export default NoticeProvider;
