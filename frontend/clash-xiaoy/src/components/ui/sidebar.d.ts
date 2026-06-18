import { ComponentProps } from 'react';
import { AppContentScrollArea } from './scroll-area';
export declare const useSidebarContext: () => {
    isHiddenSide: boolean;
};
export declare function Sidebar({ className, ...props }: ComponentProps<'div'>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare function SidebarContent({ className, ...props }: ComponentProps<typeof AppContentScrollArea>): import("@emotion/react/jsx-runtime").JSX.Element | null;
