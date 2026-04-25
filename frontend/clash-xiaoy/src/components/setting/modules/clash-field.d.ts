import { ChangeEvent } from 'react';
import { ButtonBaseProps } from '@mui/material/ButtonBase';
import { SwitchProps } from '@mui/material/Switch';
export interface LabelSwitchProps extends SwitchProps {
    label: string;
    url?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => Promise<void> | void;
}
/**
 * @example
 * <LabelSwitch
    label={label}
    url={url}
    checked={true}
    onChange={(key) => console.log(key)}
  />
 * `Design for Clash Filed use.`
 *
 * @author keiko233 <i@elaina.moe>
 * @copyright LibNyanpasu org. 2024
 */
export declare const LabelSwitch: ({ label, url, onChange, ...props }: LabelSwitchProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export interface ClashFieldItemProps extends ButtonBaseProps {
    label: string;
    fields: string[];
}
/**
 * @example
 * <ClashFieldItem
    label={label}
    fields={string[]}
    onClick={() => console.log("open")}
  />

 * `Design for Clash Filed use.`
 *
 * @author keiko233 <i@elaina.moe>
 * @copyright LibNyanpasu org. 2024
 */
export declare const ClashFieldItem: ({ label, fields, ...props }: ClashFieldItemProps) => import("@emotion/react/jsx-runtime").JSX.Element;
