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
import { useAtomValue } from 'jotai'
import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDataPanelItems } from '@/components/dashboard/data-panel'
import Dataline from '@/components/dashboard/dataline'
import { DraggableGridItem } from '@/components/dashboard/draggable-grid-item'
import IPASNPanel from '@/components/dashboard/modules/ipasn-panel'
import SystemInfoPanel from '@/components/dashboard/modules/system-info-panel'
import TimingPanel from '@/components/dashboard/modules/timing-panel'
import ProxyShortcuts from '@/components/dashboard/proxy-shortcuts'
import ServiceShortcuts from '@/components/dashboard/service-shortcuts'
import { useHealthPanelData } from '@/components/dashboard/health-panel'
import { useVisibility } from '@/hooks/use-visibility'
import { atomIsDrawer } from '@/store'
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
  const [items, setItems] = useState<string[]>([])
  
  // Initialize items when supportMemory changes or on mount
  useEffect(() => {
    setItems((prev) => {
      const defaultOrder = [
        'traffic-down',
        'traffic-up',
        'connections',
        ...(supportMemory ? ['memory'] : []),
        'timing',
        'ipasn',
        'proxy-shortcuts',
        'service-shortcuts',
        'system-info',
      ]
      
      // If we already have items, we try to preserve the order
      if (prev.length > 0) {
        // Filter out items that are no longer supported (e.g. memory disabled)
        const currentItems = prev.filter(id => {
           if (id === 'memory' && !supportMemory) return false;
           return true;
        });

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
          const { id: _, ...rest } = dataItem;
          return <Dataline {...rest} className="max-h-1/8 min-h-40" />
      }

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
