import { createJSONStorage } from 'jotai/utils';
import { getStorageItem, removeStorageItem, setStorageItem, } from '@nyanpasu/interface';
const subscribers = new Map();
export function dispatchStorageValueChanged(key, newValue) {
    if (subscribers.has(key)) {
        const set = subscribers.get(key);
        set.forEach((callback) => {
            callback(newValue);
        });
    }
}
export const NyanpasuStorage = {
    getItem(key) {
        return getStorageItem(key);
    },
    setItem(key, newValue) {
        return setStorageItem(key, newValue);
    },
    removeItem(key) {
        return removeStorageItem(key);
    },
    subscribe(key, callback) {
        if (!subscribers.has(key)) {
            subscribers.set(key, new Set());
        }
        const set = subscribers.get(key);
        set.add(callback);
        return () => {
            if (subscribers.has(key)) {
                const set = subscribers.get(key);
                set.delete(callback);
                if (set.size === 0) {
                    subscribers.delete(key);
                }
            }
        };
    },
};
export const NyanpasuJSONStorage = createJSONStorage(() => NyanpasuStorage);
