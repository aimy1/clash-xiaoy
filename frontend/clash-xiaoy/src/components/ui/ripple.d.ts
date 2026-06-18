import { Key, MouseEvent } from 'react';
export type RippleConfig = {
    key: Key;
    x: number;
    y: number;
    size: number;
};
export interface RippleProps {
    ripples: RippleConfig[];
    color?: string;
    onClear: (key: Key) => void;
}
export declare const Ripple: ({ ripples, color, onClear }: RippleProps) => import("@emotion/react/jsx-runtime").JSX.Element[];
export declare const useRipple: () => {
    ripples: RippleConfig[];
    onClick: (e: MouseEvent) => void;
    onClear: (key: Key) => void;
};
