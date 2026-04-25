import { SortType } from '@/components/proxies/utils';
export declare const memorizedRoutePathAtom: import("jotai").WritableAtom<"/" | "/experimental/connections" | "/experimental/dashboard" | "/experimental/logs" | "/experimental/profiles" | "/experimental/providers" | "/experimental/proxies" | "/experimental/rules" | "/experimental/settings" | "/experimental/proxies/" | "/experimental/proxies/group/$name" | "/experimental/settings/about" | "/experimental/settings/clash-core" | "/experimental/settings/clash-external-controll" | "/experimental/settings/clash-filed" | "/experimental/settings/clash-settings" | "/experimental/settings/debug-utils" | "/experimental/settings/nyanpasu-config" | "/experimental/settings/system-behavior" | "/experimental/settings/system-proxy" | "/experimental/settings/system-service" | "/experimental/settings/user-interface" | "/experimental/settings/web-ui" | "/experimental/settings/" | "/browser" | "/connections" | "/dashboard" | "/logs" | "/profiles" | "/providers" | "/proxies" | "/rules" | "/settings" | null, ["/" | "/experimental/connections" | "/experimental/dashboard" | "/experimental/logs" | "/experimental/profiles" | "/experimental/providers" | "/experimental/proxies" | "/experimental/rules" | "/experimental/settings" | "/experimental/proxies/" | "/experimental/proxies/group/$name" | "/experimental/settings/about" | "/experimental/settings/clash-core" | "/experimental/settings/clash-external-controll" | "/experimental/settings/clash-filed" | "/experimental/settings/clash-settings" | "/experimental/settings/debug-utils" | "/experimental/settings/nyanpasu-config" | "/experimental/settings/system-behavior" | "/experimental/settings/system-proxy" | "/experimental/settings/system-service" | "/experimental/settings/user-interface" | "/experimental/settings/web-ui" | "/experimental/settings/" | "/browser" | "/connections" | "/dashboard" | "/logs" | "/profiles" | "/providers" | "/proxies" | "/rules" | "/settings" | typeof import("jotai/utils").RESET | ((prev: "/" | "/experimental/connections" | "/experimental/dashboard" | "/experimental/logs" | "/experimental/profiles" | "/experimental/providers" | "/experimental/proxies" | "/experimental/rules" | "/experimental/settings" | "/experimental/proxies/" | "/experimental/proxies/group/$name" | "/experimental/settings/about" | "/experimental/settings/clash-core" | "/experimental/settings/clash-external-controll" | "/experimental/settings/clash-filed" | "/experimental/settings/clash-settings" | "/experimental/settings/debug-utils" | "/experimental/settings/nyanpasu-config" | "/experimental/settings/system-behavior" | "/experimental/settings/system-proxy" | "/experimental/settings/system-service" | "/experimental/settings/user-interface" | "/experimental/settings/web-ui" | "/experimental/settings/" | "/browser" | "/connections" | "/dashboard" | "/logs" | "/profiles" | "/providers" | "/proxies" | "/rules" | "/settings" | null) => "/" | "/experimental/connections" | "/experimental/dashboard" | "/experimental/logs" | "/experimental/profiles" | "/experimental/providers" | "/experimental/proxies" | "/experimental/rules" | "/experimental/settings" | "/experimental/proxies/" | "/experimental/proxies/group/$name" | "/experimental/settings/about" | "/experimental/settings/clash-core" | "/experimental/settings/clash-external-controll" | "/experimental/settings/clash-filed" | "/experimental/settings/clash-settings" | "/experimental/settings/debug-utils" | "/experimental/settings/nyanpasu-config" | "/experimental/settings/system-behavior" | "/experimental/settings/system-proxy" | "/experimental/settings/system-service" | "/experimental/settings/user-interface" | "/experimental/settings/web-ui" | "/experimental/settings/" | "/browser" | "/connections" | "/dashboard" | "/logs" | "/profiles" | "/providers" | "/proxies" | "/rules" | "/settings" | typeof import("jotai/utils").RESET | null) | null], void>;
export declare const proxyGroupAtom: import("jotai").WritableAtom<{
    selector: number | null;
}, [update: {
    selector: number | null;
} | ((prev: {
    selector: number | null;
}) => {
    selector: number | null;
})], void>;
export declare const proxyGroupSortAtom: import("jotai").WritableAtom<SortType, [update: SortType | ((prev: SortType) => SortType)], void>;
export declare const atomDashboardLayout: import("jotai").WritableAtom<string[], [update: string[] | ((prev: string[]) => string[])], void>;
export declare const themeMode: import("jotai").WritableAtom<"light" | "dark", [update: "light" | "dark" | ((prev: "light" | "dark") => "light" | "dark")], void>;
export declare const atomIsDrawer: import("jotai").PrimitiveAtom<boolean | undefined> & {
    init: boolean | undefined;
};
export declare const atomIsDrawerOnlyIcon: import("jotai").WritableAtom<boolean, [boolean | typeof import("jotai/utils").RESET | ((prev: boolean) => boolean | typeof import("jotai/utils").RESET)], void>;
export declare const atomLoadingCache: import("jotai").PrimitiveAtom<Record<string, boolean>> & {
    init: Record<string, boolean>;
};
export declare const atomUpdateState: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
interface IConnectionSetting {
    layout: 'table' | 'list';
}
export declare const atomConnectionSetting: import("jotai").PrimitiveAtom<IConnectionSetting> & {
    init: IConnectionSetting;
};
export declare const connectionTableColumnsAtom: import("jotai").WritableAtom<[string, boolean][] | Promise<[string, boolean][]>, [typeof import("jotai/utils").RESET | [string, boolean][] | Promise<[string, boolean][]> | ((prev: [string, boolean][] | Promise<[string, boolean][]>) => typeof import("jotai/utils").RESET | [string, boolean][] | Promise<[string, boolean][]>)], Promise<void>>;
export {};
