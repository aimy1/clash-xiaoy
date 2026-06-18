import { ProfileQueryResultItem } from '@nyanpasu/interface';
interface Context {
    global: boolean;
    scoped: boolean;
}
export declare const ChainItem: import("react").NamedExoticComponent<{
    item: ProfileQueryResultItem;
    selected?: boolean;
    context?: Context;
    onClick: () => Promise<void>;
    onChainEdit: () => void;
}>;
export default ChainItem;
