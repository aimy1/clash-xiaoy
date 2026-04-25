export function insertStyle(id, style) {
    removeStyle(id);
    const waitInsertStyle = document.createElement('style');
    waitInsertStyle.id = id;
    waitInsertStyle.innerHTML = style;
    document.head.appendChild(waitInsertStyle);
    return waitInsertStyle;
}
export function removeStyle(id) {
    const originalElement = document.getElementById(id);
    if (originalElement) {
        document.head.removeChild(originalElement);
    }
}
