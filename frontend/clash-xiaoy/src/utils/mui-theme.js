// From https://github.com/RobinTail/merge-sx
export const mergeSxProps = (...styles) => {
    const capacitor = [];
    for (const sx of styles) {
        if (sx) {
            if (Array.isArray(sx)) {
                for (const sub of sx) {
                    capacitor.push(sub);
                }
            }
            else {
                capacitor.push(sx);
            }
        }
    }
    return capacitor;
};
