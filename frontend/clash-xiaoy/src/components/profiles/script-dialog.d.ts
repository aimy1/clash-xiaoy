import { Profile } from '@nyanpasu/interface';
import { BaseDialogProps } from '@nyanpasu/ui';
export interface ScriptDialogProps extends Omit<BaseDialogProps, 'title'> {
    open: boolean;
    onClose: () => void;
    profile?: Profile;
}
export declare const ScriptDialog: ({ open, profile, onClose, ...props }: ScriptDialogProps) => import("@emotion/react/jsx-runtime").JSX.Element;
