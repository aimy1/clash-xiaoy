import { ComponentProps } from 'react';
export declare function CircularProgress({ value, indeterminate, className, children, ...props }: ComponentProps<'div'> & {
    indeterminate?: boolean;
    value?: number;
}): import("@emotion/react/jsx-runtime").JSX.Element;
export declare function LinearProgress({ value, indeterminate, className, ...props }: ComponentProps<'div'> & {
    indeterminate?: boolean;
    value?: number;
}): import("@emotion/react/jsx-runtime").JSX.Element;
