export interface CombinedInfoPanelProps {
    timingData: {
        [key: string]: number;
    };
    refreshCount: number;
}
export declare const CombinedInfoPanel: ({ timingData, refreshCount }: CombinedInfoPanelProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default CombinedInfoPanel;
