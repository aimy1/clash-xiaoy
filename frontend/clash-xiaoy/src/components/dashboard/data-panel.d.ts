import { DatalineProps } from '@/components/dashboard/dataline';
import { TrafficCardProps } from '@/components/dashboard/traffic-card';
export declare const useDataPanelItems: ({ visible }: {
    visible?: boolean;
}) => {
    items: ((DatalineProps & {
        visible?: boolean;
        id: string;
        type?: string;
    }) | (TrafficCardProps & {
        visible?: boolean;
        id: string;
        type: "combined";
    }))[];
    gridLayout: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    supportMemory: boolean | null | undefined;
};
export declare const DataPanel: ({ visible }: {
    visible?: boolean;
}) => import("@emotion/react/jsx-runtime").JSX.Element[];
export default DataPanel;
