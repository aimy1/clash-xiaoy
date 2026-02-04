import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
<<<<<<< HEAD
import Grid, { GridProps } from '@mui/material/Grid'
import { ReactNode } from 'react'
=======
import { Close } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import Grid, { GridProps } from '@mui/material/Grid'
import { ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1

interface DraggableGridItemProps extends GridProps {
  id: string
  children: ReactNode
  disabled?: boolean
<<<<<<< HEAD
}

export function DraggableGridItem({
=======
  onRemove?: (id: string) => void
}

export const DraggableGridItem = memo(({
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
  id,
  children,
  disabled,
  style,
<<<<<<< HEAD
  ...props
}: DraggableGridItemProps) {
=======
  onRemove,
  ...props
}: DraggableGridItemProps) => {
  const { t } = useTranslation()
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled })

  const dndStyle = {
<<<<<<< HEAD
    transform: CSS.Translate.toString(transform), // Use Translate instead of Transform to avoid scaling issues
=======
    transform: CSS.Translate.toString(transform),
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.3 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
<<<<<<< HEAD
    touchAction: 'none', // Prevent scrolling while dragging on touch devices
=======
    touchAction: 'none',
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
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
<<<<<<< HEAD
      <div style={{ height: '100%' }}>{children}</div>
    </Grid>
  )
}
=======
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
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
