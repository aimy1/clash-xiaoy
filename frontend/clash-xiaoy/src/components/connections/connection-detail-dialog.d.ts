import { Connection } from '@nyanpasu/interface';
import { BaseDialogProps } from '@nyanpasu/ui';
export type ConnectionDetailDialogProps = {
    item?: Connection.Item;
} & Omit<BaseDialogProps, 'title'>;
export default function ConnectionDetailDialog({ item, ...others }: ConnectionDetailDialogProps): import("@emotion/react/jsx-runtime").JSX.Element | null;
