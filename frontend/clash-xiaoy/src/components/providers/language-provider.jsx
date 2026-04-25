import { locale } from 'dayjs';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLockFn } from '@/hooks/use-lock-fn';
import { locales, setLocale } from '@/paraglide/runtime';
import { useSetting } from '@nyanpasu/interface';
import { changeLanguage } from 'i18next';
const LanguageContext = createContext(null);
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
export const LanguageProvider = ({ children }) => {
    const language = useSetting('language');
    const canonicalizeLocale = (value) => {
        const lower = value.toLowerCase();
        if (lower === 'zh' || lower === 'zh-cn' || lower === 'zh-hans')
            return 'zh-cn';
        if (lower === 'zh-tw' || lower === 'zh-hant')
            return 'zh-tw';
        return lower;
    };
    const forcedLocale = useMemo(() => {
        if (!import.meta.env.DEV) {
            return null;
        }
        const url = new URL(window.location.href);
        const forced = url.searchParams.get('lang');
        const canonicalForced = forced ? canonicalizeLocale(forced) : null;
        return canonicalForced && locales.includes(canonicalForced)
            ? canonicalForced
            : null;
    }, []);
    const [activeLocale, setActiveLocale] = useState(() => {
        if (forcedLocale) {
            return 'en';
        }
        const value = language.value;
        if (!value) {
            return 'en';
        }
        const canonical = canonicalizeLocale(value);
        return locales.includes(canonical) ? canonical : 'en';
    });
    const setLanguage = useLockFn(async (value) => {
        await language.upsert(value);
        changeLanguage(value);
        setLocale(value, { reload: false });
        setActiveLocale(value);
    });
    // sync dayjs locale
    useEffect(() => {
        locale(activeLocale);
    }, [activeLocale]);
    useEffect(() => {
        if (forcedLocale) {
            changeLanguage(forcedLocale);
            setLocale(forcedLocale, { reload: false });
            setActiveLocale(forcedLocale);
            return;
        }
        const value = language.value;
        if (!value) {
            return;
        }
        const canonical = canonicalizeLocale(value);
        changeLanguage(value);
        if (!locales.includes(canonical)) {
            return;
        }
        setLocale(canonical, { reload: false });
        setActiveLocale(canonical);
    }, [forcedLocale, language.value]);
    return (<LanguageContext.Provider value={{
            language: activeLocale,
            setLanguage,
        }}>
      {children}
    </LanguageContext.Provider>);
};
