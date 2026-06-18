import getSystem from '@/utils/get-system'
import { getRoutesWithIcon } from '@/utils/routes-utils'
import { Box } from '@mui/material'
import { cn } from '@nyanpasu/ui'
import AnimatedLogo from '../layout/animated-logo'
import RouteListItem from './modules/route-list-item'
 

export const DrawerContent = ({
  className,
  onlyIcon,
}: {
  className?: string
  onlyIcon?: boolean
}) => {
  const routes = getRoutesWithIcon()

  return (
    <Box
      className={cn(
        'p-2',
        'w-full',
        'h-full',
        'flex',
        'flex-col',
        'gap-2',
        className,
      )}
      data-tauri-drag-region
    >
      <div className="mx-1 flex flex-col items-center justify-center gap-2 mb-1">
        <div className="h-24 w-24" data-tauri-drag-region>
          <AnimatedLogo className="h-full w-full" data-tauri-drag-region />
        </div>

        {!onlyIcon && (
          <div
            className="text-lg font-bold text-center tracking-widest uppercase font-mono"
            data-tauri-drag-region
          >
            {'clash-xiaoy'}
          </div>
        )}
      </div>

      <div className="scrollbar-hidden flex flex-col gap-2 !overflow-x-hidden overflow-y-auto px-1 pb-3">
        {Object.entries(routes).map(([name, { path, icon }]) => {
          return (
            <RouteListItem
              key={name}
              name={name}
              path={path}
              icon={icon}
              onlyIcon={onlyIcon}
            />
          )
        })}
      </div>

    </Box>
  )
}

export default DrawerContent
