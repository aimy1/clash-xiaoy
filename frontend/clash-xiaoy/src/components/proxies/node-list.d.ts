import { RefObject } from 'react';
export interface NodeListRef {
    scrollToCurrent: () => void;
}
export declare const NodeList: import("react").ForwardRefExoticComponent<{
    scrollRef: RefObject<HTMLElement>;
} & import("react").RefAttributes<unknown>>;
