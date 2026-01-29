import { useCallback, useEffect, useRef } from 'react'
import { isMacOS } from '@/consts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { listen, TauriEvent, UnlistenFn } from '@tauri-apps/api/event'
import { appWindow } from '@/utils/tauri-window'

const IS_MAXIMIZED_QUERY_KEY = 'isMaximized'

export default function useWindowMaximized() {
  const unlistenRef = useRef<UnlistenFn | null>(null)

  const query = useSuspenseQuery({
    queryKey: [IS_MAXIMIZED_QUERY_KEY],
    queryFn: async () => {
      // why maximized on macOS is fullscreen?
      if (isMacOS) {
        return await appWindow.isFullscreen()
      }

      return await appWindow.isMaximized()
    },
  })

  const handleToggleMaximize = useCallback(async () => {
    await appWindow.toggleMaximize()
    await query.refetch()
  }, [query])

  useEffect(() => {
    try {
      listen(TauriEvent.WINDOW_RESIZED, async () => {
        await query.refetch()
      })
        .then((unlisten) => {
          unlistenRef.current = unlisten
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (e) {
      console.warn('Tauri listen failed in browser', e)
    }
  }, [query])

  return {
    isMaximized: query.data,
    toggleMaximize: handleToggleMaximize,
    ...query,
  }
}
