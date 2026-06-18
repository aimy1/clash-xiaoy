import { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import { PaperButtonProps } from './nyanpasu-path';
export interface PaperSwitchButtonProps extends PaperButtonProps {
    label?: string;
    checked: boolean;
    loading?: boolean;
    disableLoading?: boolean;
    children?: ReactNode;
    onClick?: () => Promise<void> | void;
    sxPaper?: SxProps<Theme>;
}
export declare const PaperSwitchButton: import("react").NamedExoticComponent<PaperSwitchButtonProps>;
