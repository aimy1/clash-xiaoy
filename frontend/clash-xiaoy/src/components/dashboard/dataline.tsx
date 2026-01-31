import { cloneElement, FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import parseTraffic from '@/utils/parse-traffic'
import { type SvgIconComponent } from '@mui/icons-material'
import { Paper } from '@mui/material'
import { cn, Sparkline } from '@nyanpasu/ui'

export interface DatalineProps {
  className?: string
  data: number[]
  icon: SvgIconComponent
  title: string
  total?: number
  type?: 'speed' | 'raw'
  visible?: boolean
}

export const Dataline: FC<DatalineProps> = memo(({
  data,
  icon,
  title,
  total,
  type,
  className,
  visible = true,
}) => {
  const { t } = useTranslation()

  return (
    <Paper className={cn('relative overflow-hidden !rounded-3xl p-4 cyber-glass', className)}>
      <Sparkline
        data={data}
        className="absolute inset-0 opacity-40"
        {...(visible !== undefined ? { visible } : {})}
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* @ts-expect-error icon should be cloneable */}
          {cloneElement(icon, {
            sx: { color: 'var(--primary)' },
          })}

          <div className="text-sm font-semibold text-[var(--text-title)]">
            {title}
          </div>
        </div>

        <div className="text-2xl font-semibold tabular-nums text-[var(--text-title)]">
          {type === 'raw' ? data.at(-1) : parseTraffic(data.at(-1)).join(' ')}
          {type === 'speed' && '/s'}
        </div>

        <div className="h-5">
          {total !== undefined && (
            <span className="text-xs text-[var(--text-sub)]">
              {t('Total')}: {parseTraffic(total).join(' ')}
            </span>
          )}
        </div>
      </div>
    </Paper>
  )
})

export default Dataline
