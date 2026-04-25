import { FC } from 'react';
import { type SvgIconComponent } from '@mui/icons-material';
export interface DatalineProps {
    className?: string;
    data: number[];
    icon: SvgIconComponent;
    title: string;
    total?: number;
    type?: 'speed' | 'raw';
    visible?: boolean;
}
export declare const Dataline: FC<DatalineProps>;
export default Dataline;
