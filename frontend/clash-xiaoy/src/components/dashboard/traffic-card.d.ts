import { FC } from 'react';
export interface TrafficCardProps {
    className?: string;
    upData: number[];
    downData: number[];
    upTotal?: number;
    downTotal?: number;
    visible?: boolean;
}
export declare const TrafficCard: FC<TrafficCardProps>;
export default TrafficCard;
