import { ProfileQueryResultItem } from '@nyanpasu/interface';
export interface SideChainProps {
    onChainEdit: (item?: ProfileQueryResultItem) => void | Promise<void>;
}
export declare const SideChain: ({ onChainEdit }: SideChainProps) => import("@emotion/react/jsx-runtime").JSX.Element;
