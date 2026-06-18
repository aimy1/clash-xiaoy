import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
interface ScrollAreaContextValue {
    isScrolling: boolean;
    isTop: boolean;
    isBottom: boolean;
    scrollDirection: 'up' | 'down' | 'left' | 'right' | 'none';
    viewportRef: React.RefObject<HTMLDivElement | null>;
}
export declare function useScrollArea(): ScrollAreaContextValue;
export declare function Viewport({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare const Corner: React.ForwardRefExoticComponent<ScrollAreaPrimitive.ScrollAreaCornerProps & React.RefAttributes<HTMLDivElement>>;
export declare const Root: React.ForwardRefExoticComponent<ScrollAreaPrimitive.ScrollAreaProps & React.RefAttributes<HTMLDivElement>>;
export declare function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare function ScrollBar({ className, orientation, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare function AppContentScrollArea({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
