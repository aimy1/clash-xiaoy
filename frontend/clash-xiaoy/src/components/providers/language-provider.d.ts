import { PropsWithChildren } from 'react';
import { Locale } from '@/paraglide/runtime';
export declare const useLanguage: () => {
    language?: Locale;
    setLanguage: (value: Locale) => Promise<void>;
};
export declare const LanguageProvider: ({ children }: PropsWithChildren) => import("@emotion/react/jsx-runtime").JSX.Element;
