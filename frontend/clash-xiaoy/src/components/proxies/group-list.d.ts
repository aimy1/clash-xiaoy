import { RefObject } from 'react';
import { ListItemButtonProps } from '@mui/material';
export interface GroupListProps extends ListItemButtonProps {
    scrollRef: RefObject<HTMLElement>;
}
export declare const GroupList: ({ scrollRef, ...listItemButtonProps }: GroupListProps) => import("@emotion/react/jsx-runtime").JSX.Element;
