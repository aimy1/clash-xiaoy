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
        'p-4 cyber-glass animate-float',
        getSystem() === 'macos' ? 'pt-14' : 'pt-8',
        'w-full',
        'h-full',
        'flex',
        'flex-col',
        'gap-4',
        className,
      )}
      data-tauri-drag-region
    >
      <div className="mx-2 flex flex-col items-center justify-center gap-2 mb-2">
        <div className="h-20 w-20" data-tauri-drag-region>
          <AnimatedLogo className="h-full w-full" data-tauri-drag-region />
        </div>

        {!onlyIcon && (
          <div
            className="text-lg font-bold cyber-text-glow text-center tracking-widest uppercase font-mono"
            data-tauri-drag-region
          >
            {'clash-xiaoy'}
          </div>
        )}
      </div>

      <div className="scrollbar-hidden flex flex-col gap-3 !overflow-x-hidden overflow-y-auto px-2 pb-4">
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
