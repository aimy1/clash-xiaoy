import { BaseDialogProps } from '@nyanpasu/ui';
export type TrayIconDialogProps = Omit<BaseDialogProps, 'title'>;
export default function TrayIconDialog({ open, onClose, ...props }: TrayIconDialogProps): import("@emotion/react/jsx-runtime").JSX.Element;
