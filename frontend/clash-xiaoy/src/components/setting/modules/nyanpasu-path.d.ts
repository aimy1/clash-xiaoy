import { ReactNode } from 'react';
import { ButtonBaseProps, SxProps, Theme } from '@mui/material';
export interface PaperButtonProps extends ButtonBaseProps {
    label?: string;
    children?: ReactNode;
    sxPaper?: SxProps<Theme>;
    sxButton?: SxProps<Theme>;
}
export declare const PaperButton: import("react").NamedExoticComponent<PaperButtonProps>;
