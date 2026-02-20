import { RouterOutlined, Speed } from '@mui/icons-material'
import { Box, CircularProgress, Paper, Chip, Typography } from '@mui/material'
import { useClashProxies, useProxyMode } from '@nyanpasu/interface'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useColorSxForDelay } from '@/hooks/theme'
import { useNavigate } from '@tanstack/react-router'

export const CurrentNodeStatusPanel = () => {
  const { t } = useTranslation()
  const { data } = useClashProxies()
  const { value: proxyMode } = useProxyMode()
  const navigate = useNavigate()

  const currentNode = useMemo(() => {
    if (!data) return null

    let group
    if (proxyMode.global) {
      group = data.global
    } else {
      // Default to the first group, usually "Proxy" or "Select"
      group = data.groups[0]
    }

    if (!group) return null

    const nodeName = group.now
    const node = group.all.find((n) => n.name === nodeName)
    return node
  }, [data, proxyMode])

  const delay = useMemo(() => {
    if (!currentNode?.history?.length) return 0
    return currentNode.history[currentNode.history.length - 1].delay
  }, [currentNode])

  const delayColor = useColorSxForDelay(delay)

  return (
    <Paper
      className="flex !h-full flex-col justify-between gap-2 !rounded-3xl p-3 cyber-glass cursor-pointer ios-motion ios-pressable"
      onClick={() => navigate({ to: '/proxies' })}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <RouterOutlined sx={{ fontSize: 20, color: 'var(--primary)' }} />
          <div className="text-sm font-semibold text-[var(--text-title)]">
            {t('Current Node')}
          </div>
        </div>
        {currentNode && (
          <Chip
            label={currentNode.type}
            size="small"
            variant="outlined"
            sx={{
              height: 20,
              fontSize: '0.7rem',
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
              opacity: 0.8,
            }}
          />
        )}
      </div>

      {currentNode ? (
        <div className="flex flex-col gap-1 px-1">
          <div
            className="truncate text-lg font-bold text-[var(--text-primary)]"
            title={currentNode.name}
          >
            {currentNode.name}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-sub)]">
            <Speed sx={{ fontSize: 16, opacity: 0.7 }} />
            {delay > 0 ? (
              <Box component="span" sx={{ ...delayColor, fontWeight: 600 }}>
                {delay} ms
              </Box>
            ) : (
              <Box component="span" sx={{ color: 'error.main', fontWeight: 600 }}>
                Timeout
              </Box>
            )}
          </div>
        </div>
      ) : data ? (
        <div className="flex flex-1 items-center justify-center text-[var(--text-sub)] text-sm">
          {t('No Node Selected')}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <CircularProgress size={24} thickness={4} />
        </div>
      )}
    </Paper>
  )
}

export default CurrentNodeStatusPanel
