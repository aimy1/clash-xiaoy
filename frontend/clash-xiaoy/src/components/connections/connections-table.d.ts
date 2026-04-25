import { type ClashConnection, type ClashConnectionItem } from '@nyanpasu/interface';
export type TableConnection = ClashConnectionItem & {
    downloadSpeed?: number;
    uploadSpeed?: number;
};
export interface TableMessage extends Omit<ClashConnection, 'connections'> {
    connections: TableConnection[];
}
export declare const ConnectionsTable: ({ searchTerm }: {
    searchTerm?: string;
}) => import("@emotion/react/jsx-runtime").JSX.Element | null;
export default ConnectionsTable;
