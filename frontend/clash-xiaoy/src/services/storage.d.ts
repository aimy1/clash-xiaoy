export declare function dispatchStorageValueChanged(key: string, newValue: string | null): void;
export declare const NyanpasuStorage: {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, newValue: string): Promise<void>;
    removeItem(key: string): Promise<void>;
    subscribe(key: string, callback: (value: string | null) => void): () => void;
};
export declare const NyanpasuJSONStorage: import("jotai/vanilla/utils/atomWithStorage").AsyncStorage<unknown>;
