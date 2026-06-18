import { RefObject } from 'react';
import { ClashRule } from '@nyanpasu/interface';
export declare const atomRulePage: import("jotai").PrimitiveAtom<{
    data?: ClashRule[];
    scrollRef?: RefObject<HTMLElement>;
} | undefined> & {
    init: {
        data?: ClashRule[];
        scrollRef?: RefObject<HTMLElement>;
    } | undefined;
};
