import createPlugin from 'tailwindcss/plugin';
import { MUI_BREAKPOINTS } from '@nyanpasu/ui/src/materialYou/themeConsts.mjs';
var getMUIScreen = function () {
    var breakpoints = MUI_BREAKPOINTS.values;
    var result = {};
    for (var key in breakpoints) {
        if (Object.prototype.hasOwnProperty.call(breakpoints, key)) {
            result[key] = "".concat(breakpoints[key], "px");
        }
    }
    return result;
};
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{tsx,ts}', '../ui/**/*.{tsx,ts}'],
    darkMode: 'selector',
    theme: {
        extend: {
            maxHeight: {
                '1/8': 'calc(100vh / 8)',
            },
            zIndex: {
                top: 100000,
            },
            animation: {
                marquee: 'marquee 4s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
            colors: {
                scroller: 'var(--scroller-color)',
                container: 'var(--background-color)',
            },
        },
        screen: getMUIScreen(),
    },
    plugins: [
        createPlugin(function (_a) {
            var addBase = _a.addBase;
            addBase({
                '.scrollbar-hidden::-webkit-scrollbar': {
                    width: '0px',
                },
            });
        }),
    ],
};
