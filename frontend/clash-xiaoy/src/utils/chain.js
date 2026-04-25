export function chains(...handlers) {
    return (event) => {
        handlers.forEach((handler) => {
            if (handler) {
                handler(event);
            }
        });
    };
}
