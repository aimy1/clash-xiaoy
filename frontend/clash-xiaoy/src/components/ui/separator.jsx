import { cn } from '@nyanpasu/ui';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
export function Separator({ className, orientation = 'horizontal', decorative = true, ...props }) {
    return (<SeparatorPrimitive.Root data-slot="separator" decorative={decorative} orientation={orientation} className={cn('bg-outline-variant/50 shrink-0', 'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full', 'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px', className)} {...props}/>);
}
