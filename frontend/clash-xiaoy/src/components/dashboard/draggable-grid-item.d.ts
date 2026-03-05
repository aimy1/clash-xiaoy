import { GridProps } from '@mui/material/Grid';
import { ReactNode } from 'react';
interface DraggableGridItemProps extends GridProps {
    id: string;
    children: ReactNode;
    disabled?: boolean;
}
export declare function DraggableGridItem({ id, children, disabled, style, ...props }: DraggableGridItemProps): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
