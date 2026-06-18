import { BaseDialogProps } from '@nyanpasu/ui';
import { type Update } from '@tauri-apps/plugin-updater';
export interface UpdaterDialogProps extends Omit<BaseDialogProps, 'title'> {
    update: Update;
}
export default function UpdaterDialog({ open, update, onClose, ...others }: UpdaterDialogProps): import("@emotion/react/jsx-runtime").JSX.Element;
