import { type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
export declare const cardVariants: (props?: ({
    variant?: "outline" | "basic" | "raised" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type CardVariantsProps = VariantProps<typeof cardVariants>;
export declare const cardContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
export type CardContentVariantsProps = VariantProps<typeof cardContentVariants>;
export declare const cardHeaderVariants: (props?: ({
    variant?: "outline" | "basic" | "raised" | null | undefined;
    divider?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type CardHeaderVariantsProps = VariantProps<typeof cardHeaderVariants>;
export declare const cardFooterVariants: (props?: ({
    variant?: "outline" | "basic" | "raised" | null | undefined;
    divider?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type CardFooterVariantsProps = VariantProps<typeof cardFooterVariants>;
type CardContextType = {
    variant: CardVariantsProps['variant'];
    divider: CardHeaderVariantsProps['divider'] & CardFooterVariantsProps['divider'];
};
export interface CardProps extends HTMLAttributes<HTMLDivElement>, CardVariantsProps, Partial<CardContextType> {
    asChild?: boolean;
}
export declare const Card: ({ variant, divider, asChild, className, ...props }: CardProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export type CardContentProps = HTMLAttributes<HTMLDivElement> & CardContentVariantsProps;
export declare const CardContent: ({ className, ...props }: CardContentProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export type CardHeaderProps = HTMLAttributes<HTMLDivElement> & CardHeaderVariantsProps & {
    asChild?: boolean;
};
export declare const CardHeader: ({ divider, variant, className, ...props }: CardHeaderProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement>, CardFooterVariantsProps {
}
export declare const CardFooter: ({ divider, variant, className, ...props }: CardFooterProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
