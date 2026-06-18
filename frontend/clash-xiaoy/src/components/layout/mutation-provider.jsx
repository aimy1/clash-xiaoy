import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalMutation } from '@/utils/mutation';
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
export default function MutationProvider() {
    const { t } = useTranslation();
    const unlistenFn = useRef(null);
    const mutate = useGlobalMutation();
    useEffect(() => {
        safeListen('nyanpasu://mutation', ({ payload }) => {
            switch (payload) {
                case 'nyanpasu_config':
                    mutate((key) => {
                        if (typeof key === 'string') {
                            return (key.includes('nyanpasuConfig') ||
                                key.includes('getProxies') ||
                                key.includes('getProfiles'));
                        }
                        return false;
                    });
                    break;
                case 'clash_config':
                    mutate((key) => {
                        if (typeof key === 'string') {
                            return (key.includes('getClashRules') ||
                                key.includes('getClashInfo') ||
                                key.includes('getClashVersion') ||
                                key.includes('getProxies') ||
                                key.includes('getProfiles') ||
                                key.includes('getRulesProviders') ||
                                key.includes('getProxiesProviders') ||
                                key.includes('getAllProxiesProviders'));
                        }
                        return false;
                    });
                    break;
                case 'proxies':
                    mutate((key) => typeof key === 'string' && key.includes('getProxies'));
                    break;
                case 'profiles':
                    mutate((key) => {
                        if (typeof key === 'string') {
                            return (key.includes('getClashRules') ||
                                key.includes('getClashInfo') ||
                                key.includes('getClashVersion') ||
                                key.includes('getProxies') ||
                                key.includes('getProfiles') ||
                                key.includes('getRulesProviders') ||
                                key.includes('getProxiesProviders') ||
                                key.includes('getAllProxiesProviders'));
                        }
                        return false;
                    });
                    break;
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
    }, [mutate, t]);
    return null;
}
