import { getSingletonHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import minLight from 'shiki/themes/min-light.mjs';
import nord from 'shiki/themes/nord.mjs';
import getWasm from 'shiki/wasm';
let shiki = null;
export async function getShikiSingleton() {
    if (!shiki) {
        shiki = (await getSingletonHighlighterCore({
            engine: createOnigurumaEngine(import('shiki/wasm')),
            themes: [nord, minLight],
            langs: [() => import('shiki/langs/shell.mjs')],
            loadWasm: getWasm,
        }));
    }
    return shiki;
}
export async function formatAnsi(str) {
    const instance = await getShikiSingleton();
    return instance.codeToHtml(str, {
        lang: 'ansi',
        themes: {
            dark: 'nord',
            light: 'min-light',
        },
    });
}
