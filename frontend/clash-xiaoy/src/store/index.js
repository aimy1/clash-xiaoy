import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { SortType } from '@/components/proxies/utils';
import { NyanpasuStorage } from '@/services/storage';
const atomWithLocalStorage = (key, initialValue) => {
    const getInitialValue = () => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    };
    const baseAtom = atom(getInitialValue());
    const derivedAtom = atom((get) => get(baseAtom), (get, set, update) => {
        const nextValue = typeof update === 'function'
            ? update(get(baseAtom))
            : update;
        set(baseAtom, nextValue);
        localStorage.setItem(key, JSON.stringify(nextValue));
    });
    return derivedAtom;
};
export const memorizedRoutePathAtom = atomWithStorage('memorizedRoutePathAtom', null, undefined, {
    getOnInit: true,
});
export const proxyGroupAtom = atomWithLocalStorage('proxyGroupAtom', {
    selector: 0,
});
export const proxyGroupSortAtom = atomWithLocalStorage('proxyGroupSortAtom', SortType.Default);
export const atomDashboardLayout = atomWithLocalStorage('dashboard_layout_v4', []);
export const themeMode = atomWithLocalStorage('themeMode', 'light');
export const atomIsDrawer = atom();
export const atomIsDrawerOnlyIcon = atomWithStorage('atomIsDrawerOnlyIcon', true);
// save the state of each profile item loading
export const atomLoadingCache = atom({});
// save update state
export const atomUpdateState = atom(false);
export const atomConnectionSetting = atom({
    layout: 'table',
});
// TODO: generate default columns based on COLUMNS
export const connectionTableColumnsAtom = atomWithStorage('connections_table_columns', [
    'host',
    'process',
    'downloaded',
    'uploaded',
    'dl_speed',
    'ul_speed',
    'chains',
    'rule',
    'time',
    'source',
    'destination_ip',
    'destination_asn',
    'type',
].map((key) => [key, true]), createJSONStorage(() => NyanpasuStorage));
// export const themeSchemeAtom = atom<MDYTheme["schemes"] | null>(null);
