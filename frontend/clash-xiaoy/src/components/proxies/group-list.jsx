import { useAtom, useAtomValue } from 'jotai';
import { memo, useDeferredValue, useMemo } from 'react';
import useSWR from 'swr';
import { Virtualizer } from 'virtua';
import { proxyGroupAtom } from '@/store';
import { proxiesFilterAtom } from '@/store/proxies';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material';
import { getServerPort, useClashProxies } from '@nyanpasu/interface';
import { alpha, LazyImage } from '@nyanpasu/ui';
const IconRender = memo(function IconRender({ icon }) {
    const { data: serverPort, isLoading, error, } = useSWR('/getServerPort', getServerPort);
    const src = icon.trim().startsWith('<svg')
        ? `data:image/svg+xml;base64,${btoa(icon)}`
        : icon;
    const cachedUrl = useMemo(() => {
        if (!src.startsWith('http')) {
            return src;
        }
        return `http://localhost:${serverPort}/cache/icon?url=${btoa(src)}`;
    }, [src, serverPort]);
    if (isLoading || error) {
        return null;
    }
    return (<ListItemIcon>
      <LazyImage className="h-11 w-11" loadingClassName="rounded-full" src={cachedUrl}/>
    </ListItemIcon>);
});
export const GroupList = ({ scrollRef, ...listItemButtonProps }) => {
    const { data } = useClashProxies();
    const [proxyGroup, setProxyGroup] = useAtom(proxyGroupAtom);
    const proxiesFilter = useAtomValue(proxiesFilterAtom);
    const deferredProxiesFilter = useDeferredValue(proxiesFilter);
    const handleSelect = (index) => {
        setProxyGroup({ selector: index });
    };
    const groups = useMemo(() => {
        if (!data?.groups) {
            return [];
        }
        return data.groups.filter((group) => {
            return (!deferredProxiesFilter ||
                group.name
                    .toLowerCase()
                    .includes(deferredProxiesFilter.toLowerCase()) ||
                group.all?.some((proxy) => {
                    return proxy.name
                        .toLowerCase()
                        .includes(deferredProxiesFilter.toLowerCase());
                }) ||
                false);
        });
    }, [data?.groups, deferredProxiesFilter]);
    return (<Virtualizer scrollRef={scrollRef}>
      {groups.map((group, index) => {
            const selected = index === proxyGroup.selector;
            return (<ListItem key={index} disablePadding>
            <ListItemButton selected={selected} onClick={() => handleSelect(index)} sx={[
                    (theme) => ({
                        backgroundColor: selected
                            ? `${alpha(theme.vars.palette.primary.main, 0.3)} !important`
                            : null,
                    }),
                ]} {...listItemButtonProps}>
              {group.icon && <IconRender icon={group.icon}/>}

              <ListItemText className="!truncate" primary={group.name} secondary={group.now}/>
            </ListItemButton>
          </ListItem>);
        })}
    </Virtualizer>);
};
