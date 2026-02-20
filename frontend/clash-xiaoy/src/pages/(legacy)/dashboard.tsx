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
import { useAtomValue, useAtom } from 'jotai'
import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDataPanelItems } from '@/components/dashboard/data-panel'
import Dataline from '@/components/dashboard/dataline'
import TrafficCard, { TrafficCardProps } from '@/components/dashboard/traffic-card'
import { DraggableGridItem } from '@/components/dashboard/draggable-grid-item'
import CombinedInfoPanel from '@/components/dashboard/modules/combined-info-panel'
import SystemInfoPanel from '@/components/dashboard/modules/system-info-panel'
import CurrentNodeStatusPanel from '@/components/dashboard/modules/current-node-status-panel'
import ProxyShortcuts from '@/components/dashboard/proxy-shortcuts'
import ServiceShortcuts from '@/components/dashboard/service-shortcuts'
import { useHealthPanelData } from '@/components/dashboard/health-panel'
import { useVisibility } from '@/hooks/use-visibility'
import { atomIsDrawer, atomDashboardLayout } from '@/store'
import Grid from '@mui/material/Grid'
import { useClashWSContext } from '@nyanpasu/interface'
import { BasePage } from '@nyanpasu/ui'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(legacy)/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { t } = useTranslation()
  const visible = useVisibility()
  const { setRecordTraffic } = useClashWSContext()

  // When the page is not visible, reduce the traffic data update frequency
  setRecordTraffic(visible)

  // Data Hooks
  const { items: dataItems, gridLayout: dataPanelGridLayout, supportMemory } = useDataPanelItems({ visible })
  const { health, refreshCount } = useHealthPanelData()
  const isDrawer = useAtomValue(atomIsDrawer)

  // Initial Items Order
  const [items, setItems] = useAtom(atomDashboardLayout)
  
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
        'system-info',
      ]
      
      // If we already have items, we try to preserve the order
      if (prev.length > 0) {
        // Filter out items that are no longer supported (e.g. memory disabled)
        // Also handle migration from old traffic cards to combined card
        // And migrate timing/ipasn to info-combined
        let currentItems = prev.filter(id => {
           if (id === 'memory' && !supportMemory) return false;
           if (id === 'traffic-down' || id === 'traffic-up') return false;
           if (id === 'timing' || id === 'ipasn') return false;
           return true;
        });

        // Add traffic-combined if it's missing (migration or new install)
        if (!currentItems.includes('traffic-combined')) {
             // Try to insert at the beginning or where traffic-down was
             const oldTrafficIndex = prev.indexOf('traffic-down');
             if (oldTrafficIndex !== -1) {
                 currentItems.splice(oldTrafficIndex, 0, 'traffic-combined');
             } else {
                 currentItems.unshift('traffic-combined');
             }
        }

        // Add info-combined if it's missing (migration)
        if (!currentItems.includes('info-combined')) {
            const oldTimingIndex = prev.indexOf('timing');
            if (oldTimingIndex !== -1) {
                currentItems.splice(oldTimingIndex, 0, 'info-combined');
            } else {
                // Try to find a good spot
                const sysInfoIndex = currentItems.indexOf('system-info');
                if (sysInfoIndex !== -1) {
                    currentItems.splice(sysInfoIndex, 0, 'info-combined');
                } else {
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
                    } else {
                        currentItems.push(id);
                    }
                } else if (id === 'current-node-status') {
                    // Insert after system-info if possible
                    const sysInfoIndex = currentItems.indexOf('system-info');
                    if (sysInfoIndex !== -1) {
                        currentItems.splice(sysInfoIndex + 1, 0, id);
                    } else {
                        currentItems.push(id);
                    }
                } else {
                    currentItems.push(id);
                }
            }
        });
        return currentItems;
      }
      
      return defaultOrder
    })
  }, [supportMemory])

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { delay: 1000, tolerance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 1000, tolerance: 5 } })
  )

  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over!.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  // Grid Sizes Logic
  const getGridSize = (id: string) => {
    if (['connections', 'memory'].includes(id)) {
        return dataPanelGridLayout;
    }
    if (id === 'traffic-combined') {
        return {
            sm: 12,
            md: 12,
            lg: (supportMemory ? 3 : 4) * 2,
            xl: (supportMemory ? 3 : 4) * 2,
        }
    }
    if (id === 'info-combined') {
        return {
            sm: 12,
            md: 12,
            lg: 8,
            xl: 6,
        }
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
            }
        default:
            return { xs: 12 }
    }
  }

  const renderContent = (id: string) => {
      // Check Data Items
      const dataItem = dataItems.find(i => i.id === id);
      if (dataItem) {
          if (dataItem.type === 'combined') {
              return <TrafficCard {...(dataItem as TrafficCardProps)} className="max-h-1/8 min-h-40" />
          }
          const { id: _, ...rest } = dataItem;
          return <Dataline {...rest} className="max-h-1/8 min-h-40" />
      }

      switch (id) {
          case 'info-combined':
              return <CombinedInfoPanel timingData={health} refreshCount={refreshCount} />
          case 'proxy-shortcuts':
              return <ProxyShortcuts />
          case 'service-shortcuts':
              return <ServiceShortcuts />
          case 'system-info':
              return <SystemInfoPanel />
          case 'current-node-status':
              return <CurrentNodeStatusPanel />
          default:
              return null;
      }
  }

  return (
    <BasePage title={t('Dashboard')}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid container spacing={2}>
            {items.map((id) => (
              <DraggableGridItem key={id} id={id} size={getGridSize(id)}>
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
