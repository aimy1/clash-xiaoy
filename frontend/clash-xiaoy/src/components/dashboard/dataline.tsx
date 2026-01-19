import { cloneElement, FC } from 'react'
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

export const Dataline: FC<DatalineProps> = ({
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
    <Paper className={cn('relative !rounded-3xl cyber-glass', className)}>
      <Sparkline
        data={data}
        className="absolute rounded-3xl opacity-50"
        {...(visible !== undefined ? { visible } : {})}
      />

      <div className="absolute top-0 flex h-full flex-col justify-between gap-4 p-4">
        <div className="flex items-center gap-2">
          {/* @ts-expect-error icon should be cloneable */}
          {cloneElement(icon, {
             sx: { filter: 'drop-shadow(0 0 5px var(--cyber-primary))' }
          })}

          <div className="font-bold cyber-text-glow">{title}</div>
        </div>

        <div className="text-2xl font-bold cyber-text-glow">
          {type === 'raw' ? data.at(-1) : parseTraffic(data.at(-1)).join(' ')}
          {type === 'speed' && '/s'}
        </div>

        <div className="h-5">
          {total !== undefined && (
            <span className="text-shadow-sm opacity-80">
              {t('Total')}: {parseTraffic(total).join(' ')}
            </span>
          )}
        </div>
      </div>
    </Paper>
  )
}

export default Dataline
