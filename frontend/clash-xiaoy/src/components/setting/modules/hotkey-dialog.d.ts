import { BaseDialogProps } from '@nyanpasu/ui';
export type HotkeyDialogProps = Omit<BaseDialogProps, 'title'>;
export default function HotkeyDialog({ open, onClose, children, ...rest }: HotkeyDialogProps): import("@emotion/react/jsx-runtime").JSX.Element;
