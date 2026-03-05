import { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { ClashProxiesQueryProxyItem } from '@nyanpasu/interface';
export default function ProxyNodeButton({ proxy, ...props }: Omit<ComponentProps<typeof Button>, 'onClick' | 'children'> & {
    proxy: ClashProxiesQueryProxyItem;
}): import("@emotion/react/jsx-runtime").JSX.Element;
