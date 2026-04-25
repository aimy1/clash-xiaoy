import { type VariantProps } from 'class-variance-authority';
export declare const buttonVariants: (props?: ({
    variant?: "flat" | "basic" | "raised" | "stroked" | "fab" | null | undefined;
    disabled?: boolean | null | undefined;
    icon?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>, ButtonVariantsProps {
    asChild?: boolean;
    loading?: boolean;
}
export declare const Button: ({ loading, asChild, variant, disabled, icon, className, children, onClick, ...props }: ButtonProps) => import("@emotion/react/jsx-runtime").JSX.Element;
