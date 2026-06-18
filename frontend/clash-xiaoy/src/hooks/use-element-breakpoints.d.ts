import { RefObject } from 'react';
export declare const useElementBreakpoints: (element: RefObject<HTMLElement>, breakpoints: {
    [key: string]: number;
}, defaultBreakpoint: string) => string | null;
