import { motion } from 'framer-motion';
import { cn } from '@nyanpasu/ui';
export function SettingsCard({ className, ...props }) {
    return <div className={cn('px-4', className)} {...props}/>;
}
export function SettingsCardHeader({ className, ...props }) {
    return (<div className={cn('flex items-center justify-between pb-3', className)} {...props}/>);
}
export function SettingsCardContent({ className, ...props }) {
    return <div className={cn('py-4', className)} {...props}/>;
}
export function SettingsCardAnimatedItem({ className, ...props }) {
    return (<motion.div className={cn('overflow-hidden', className)} initial={{
            height: 0,
            opacity: 0,
        }} animate={{
            height: 'auto',
            opacity: 1,
        }} exit={{
            height: 0,
            opacity: 0,
        }} transition={{
            height: {
                duration: 0.2,
                ease: 'easeInOut',
            },
            opacity: {
                duration: 0.15,
            },
        }} {...props}/>);
}
