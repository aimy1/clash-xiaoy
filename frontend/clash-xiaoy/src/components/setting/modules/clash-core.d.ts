import { ClashCore, ClashCoresDetail } from '@nyanpasu/interface';
export declare const getImage: (core: ClashCore) => string;
export interface ClashCoreItemProps {
    selected: boolean;
    data: ClashCoresDetail;
    core: ClashCore;
    onClick: (core: ClashCore) => void;
}
/**
 * @example
 * <ClashCoreItem
    data={core}
    selected={selected}
    onClick={() => changeClashCore(item.core)}
  />
 *
 * `Design for Clash Core used.`
 *
 * @author keiko233 <i@elaina.moe>
 * @copyright LibNyanpasu org. 2024
 */
export declare const ClashCoreItem: ({ selected, data, core, onClick, }: ClashCoreItemProps) => import("@emotion/react/jsx-runtime").JSX.Element;
