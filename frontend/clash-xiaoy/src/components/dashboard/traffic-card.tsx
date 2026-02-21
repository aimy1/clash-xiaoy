import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import parseTraffic from '@/utils/parse-traffic'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Paper } from '@mui/material'
import { cn, Sparkline } from '@nyanpasu/ui'

export interface TrafficCardProps {
  className?: string
  upData: number[]
  downData: number[]
  upTotal?: number
  downTotal?: number
  visible?: boolean
}

export const TrafficCard: FC<TrafficCardProps> = ({
  upData,
  downData,
  upTotal,
  downTotal,
  className,
  visible = true,
}) => {
  const { t } = useTranslation()

  return (
    <Paper
      className={cn(
        'cyber-glass relative overflow-hidden !rounded-3xl p-4',
        className,
      )}
    >
      <div className="absolute inset-0 opacity-40">
        <Sparkline
          data={downData}
          className="absolute inset-0 h-full w-full"
          color="var(--success)"
          visible={visible}
        />
        <Sparkline
          data={upData}
          className="absolute inset-0 h-full w-full"
          color="var(--warning)"
          visible={visible}
        />
      </div>

      <div className="relative z-10 grid h-full grid-cols-2 gap-4">
        <div className="flex flex-col justify-between gap-1">
          <div className="flex items-center gap-2">
            <ArrowDownward sx={{ color: 'var(--success)' }} />
            <div className="text-sm font-semibold text-[var(--text-title)]">
              {t('Download')}
            </div>
          </div>
          <div className="text-2xl font-semibold text-[var(--text-title)] tabular-nums">
            {parseTraffic(downData.at(-1)).join(' ')}/s
          </div>
          <div className="text-xs text-[var(--text-sub)]">
            {t('Total')}: {parseTraffic(downTotal).join(' ')}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-1">
          <div className="flex items-center gap-2">
            <ArrowUpward sx={{ color: 'var(--warning)' }} />
            <div className="text-sm font-semibold text-[var(--text-title)]">
              {t('Upload')}
            </div>
          </div>
          <div className="text-2xl font-semibold text-[var(--text-title)] tabular-nums">
            {parseTraffic(upData.at(-1)).join(' ')}/s
          </div>
          <div className="text-xs text-[var(--text-sub)]">
            {t('Total')}: {parseTraffic(upTotal).join(' ')}
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default TrafficCard
