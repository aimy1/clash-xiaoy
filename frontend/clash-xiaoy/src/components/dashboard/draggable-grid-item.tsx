import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Grid, { GridProps } from '@mui/material/Grid'
import { ReactNode } from 'react'

interface DraggableGridItemProps extends GridProps {
  id: string
  children: ReactNode
  disabled?: boolean
}

export function DraggableGridItem({
  id,
  children,
  disabled,
  style,
  ...props
}: DraggableGridItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled })

  const dndStyle = {
    transform: CSS.Translate.toString(transform), // Use Translate instead of Transform to avoid scaling issues
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.3 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none', // Prevent scrolling while dragging on touch devices
    ...style,
  }

  return (
    <Grid
      ref={setNodeRef}
      style={dndStyle}
      {...attributes}
      {...listeners}
      {...props}
    >
      <div style={{ height: '100%' }}>{children}</div>
    </Grid>
  )
}
