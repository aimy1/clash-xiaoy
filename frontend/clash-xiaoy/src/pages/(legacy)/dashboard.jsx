import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter, } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy, } from '@dnd-kit/sortable';
import { useAtomValue, useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDataPanelItems } from '@/components/dashboard/data-panel';
import Dataline from '@/components/dashboard/dataline';
import TrafficCard from '@/components/dashboard/traffic-card';
import { DraggableGridItem } from '@/components/dashboard/draggable-grid-item';
import CombinedInfoPanel from '@/components/dashboard/modules/combined-info-panel';
import SystemInfoPanel from '@/components/dashboard/modules/system-info-panel';
import CurrentNodeStatusPanel from '@/components/dashboard/modules/current-node-status-panel';
import ProxyShortcuts from '@/components/dashboard/proxy-shortcuts';
import ServiceShortcuts from '@/components/dashboard/service-shortcuts';
import { useHealthPanelData } from '@/components/dashboard/health-panel';
import { useVisibility } from '@/hooks/use-visibility';
import { atomIsDrawer, atomDashboardLayout } from '@/store';
import { OpenInNewRounded } from '@mui/icons-material';
import { Button, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { openThat, useClashWSContext } from '@nyanpasu/interface';
import { BasePage } from '@nyanpasu/ui';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/(legacy)/dashboard')({
    component: Dashboard,
});
const RELEASES_URL = 'https://github.com/aimy1/clash-xiaoy/releases';
const CURRENT_APP_VERSION = '2.7.20';
function SoftwareUpdatePanel() {
    const [latestRelease, setLatestRelease] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const refreshRelease = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const resp = await fetch('https://api.github.com/repos/aimy1/clash-xiaoy/releases/latest');
            if (!resp.ok) {
                throw new Error(`HTTP ${resp.status}`);
            }
            setLatestRelease(await resp.json());
        }
        catch (e) {
            setError(e instanceof Error ? e.message : 'unknown');
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        refreshRelease();
    }, [refreshRelease]);
    return (<Paper className="flex !h-full flex-col gap-3 !rounded-3xl p-3 cyber-glass">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-semibold text-[var(--text-title)]">
          软件更新
        </div>
        <div className="rounded-full bg-[var(--chip-bg)] px-2 py-0.5 text-xs text-[var(--text-sub)]">
          {latestRelease?.tag_name ?? '--'}
        </div>
      </div>

      <div className="rounded-2xl bg-[var(--surface-2)] px-3 py-2 text-sm">
        <div className="text-xs text-[var(--text-sub)]">
          当前版本: v{CURRENT_APP_VERSION}
        </div>
        <div className="truncate text-[var(--text-primary)]">
          {latestRelease?.name || latestRelease?.tag_name || '-'}
        </div>
        <div className="mt-1 text-xs text-[var(--text-sub)]">
          {latestRelease?.published_at
            ? new Date(latestRelease.published_at).toLocaleString('zh-CN', {
                hour12: false,
            })
            : '未获取到发布时间'}
        </div>
        {!!error && <div className="mt-1 text-xs text-red-500">获取失败: {error}</div>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <Button size="small" variant="outlined" className="!rounded-xl" disabled={loading} onClick={refreshRelease}>
          {loading ? '检查中...' : '检查最新版本'}
        </Button>
        <Button size="small" variant="contained" className="!rounded-xl" endIcon={<OpenInNewRounded />} onClick={() => openThat(latestRelease?.html_url ?? RELEASES_URL)}>
          前往 GitHub 下载更新
        </Button>
      </div>
    </Paper>);
}
function Dashboard() {
    const { t } = useTranslation();
    const visible = useVisibility();
    const { setRecordTraffic } = useClashWSContext();
    // When the page is not visible, reduce the traffic data update frequency
    setRecordTraffic(visible);
    // Data Hooks
    const { items: dataItems, gridLayout: dataPanelGridLayout, supportMemory } = useDataPanelItems({ visible });
    const { health, refreshCount } = useHealthPanelData();
    const isDrawer = useAtomValue(atomIsDrawer);
    // Initial Items Order
    const [items, setItems] = useAtom(atomDashboardLayout);
    // Initialize items when supportMemory changes or on mount
    useEffect(() => {
        setItems((prev) => {
            const defaultOrder = [
                'current-node-status',
                'traffic-combined',
                'connections',
                ...(supportMemory ? ['memory'] : []),
                'info-combined',
                'proxy-shortcuts',
                'service-shortcuts',
                'software-update',
                'system-info',
            ];
            // If we already have items, we try to preserve the order
            if (prev.length > 0) {
                // Filter out items that are no longer supported (e.g. memory disabled)
                // Also handle migration from old traffic cards to combined card
                // And migrate timing/ipasn to info-combined
                let currentItems = prev.filter(id => {
                    if (id === 'memory' && !supportMemory)
                        return false;
                    if (id === 'traffic-down' || id === 'traffic-up')
                        return false;
                    if (id === 'timing' || id === 'ipasn')
                        return false;
                    return true;
                });
                // Add traffic-combined if it's missing (migration or new install)
                if (!currentItems.includes('traffic-combined')) {
                    // Try to insert at the beginning or where traffic-down was
                    const oldTrafficIndex = prev.indexOf('traffic-down');
                    if (oldTrafficIndex !== -1) {
                        currentItems.splice(oldTrafficIndex, 0, 'traffic-combined');
                    }
                    else {
                        currentItems.unshift('traffic-combined');
                    }
                }
                // Add info-combined if it's missing (migration)
                if (!currentItems.includes('info-combined')) {
                    const oldTimingIndex = prev.indexOf('timing');
                    if (oldTimingIndex !== -1) {
                        currentItems.splice(oldTimingIndex, 0, 'info-combined');
                    }
                    else {
                        // Try to find a good spot
                        const sysInfoIndex = currentItems.indexOf('system-info');
                        if (sysInfoIndex !== -1) {
                            currentItems.splice(sysInfoIndex, 0, 'info-combined');
                        }
                        else {
                            currentItems.push('info-combined');
                        }
                    }
                }
                // Add new items that might be missing
                defaultOrder.forEach(id => {
                    if (!currentItems.includes(id)) {
                        // Find appropriate position or append
                        if (id === 'memory') {
                            // Insert memory after connections if possible
                            const connIndex = currentItems.indexOf('connections');
                            if (connIndex !== -1) {
                                currentItems.splice(connIndex + 1, 0, id);
                            }
                            else {
                                currentItems.push(id);
                            }
                        }
                        else if (id === 'current-node-status') {
                            // Insert after system-info if possible
                            const sysInfoIndex = currentItems.indexOf('system-info');
                            if (sysInfoIndex !== -1) {
                                currentItems.splice(sysInfoIndex + 1, 0, id);
                            }
                            else {
                                currentItems.push(id);
                            }
                        }
                        else if (id === 'software-update') {
                            const serviceIndex = currentItems.indexOf('service-shortcuts');
                            if (serviceIndex !== -1) {
                                currentItems.splice(serviceIndex + 1, 0, id);
                            }
                            else {
                                currentItems.push(id);
                            }
                        }
                        else {
                            currentItems.push(id);
                        }
                    }
                });
                return currentItems;
            }
            return defaultOrder;
        });
    }, [supportMemory]);
    const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { delay: 1000, tolerance: 5 } }), useSensor(TouchSensor, { activationConstraint: { delay: 1000, tolerance: 5 } }));
    const [activeId, setActiveId] = useState(null);
    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    };
    // Grid Sizes Logic
    const getGridSize = (id) => {
        if (['connections', 'memory'].includes(id)) {
            return dataPanelGridLayout;
        }
        if (id === 'traffic-combined') {
            return {
                sm: 12,
                md: 12,
                lg: (supportMemory ? 3 : 4) * 2,
                xl: (supportMemory ? 3 : 4) * 2,
            };
        }
        if (id === 'info-combined') {
            return {
                sm: 12,
                md: 12,
                lg: 8,
                xl: 6,
            };
        }
        if (id === 'software-update') {
            return {
                sm: 12,
                md: 6,
                lg: 4,
                xl: 3,
            };
        }
        switch (id) {
            case 'proxy-shortcuts':
            case 'service-shortcuts':
            case 'system-info':
            case 'current-node-status':
                return {
                    sm: isDrawer ? 6 : 12,
                    md: 6,
                    lg: 4,
                    xl: 3,
                };
            default:
                return { xs: 12 };
        }
    };
    const renderContent = (id) => {
        // Check Data Items
        const dataItem = dataItems.find(i => i.id === id);
        if (dataItem) {
            if (dataItem.type === 'combined') {
                return <TrafficCard {...dataItem} className="max-h-1/8 min-h-40"/>;
            }
            const { id: _, ...rest } = dataItem;
            return <Dataline {...rest} className="max-h-1/8 min-h-40"/>;
        }
        switch (id) {
            case 'info-combined':
                return <CombinedInfoPanel timingData={health} refreshCount={refreshCount}/>;
            case 'proxy-shortcuts':
                return <ProxyShortcuts />;
            case 'service-shortcuts':
                return <ServiceShortcuts />;
            case 'software-update':
                return <SoftwareUpdatePanel />;
            case 'system-info':
                return <SystemInfoPanel />;
            case 'current-node-status':
                return <CurrentNodeStatusPanel />;
            default:
                return null;
        }
    };
    return (<BasePage title={t('Dashboard')}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid container spacing={2}>
            {items.map((id) => (<DraggableGridItem key={id} id={id} size={getGridSize(id)}>
                {renderContent(id)}
              </DraggableGridItem>))}
          </Grid>
        </SortableContext>

        <DragOverlay>
          {activeId ? (<div style={{ transform: 'scale(1.05)', cursor: 'grabbing' }}>
                {/* Wrap in a dummy Grid to maintain sizing appearance if possible, or just render content */}
                 {renderContent(activeId)}
            </div>) : null}
        </DragOverlay>
      </DndContext>
    </BasePage>);
}
