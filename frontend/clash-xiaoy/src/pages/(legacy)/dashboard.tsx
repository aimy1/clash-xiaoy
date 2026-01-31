import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { AddCircleOutline, RestartAlt } from '@mui/icons-material'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useDataPanelItems } from '@/components/dashboard/data-panel'
import Dataline from '@/components/dashboard/dataline'
import { DraggableGridItem } from '@/components/dashboard/draggable-grid-item'
import { useHealthPanelData } from '@/components/dashboard/health-panel'
import HiddenItemsDialog from '@/components/dashboard/hidden-items-dialog'
import { useVisibility } from '@/hooks/use-visibility'
import { atomIsDrawer, dashboardOrderAtom } from '@/store'
import { IconButton, Tooltip, CircularProgress, Box } from '@mui/material'

// Lazy load heavy panels
const TimingPanel = lazy(() => import('@/components/dashboard/modules/timing-panel'))
const CalendarPanel = lazy(() => import('@/components/dashboard/modules/calendar-panel'))
const MemoPanel = lazy(() => import('@/components/dashboard/modules/memo-panel'))
const ProxyShortcuts = lazy(() => import('@/components/dashboard/proxy-shortcuts'))
const ServiceShortcuts = lazy(() => import('@/components/dashboard/service-shortcuts'))
const SystemInfoPanel = lazy(() => import('@/components/dashboard/modules/system-info-panel'))
const IPASNPanel = lazy(() => import('@/components/dashboard/modules/ipasn-panel'))
const UpdaterPanel = lazy(() => import('@/components/dashboard/modules/updater-panel'))

const PanelFallback = () => (
  <Box className="flex h-full w-full items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/50">
    <CircularProgress size={24} thickness={4} sx={{ color: 'var(--primary)' }} />
  </Box>
)
import Grid from '@mui/material/Grid'
import { useClashWSContext } from '@nyanpasu/interface'
import { BasePage } from '@nyanpasu/ui'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(legacy)/dashboard')({
  component: Dashboard,
})

const ALL_DASHBOARD_ITEMS = [
  'traffic-down',
  'traffic-up',
  'connections',
  'memory',
  'timing',
  'ipasn',
  'proxy-shortcuts',
  'service-shortcuts',
  'system-info',
  'calendar',
  'memo',
  'updater',
]

function Dashboard() {
  const { t } = useTranslation()
  const visible = useVisibility()
  const { setRecordTraffic } = useClashWSContext()

  // When the page is not visible, reduce the traffic data update frequency
  useEffect(() => {
    setRecordTraffic(visible)
  }, [visible, setRecordTraffic])

  // Data Hooks
  const { items: dataItems, gridLayout: dataPanelGridLayout, supportMemory } = useDataPanelItems({ visible })
  const { health, refreshCount } = useHealthPanelData()
  const isDrawer = useAtomValue(atomIsDrawer)

  // Initial Items Order
  const [items, setItems] = useAtom(dashboardOrderAtom)

  // Initialize items when supportMemory changes or on mount
  useEffect(() => {
    setItems((prev) => {
      if (!prev || !Array.isArray(prev)) return prev

      let changed = false
      let next = [...prev]

      // 1. Remove unsupported items
      if (!supportMemory && next.includes('memory')) {
        next = next.filter((id) => id !== 'memory')
        changed = true
      }

      // 2. Add missing items from defaultOrder (only if it's the first time or we want to ensure basic items)
      // Note: We don't want to automatically add back items the user deliberately removed.
      // So we only add items if the list is empty or some other condition.
      // But for now, let's keep the original logic but use the constant.

      return changed ? next : prev
    })
  }, [supportMemory, setItems])

  const [dialogOpen, setDialogOpen] = useState(false)

  const hiddenItems = useMemo(() => {
    if (!items) return []
    return ALL_DASHBOARD_ITEMS.filter((id) => {
      if (id === 'memory' && !supportMemory) return false
      return !items.includes(id)
    })
  }, [items, supportMemory])

  const handleAddClick = () => {
    setDialogOpen(true)
  }

  const handleAddClose = () => {
    setDialogOpen(false)
  }

  const handleAddItem = (id: string) => {
    setItems((prev) => {
      if (!prev) return [id]
      return [...prev, id]
    })
  }

  const handleAddAll = () => {
    setItems((prev) => {
      if (!prev) return hiddenItems
      return [...prev, ...hiddenItems]
    })
    handleAddClose()
  }

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        if (!items) return items
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over!.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }, [setItems])

  const handleResetLayout = useCallback(() => {
    setItems([
      'traffic-down',
      'traffic-up',
      'connections',
      ...(supportMemory ? ['memory'] : []),
      'timing',
      'ipasn',
      'proxy-shortcuts',
      'service-shortcuts',
      'system-info',
      'calendar',
      'memo',
      'updater',
    ])
  }, [setItems, supportMemory])

  const handleRemoveItem = useCallback((id: string) => {
    setItems((prev) => {
        if (!prev) return prev;
        return prev.filter(item => item !== id);
    })
  }, [setItems])

  // Grid Sizes Logic
  const getGridSize = useCallback((id: string) => {
    if (['traffic-down', 'traffic-up', 'connections', 'memory'].includes(id)) {
        return dataPanelGridLayout;
    }
    switch (id) {
        case 'timing':
            return {
                sm: isDrawer ? 6 : 12,
                md: supportMemory ? 4 : 6,
                lg: supportMemory ? 3 : 4,
                xl: 3,
            }
        case 'ipasn':
            return {
                sm: isDrawer ? (supportMemory ? 6 : 12) : 12,
                md: supportMemory ? 8 : 12,
                lg: supportMemory ? 5 : 8,
                xl: 3,
            }
        case 'proxy-shortcuts':
        case 'service-shortcuts':
        case 'system-info':
        case 'calendar':
        case 'memo':
        case 'updater':
            return {
                sm: isDrawer ? 6 : 12,
                md: 6,
                lg: 4,
                xl: 3,
            }
        default:
            return { xs: 12 }
    }
  }, [dataPanelGridLayout, isDrawer, supportMemory])

  const renderContent = useCallback((id: string) => {
      // Check Data Items
      const dataItem = dataItems.find(i => i.id === id);
      if (dataItem) {
          const { id: _, ...rest } = dataItem;
          return <Dataline {...rest} className="max-h-1/8 min-h-40" />
      }

      const getLazyPanel = () => {
          switch (id) {
              case 'timing':
                  return <TimingPanel data={health} />
              case 'ipasn':
                  return <IPASNPanel refreshCount={refreshCount} />
              case 'proxy-shortcuts':
                  return <ProxyShortcuts />
              case 'service-shortcuts':
                  return <ServiceShortcuts />
              case 'system-info':
                  return <SystemInfoPanel />
              case 'calendar':
                  return <CalendarPanel />
              case 'memo':
                  return <MemoPanel />
              case 'updater':
                  return <UpdaterPanel />
              default:
                  return null;
          }
      }

      const panel = getLazyPanel();
      if (!panel) return null;

      return (
          <Suspense fallback={<PanelFallback />}>
              {panel}
          </Suspense>
      );
  }, [dataItems, health, refreshCount])

  if (!items || !Array.isArray(items)) {
    return null
  }

  return (
    <BasePage
      title={t('Dashboard')}
      header={
        <div className="flex items-center gap-1">
          <Tooltip title={t('Add Card')}>
            <IconButton 
              onClick={handleAddClick} 
              color="inherit"
            >
              <AddCircleOutline />
            </IconButton>
          </Tooltip>
          <HiddenItemsDialog
            open={dialogOpen}
            onClose={handleAddClose}
            hiddenItems={hiddenItems}
            onAdd={handleAddItem}
            onAddAll={handleAddAll}
          />
          <Tooltip title={t('Reset Layout')}>
            <IconButton 
              onClick={handleResetLayout} 
              color="inherit"
            >
              <RestartAlt />
            </IconButton>
          </Tooltip>
        </div>
      }
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid container spacing={2}>
            {items.map((id) => (
              <DraggableGridItem key={id} id={id} size={getGridSize(id)} onRemove={handleRemoveItem}>
                {renderContent(id)}
              </DraggableGridItem>
            ))}
          </Grid>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <div style={{ transform: 'scale(1.05)', cursor: 'grabbing' }}>
                {/* Wrap in a dummy Grid to maintain sizing appearance if possible, or just render content */}
                 {renderContent(activeId)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </BasePage>
  )
}
