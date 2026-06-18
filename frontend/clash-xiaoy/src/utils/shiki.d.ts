import type { Highlighter } from 'shiki';
export declare function getShikiSingleton(): Promise<Highlighter>;
export declare function formatAnsi(str: string): Promise<string>;
