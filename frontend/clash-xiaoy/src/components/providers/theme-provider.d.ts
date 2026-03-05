import { PropsWithChildren } from 'react';
import { Theme } from '@material/material-color-utilities';
export declare const DEFAULT_COLOR = "#eb00ff";
export declare const DEFAULT_DARK_COLOR = "#00fff0";
export declare enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
    SYSTEM = "system"
}
export declare function useExperimentalThemeContext(): {
    themePalette: Theme;
    themeCssVars: string;
    themeColor: string;
    setThemeColor: (color: string) => Promise<void>;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => Promise<void>;
};
export declare function ExperimentalThemeProvider({ children }: PropsWithChildren): import("@emotion/react/jsx-runtime").JSX.Element;
