import { type Update } from '@tauri-apps/plugin-updater';
export declare const UpdaterIgnoredAtom: import("jotai").WritableAtom<string | null, [string | typeof import("jotai/utils").RESET | ((prev: string | null) => string | typeof import("jotai/utils").RESET | null) | null], void>;
export declare const UpdaterInstanceAtom: import("jotai").PrimitiveAtom<Update | null> & {
    init: Update | null;
};
