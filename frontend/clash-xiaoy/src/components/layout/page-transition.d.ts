import { type Variant } from 'framer-motion';
type PageVariantKey = 'initial' | 'visible' | 'hidden';
type PageVariant = {
    [key in PageVariantKey]: Variant;
};
export declare const pageTransitionVariants: {
    [name: string]: PageVariant;
};
export default function PageTransition({ className }: {
    className?: string;
}): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
