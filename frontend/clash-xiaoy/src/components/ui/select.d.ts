import { type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
export declare const selectTriggerVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;
export declare const selectLineVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type SelectLineVariants = VariantProps<typeof selectLineVariants>;
export declare const selectValueVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
    haveValue?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type SelectValueVariants = VariantProps<typeof selectValueVariants>;
export declare const selectValuePlaceholderVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
    focus?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type SelectValuePlaceholderVariants = VariantProps<typeof selectValuePlaceholderVariants>;
export declare const selectValuePlaceholderFieldsetVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type SelectValuePlaceholderFieldsetVariants = VariantProps<typeof selectValuePlaceholderFieldsetVariants>;
export declare const selectValuePlaceholderLegendVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
    haveValue?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type SelectValuePlaceholderLegendVariants = VariantProps<typeof selectValuePlaceholderLegendVariants>;
export declare const selectContentVariants: (props?: ({
    variant?: "filled" | "outlined" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type SelectContentVariants = VariantProps<typeof selectContentVariants>;
export declare const SelectLine: ({ className, ...props }: ComponentProps<"div">) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const Select: ({ onValueChange, variant, open: inputOpen, defaultOpen, onOpenChange, ...props }: React.ComponentProps<typeof SelectPrimitive.Root> & SelectTriggerVariants) => import("@emotion/react/jsx-runtime").JSX.Element;
export type SelectProps = ComponentProps<typeof Select>;
export declare const SelectValue: ({ className, placeholder, ...props }: ComponentProps<typeof SelectPrimitive.Value>) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const SelectGroup: (props: ComponentProps<typeof SelectPrimitive.Group>) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const SelectLabel: ({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const SelectTrigger: ({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Trigger>) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const SelectIcon: ({ asChild, children, className, ...props }: ComponentProps<typeof SelectPrimitive.Icon>) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const SelectContent: ({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Content>) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const SelectItem: ({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) => import("@emotion/react/jsx-runtime").JSX.Element;
