import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
export declare function TooltipProvider({ delayDuration, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare function TooltipContent({ className, sideOffset, children, disableArrow, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content> & {
    disableArrow?: boolean;
}): import("@emotion/react/jsx-runtime").JSX.Element;
