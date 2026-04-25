import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Dataline from '@/components/dashboard/dataline';
import TrafficCard from '@/components/dashboard/traffic-card';
import { atomIsDrawer } from '@/store';
import { MemoryOutlined, SettingsEthernet, } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { MAX_CONNECTIONS_HISTORY, MAX_MEMORY_HISTORY, MAX_TRAFFIC_HISTORY, useClashConnections, useClashMemory, useClashTraffic, useSetting, } from '@nyanpasu/interface';
export const useDataPanelItems = ({ visible = true }) => {
    const { t } = useTranslation();
    const { data: clashTraffic } = useClashTraffic();
    const { data: clashMemory } = useClashMemory();
    const { query: { data: clashConnections }, } = useClashConnections();
    const { value } = useSetting('clash_core');
    const supportMemory = value && ['mihomo', 'mihomo-alpha'].includes(value);
    const padData = (data = [], max) => Array(Math.max(0, max - data.length))
        .fill(0)
        .concat(data.slice(-max));
    const Datalines = [
        {
            id: 'traffic-combined',
            type: 'combined',
            downData: padData(clashTraffic?.map((item) => item.down), MAX_TRAFFIC_HISTORY),
            upData: padData(clashTraffic?.map((item) => item.up), MAX_TRAFFIC_HISTORY),
            downTotal: clashConnections?.at(-1)?.downloadTotal,
            upTotal: clashConnections?.at(-1)?.uploadTotal,
            visible,
        },
        {
            id: 'connections',
            data: padData(clashConnections?.map((item) => item.connections?.length ?? 0), MAX_CONNECTIONS_HISTORY),
            icon: SettingsEthernet,
            title: t('Active Connections'),
            type: 'raw',
            visible,
        },
    ];
    if (supportMemory) {
        Datalines.splice(1, 0, {
            id: 'memory',
            data: padData(clashMemory?.map((item) => item.inuse), MAX_MEMORY_HISTORY),
            icon: MemoryOutlined,
            title: t('Memory'),
            visible,
        });
    }
    const isDrawer = useAtomValue(atomIsDrawer);
    const gridLayout = useMemo(() => ({
        sm: isDrawer ? 6 : 12,
        md: 6,
        lg: supportMemory ? 3 : 4,
        xl: supportMemory ? 3 : 4,
    }), [isDrawer, supportMemory]);
    return { items: Datalines, gridLayout, supportMemory };
};
export const DataPanel = ({ visible = true }) => {
    const { items, gridLayout } = useDataPanelItems({ visible });
    return items.map((props) => {
        if (props.type === 'combined') {
            const combinedGridLayout = {
                sm: 12,
                md: 12,
                lg: gridLayout.lg * 2,
                xl: gridLayout.xl * 2,
            };
            return (<Grid key={props.id} size={combinedGridLayout}>
                <TrafficCard {...props} className="max-h-1/8 min-h-40"/>
            </Grid>);
        }
        const { id, ...rest } = props;
        return (<Grid key={id} size={gridLayout}>
        <Dataline {...rest} className="max-h-1/8 min-h-40"/>
      </Grid>);
    });
};
export default DataPanel;
