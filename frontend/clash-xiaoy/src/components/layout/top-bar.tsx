import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import parseTraffic from '@/utils/parse-traffic'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useClashTraffic } from '@nyanpasu/interface'

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
      className="group flex h-full w-full items-center gap-4 select-none"
      data-tauri-drag-region
    >
      <div
        className="ml-3 hidden gap-2 group-has-[#top-bar-center_>_*]:hidden md:flex"
        data-tauri-drag-region
      >
        <div
          className="cyber-glass pointer-events-none flex items-center gap-4 rounded-full px-3 py-1.5 font-mono text-xs text-[var(--text-main)] tabular-nums"
          data-tauri-drag-region
        >
          <div className="flex items-center gap-2">
            <ArrowDownward
              sx={{ fontSize: 16, color: 'var(--primary)' }}
              className={down > 0 ? 'opacity-85' : 'opacity-45'}
            />
            <span className="min-w-[4rem] text-right">
              {parseTraffic(down).join(' ')}/s
            </span>
          </div>
          <div className="h-4 w-px bg-[var(--border-light)] opacity-80" />
          <div className="flex items-center gap-2">
            <ArrowUpward
              sx={{ fontSize: 16, color: 'var(--primary)' }}
              className={up > 0 ? 'opacity-85' : 'opacity-45'}
            />
            <span className="min-w-[4rem] text-right">
              {parseTraffic(up).join(' ')}/s
            </span>
          </div>
        </div>

        <div
          className="cyber-glass pointer-events-none flex items-center rounded-full px-3 py-1.5 font-mono text-xs text-[var(--text-sub)] tabular-nums"
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
