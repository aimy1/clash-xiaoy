import { useLockFn } from 'ahooks'
import { useTranslation } from 'react-i18next'
import { ArrowDownward, ArrowUpward, Public } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useClashTraffic, useSetting } from '@nyanpasu/interface'
import parseTraffic from '@/utils/parse-traffic'
import { cn } from '@nyanpasu/ui'

export const TopBar = () => {
  const { t } = useTranslation()
  const { data: traffic } = useClashTraffic()
  
  const down = traffic?.at(-1)?.down || 0
  const up = traffic?.at(-1)?.up || 0

  const systemProxy = useSetting('enable_system_proxy')
  
  const handleSystemProxy = useLockFn(async () => {
    try {
      await systemProxy.upsert(!systemProxy.value)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div 
      className="flex items-center gap-4 px-4 h-full w-full select-none"
      data-tauri-drag-region
    >
      {/* Traffic Speed HUD */}
      <div 
        className="flex gap-4 text-xs font-mono cyber-text-glow items-center bg-[rgba(0,0,0,0.3)] px-3 py-1.5 rounded-lg border border-[var(--cyber-glass-border)]" 
        data-tauri-drag-region
      >
        <div className="flex items-center gap-2">
          <ArrowDownward sx={{ fontSize: 16, color: 'var(--cyber-primary)' }} className="animate-pulse" />
          <span className="min-w-[4rem] text-right">{parseTraffic(down).join(' ')}/s</span>
        </div>
        <div className="w-[1px] h-4 bg-[var(--cyber-glass-border)] opacity-50"></div>
        <div className="flex items-center gap-2">
          <ArrowUpward sx={{ fontSize: 16, color: 'var(--cyber-secondary)' }} className="animate-pulse" />
          <span className="min-w-[4rem] text-right">{parseTraffic(up).join(' ')}/s</span>
        </div>
      </div>

      <div className="flex-1" data-tauri-drag-region />

      {/* System Proxy Toggle */}
      <Tooltip title={t('System Proxy')}>
        <IconButton 
          onClick={handleSystemProxy}
          size="small"
          className={cn(
            "transition-all duration-300 border border-transparent hover:border-[var(--cyber-accent)]",
            systemProxy.value ? "text-[var(--cyber-accent)] cyber-text-glow bg-[rgba(0,229,255,0.1)]" : "text-gray-500 hover:text-gray-300"
          )}
        >
          <Public fontSize="small" />
        </IconButton>
      </Tooltip>
      
      {/* Spacer for Window Controls */}
      <div className="w-24" data-tauri-drag-region />
    </div>
  )
}

export default TopBar
