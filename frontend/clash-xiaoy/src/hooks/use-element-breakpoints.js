import { useEffect, useState } from 'react';
export const useElementBreakpoints = (element, breakpoints, defaultBreakpoint) => {
    const [breakpoint, setBreakpoint] = useState(defaultBreakpoint);
    useEffect(() => {
        let observer = null;
        if (element.current) {
            observer = new ResizeObserver(() => {
                const { width } = element.current.getBoundingClientRect();
                const breakpoint = Object.entries(breakpoints).find(([, value]) => width >= value)?.[0];
                if (breakpoint) {
                    setBreakpoint(breakpoint);
                }
            });
            observer.observe(element.current);
        }
        return () => observer?.disconnect();
    }, [element, breakpoints]);
    return breakpoint;
};
