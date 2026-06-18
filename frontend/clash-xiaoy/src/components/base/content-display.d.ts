import { ReactNode } from 'react';
export interface ContentDisplayProps {
    className?: string;
    message?: string;
    children?: ReactNode;
}
export declare const ContentDisplay: ({ message, children, className, }: ContentDisplayProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default ContentDisplay;
