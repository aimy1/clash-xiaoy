import { ReactNode } from 'react';
interface InnerProps {
    type: string;
    duration?: number;
    message: ReactNode;
    onClose: () => void;
}
interface NoticeInstance {
    (props: Omit<InnerProps, 'onClose'>): void;
    info(message: ReactNode, duration?: number): void;
    error(message: ReactNode, duration?: number): void;
    success(message: ReactNode, duration?: number): void;
}
export declare const Notice: NoticeInstance;
export {};
