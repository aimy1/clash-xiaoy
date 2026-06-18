import { ReactElement, ReactNode } from 'react';
import Paper from '@mui/material/Paper';
/**
 * @example
 * renderChip("http://localhost?server=%host", labels)
 *
 * @returns { (string | JSX.Element)[] }
 * (string | JSX.Element)[]
 *
 * `replace key string to Mui Chip.`
 *
 * @author keiko233 <i@elaina.moe>
 * @copyright LibNyanpasu org. 2024
 */
export declare const renderChip: (string: string, labels: {
    [label: string]: string | number | undefined | null;
}) => (string | ReactElement)[];
/**
 * @example
 * extractServer("127.0.0.1:7789")
 *
 * @returns { { host: string; port: number } }
 * { host: "127.0.0.1"; port: 7789 }
 *
 * @author keiko233 <i@elaina.moe>
 * @copyright LibNyanpasu org. 2024
 */
export declare const extractServer: (string?: string) => {
    host: string;
    port: number;
};
/**
 * @example
 * openWebUrl("http://localhost?server=%host", labels)
 *
 * @returns { void }
 * void
 *
 * `open clash external web url with browser.`
 *
 * @author keiko233 <i@elaina.moe>
 * @copyright LibNyanpasu org. 2024
 */
export declare const openWebUrl: (string: string, labels: {
    [label: string]: string | number | undefined | null;
}) => void;
/**
 * @example
 * <Item>
 *  <Child />
 * </Item>
 *
 * `Material You list Item. Extend MuiPaper.`
 *
 * @author keiko233 <i@elaina.moe>
 * @copyright LibNyanpasu org. 2024
 */
export declare const Item: typeof Paper;
export interface ClashWebItemProps {
    label: ReactNode;
    onOpen: () => void;
    onDelete: () => void;
    onEdit: () => void;
}
/**
 * @example
 * <ClashWebItem
    label={renderChip(item, labels)}
    onOpen={() => openWebUrl(item, labels)}
    onEdit={() => {
      setEditString(item);
      setOpen(true);
    }}
    onDelete={() => {}}
  />
  
 * `Clash Web UI list Item.`
 *
 * @author keiko233 <i@elaina.moe>
 * @copyright LibNyanpasu org. 2024
 */
export declare const ClashWebItem: ({ label, onOpen, onDelete, onEdit, }: ClashWebItemProps) => import("@emotion/react/jsx-runtime").JSX.Element;
