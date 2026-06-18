import { createContext, useContext, } from 'react';
import useIsMobile from '@/hooks/use-is-moblie';
import { cn } from '@nyanpasu/ui';
import { AppContentScrollArea } from './scroll-area';
const SidebarContext = createContext(null);
export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarContext must be used within a SidebarContext.Provider');
    }
    return context;
};
export function Sidebar({ className, ...props }) {
    const isMobile = useIsMobile();
    return (<SidebarContext.Provider value={{
            isHiddenSide: isMobile,
        }}>
      <div className={cn('flex', className)} data-slot="sidebar-container" {...props}/>
    </SidebarContext.Provider>);
}
export function SidebarContent({ className, ...props }) {
    const { isHiddenSide } = useSidebarContext();
    if (isHiddenSide) {
        return null;
    }
    return (<AppContentScrollArea className={cn('z-50 max-w-96 min-w-64', className)} data-slot="sidebar-scroll-area" {...props}/>);
}
