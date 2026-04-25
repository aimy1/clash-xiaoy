import { type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
export declare const inputContainerVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type InputContainerVariants = VariantProps<typeof inputContainerVariants>;
export declare const inputVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
    haveValue?: boolean | null | undefined;
    haveLabel?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type InputVariants = VariantProps<typeof inputVariants>;
export declare const inputLabelVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
    focus?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type InputLabelVariants = VariantProps<typeof inputLabelVariants>;
export declare const inputLineVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type InputLineVariants = VariantProps<typeof inputLineVariants>;
export declare const inputLabelFieldsetVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type InputLabelFieldsetVariants = VariantProps<typeof inputLabelFieldsetVariants>;
export declare const inputLabelLegendVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
    haveValue?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type InputLabelLegendVariants = VariantProps<typeof inputLabelLegendVariants>;
export declare const InputContainer: ({ className, ...props }: ComponentProps<"div">) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const InputLine: ({ className, ...props }: ComponentProps<"input">) => import("@emotion/react/jsx-runtime").JSX.Element;
export type InputProps = ComponentProps<'input'> & {
    label?: string;
} & InputContainerVariants;
export declare const Input: {
    ({ variant, className, label, children, onChange, ...props }: InputProps): import("@emotion/react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const InputLabel: {
    ({ className, ...props }: ComponentProps<"label">): import("@emotion/react/jsx-runtime").JSX.Element;
    displayName: string;
};
export type NumericInputProps = Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'defaultValue' | 'type'> & {
    value?: number | null;
    defaultValue?: number | null;
    onChange?: (value: number | null) => void;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    decimalScale?: number;
    allowNegative?: boolean;
} & InputContainerVariants;
export declare const NumericInput: {
    ({ label, variant, className, onChange, value, defaultValue, min, max, step, decimalScale, allowNegative, ...props }: NumericInputProps): import("@emotion/react/jsx-runtime").JSX.Element;
    displayName: string;
};
