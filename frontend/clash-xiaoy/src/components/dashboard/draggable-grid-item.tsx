import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Close } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import Grid, { GridProps } from '@mui/material/Grid'
import { ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'

interface DraggableGridItemProps extends GridProps {
  id: string
  children: ReactNode
  disabled?: boolean
  onRemove?: (id: string) => void
}

export const DraggableGridItem = memo(({
  id,
  children,
  disabled,
  style,
  onRemove,
  ...props
}: DraggableGridItemProps) => {
  const { t } = useTranslation()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled })

  const dndStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.3 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none',
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
      <div className="group relative h-full w-full overflow-hidden !rounded-3xl">
        {children}
        {onRemove && (
          <Tooltip title={t('Close')}>
            <IconButton
              size="small"
              className="absolute opacity-0 transition-opacity group-hover:opacity-100"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                onRemove(id)
              }}
              sx={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '20px',
                height: '20px',
                padding: 0,
                backgroundColor: 'transparent',
                color: 'inherit',
                opacity: 0,
                zIndex: 9999,
                '&:hover': {
                  backgroundColor: 'rgba(128, 128, 128, 0.1)',
                  opacity: 1,
                },
              }}
            >
              <Close sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Grid>
  )
})

export default DraggableGridItem
