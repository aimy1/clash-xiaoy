import getSystem from '@/utils/get-system'
import { appWindow } from '@/utils/tauri-window'
import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import 'allotment/dist/style.css'
import { useAtomValue } from 'jotai'
import { ReactNode, useEffect, useRef } from 'react'
import { atomIsDrawerOnlyIcon } from '@/store'
import { alpha, cn } from '@nyanpasu/ui'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { TauriEvent, UnlistenFn } from '@tauri-apps/api/event'
import { LayoutControl } from '../layout/layout-control'
import TopBar from '../layout/top-bar'
import styles from './app-container.module.scss'
import AppDrawer from './app-drawer'
import DrawerContent from './drawer-content'

const OS = getSystem()

export const AppContainer = ({
  children,
  isDrawer,
}: {
  children?: ReactNode
  isDrawer?: boolean
}) => {
  const { data: isMaximized } = useSuspenseQuery({
    queryKey: ['isMaximized'],
    queryFn: () => appWindow.isMaximized(),
  })
  const queryClient = useQueryClient()
  const unlistenRef = useRef<UnlistenFn | null>(null)
  const onlyIcon = useAtomValue(atomIsDrawerOnlyIcon)

  useEffect(() => {
    appWindow
      .listen(TauriEvent.WINDOW_RESIZED, () => {
        queryClient.invalidateQueries({ queryKey: ['isMaximized'] })
      })
      .then((unlisten) => {
        unlistenRef.current = unlisten
      })
      .catch((error) => {
        console.error(error)
      })
    return () => {
      unlistenRef.current?.()
    }
  }, [queryClient])

  return (
    <Paper
      square
      elevation={0}
      className={cn(styles.layout, 'gap-4')}
      onPointerDown={(e: any) => {
        if (e.target?.dataset?.windrag) {
          appWindow.startDragging()
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault()
      }}
    >
      {isDrawer && <AppDrawer data-tauri-drag-region />}

      {!isDrawer && (
        <div className={cn(onlyIcon ? 'w-24' : 'w-64')}>
          <DrawerContent
            className="rounded-3xl border border-[var(--cyber-glass-border)]"
            data-tauri-drag-region
            onlyIcon={onlyIcon}
          />
        </div>
      )}

      <div
        className={cn(
          styles.container,
          'cyber-glass bg-scanline animate-pulse-neon flex flex-col overflow-hidden rounded-3xl border border-[var(--cyber-glass-border)]',
        )}
      >
        {OS === 'windows' && (
          <LayoutControl className="!z-top hover-glitch absolute top-2 right-4 z-50" />
        )}
        {/* TODO: add a framer motion animation to toggle the maximized state */}
        {OS === 'macos' && !isMaximized && (
          <Box
            className="z-top fixed top-1.5 left-3 h-7 w-[4.5rem] rounded-full"
            sx={(theme) => ({
              backgroundColor: alpha(theme.vars.palette.primary.main, 0.1),
            })}
          />
        )}

        <div
          className={cn(
            OS === 'macos' ? 'h-[2.75rem]' : 'h-12',
            'shrink-0 border-b border-[var(--cyber-glass-border)] bg-[rgba(0,0,0,0.2)]',
          )}
        >
          <TopBar />
        </div>

        <div className="scrollbar-custom relative z-0 flex-1 overflow-x-hidden overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </Paper>
  )
}

export default AppContainer
