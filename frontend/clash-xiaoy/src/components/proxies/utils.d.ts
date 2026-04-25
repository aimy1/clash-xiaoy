import type { ProxyGroupItem, ProxyItemHistory } from '@nyanpasu/interface';
export declare const filterDelay: (history?: ProxyItemHistory[]) => number;
export declare enum SortType {
    Default = "default",
    Delay = "delay",
    Name = "name"
}
export declare const nodeSortingFn: (selectedGroup: ProxyGroupItem, type: SortType) => {
    all: import("@nyanpasu/interface").ProxyItem[];
    name: string;
    type: string;
    udp: boolean;
    history: ProxyItemHistory[];
    now: string | null;
    provider: string | null;
    alive: boolean | null;
    xudp?: boolean | null;
    tfo?: boolean | null;
    icon?: string | null;
    hidden?: boolean;
};
