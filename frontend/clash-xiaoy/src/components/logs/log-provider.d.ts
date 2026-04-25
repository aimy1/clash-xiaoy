import { PropsWithChildren } from 'react';
import { type ClashLog } from '@nyanpasu/interface';
export declare const useLogContext: () => {
    logs?: ClashLog[];
    filterText: string;
    setFilterText: (text: string) => void;
    logLevel: string;
    setLogLevel: (level: string) => void;
};
export declare const LogProvider: ({ children }: PropsWithChildren) => import("@emotion/react/jsx-runtime").JSX.Element;
