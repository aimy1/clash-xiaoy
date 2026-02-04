import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useClashTraffic } from '@nyanpasu/interface'
import parseTraffic from '@/utils/parse-traffic'

export const TopBar = () => {
  const { t } = useTranslation()
  const { data: traffic } = useClashTraffic()
  
  const down = traffic?.at(-1)?.down || 0
  const up = traffic?.at(-1)?.up || 0

  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const timeText = useMemo(() => {
    const pad2 = (n: number) => String(n).padStart(2, '0')
    const yyyy = now.getFullYear()
    const mm = pad2(now.getMonth() + 1)
    const dd = pad2(now.getDate())
    const hh = pad2(now.getHours())
    const mi = pad2(now.getMinutes())
    const ss = pad2(now.getSeconds())
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
  }, [now])

  return (
    <div 
      className="group flex items-center gap-4 h-full w-full select-none"
      data-tauri-drag-region
    >
      {/* Traffic Speed HUD */}
      <div className="hidden md:flex gap-2 group-has-[#top-bar-center_>_*]:hidden" data-tauri-drag-region>
        <div 
          className="flex gap-4 text-xs font-mono cyber-text-glow items-center bg-[rgba(0,0,0,0.3)] px-3 py-1.5 rounded-lg border border-[var(--cyber-glass-border)] pointer-events-none" 
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

        <div
          className="flex items-center text-xs font-mono text-[var(--cyber-text-muted)] bg-[rgba(0,0,0,0.3)] px-2.5 py-1 rounded-lg border border-[var(--cyber-glass-border)] pointer-events-none"
          data-tauri-drag-region
          aria-label={t('Time')}
        >
          <span className="w-[19ch] text-right tabular-nums">{timeText}</span>
        </div>
      </div>

      <div id="top-bar-center" className="flex-1" data-tauri-drag-region />
      
      {/* Spacer for Window Controls */}
      <div className="w-24" data-tauri-drag-region />
    </div>
  )
}

export default TopBar
