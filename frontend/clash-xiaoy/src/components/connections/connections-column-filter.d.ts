import { type MRT_ColumnDef } from 'material-react-table';
import { BaseDialogProps } from '@nyanpasu/ui';
import { TableConnection } from './connections-table';
export declare const useColumns: () => Array<MRT_ColumnDef<TableConnection>>;
export type ConnectionColumnFilterDialogProps = {} & Omit<BaseDialogProps, 'title'>;
export default function ConnectionColumnFilterDialog(props: ConnectionColumnFilterDialogProps): import("@emotion/react/jsx-runtime").JSX.Element;
