import { ProfileQueryResultItem } from '@nyanpasu/interface';
export interface ProfileDialogProps {
    profile?: ProfileQueryResultItem;
    open: boolean;
    onClose: () => void;
}
export type AddProfileContextValue = {
    name: string | null;
    desc: string | null;
    url: string;
};
export declare const AddProfileContext: import("react").Context<AddProfileContextValue | null>;
export declare const ProfileDialog: ({ profile, open, onClose, }: ProfileDialogProps) => import("@emotion/react/jsx-runtime").JSX.Element;
