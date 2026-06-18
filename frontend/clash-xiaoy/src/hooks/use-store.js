import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { dispatchStorageValueChanged } from '@/services/storage';
import { coreTypeAtom } from '@/store/clash';
import { useSetting } from '@nyanpasu/interface';
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
export function useCoreType() {
    const [coreType, setCoreType] = useAtom(coreTypeAtom);
    const { upsert } = useSetting('clash_core');
    const setter = (value) => {
        setCoreType(value);
        upsert(value);
    };
    return [coreType, setter];
}
export function useNyanpasuStorageSubscribers() {
    useEffect(() => {
        let unlisten = null;
        safeListen('storage_value_changed', (event) => {
            const [key, value] = event.payload;
            dispatchStorageValueChanged(key, typeof value === 'string' ? JSON.parse(value) : value);
        }).then((fn) => {
            unlisten = fn;
        });
        return () => {
            if (unlisten) {
                unlisten();
            }
        };
    });
}
