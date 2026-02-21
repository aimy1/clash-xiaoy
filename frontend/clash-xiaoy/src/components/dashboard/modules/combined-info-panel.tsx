import { flag as countryCodeEmoji } from 'country-emoji'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useColorSxForDelay } from '@/hooks/theme'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Tooltip,
} from '@mui/material'
import { useIPSB } from '@nyanpasu/interface'
import { cn } from '@nyanpasu/ui'

const IP_REFRESH_SECONDS = 180

const EmojiCounty = ({ countryCode }: { countryCode: string }) => {
  let emoji = countryCodeEmoji(countryCode)

  if (!emoji) {
    emoji = '🇺🇳'
  }

  return (
    <div className="relative text-5xl select-none">
      <span className="opacity-50 blur">{emoji}</span>
      <span className="absolute left-0">{emoji}</span>
    </div>
  )
}

function LatencyTag({ name, value }: { name: string; value: number }) {
  const { t } = useTranslation()
  const sx = useColorSxForDelay(value)

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="text-xs font-medium text-[var(--text-title)]">{name}</div>
      <Box
        className="min-w-0 flex-1 truncate text-right text-xs tabular-nums"
        sx={sx}
      >
        {value ? `${value.toFixed(0)} ms` : t('Timeout')}
      </Box>
    </div>
  )
}

const MAX_WIDTH = 'calc(100% - 48px - 16px)'

export interface CombinedInfoPanelProps {
  timingData: { [key: string]: number }
  refreshCount: number
}

export const CombinedInfoPanel = ({
  timingData,
  refreshCount,
}: CombinedInfoPanelProps) => {
  const { t } = useTranslation()
  const { data, mutate, isValidating } = useIPSB()
  const [showIPAddress, setShowIPAddress] = useState(false)

  const handleRefreshIP = () => {
    mutate()
  }

  return (
    <Paper className="cyber-glass relative flex !h-full gap-4 overflow-hidden !rounded-3xl p-4 select-text">
      <div className="flex flex-1 flex-col gap-3">
        {data ? (
          <div className="flex gap-4">
            {data.country_code && (
              <EmojiCounty countryCode={data.country_code} />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-end justify-between text-lg font-semibold text-[var(--text-title)]">
                <div className="truncate">{data.country}</div>
                <Tooltip title={t('Click to Refresh Now')}>
                  <Button
                    className="!size-8 !min-w-0"
                    onClick={handleRefreshIP}
                    loading={isValidating}
                  >
                    {!isValidating && (
                      <CircularProgress
                        size={16}
                        variant="determinate"
                        value={
                          100 -
                          ((refreshCount % IP_REFRESH_SECONDS) /
                            IP_REFRESH_SECONDS) *
                            100
                        }
                      />
                    )}
                  </Button>
                </Tooltip>
              </div>

              <div className="truncate text-sm text-[var(--text-sub)]">
                {data.organization}
              </div>
              <div className="text-xs text-[var(--text-sub)]">AS{data.asn}</div>

              <div className="mt-1 flex items-center justify-between gap-2">
                <div className="relative min-w-0 flex-1 font-mono">
                  <span
                    className={cn(
                      'block truncate text-sm tabular-nums transition-opacity',
                      showIPAddress ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    {data.ip}
                  </span>
                  <span
                    className={cn(
                      'bg-surface-variant absolute top-0 left-0 block h-full w-full rounded-lg transition-opacity',
                      showIPAddress ? 'opacity-0' : 'animate-pulse opacity-100',
                    )}
                  />
                </div>
                <IconButton
                  className="!size-8"
                  color="primary"
                  onClick={() => setShowIPAddress(!showIPAddress)}
                >
                  {showIPAddress ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="bg-surface-variant h-9 w-12 animate-pulse rounded-lg" />
            <div className="flex flex-1 animate-pulse flex-col gap-1">
              <div className="bg-surface-variant h-6 w-20 rounded-full" />
              <div className="bg-surface-variant h-5 w-44 rounded-full" />
              <div className="bg-surface-variant h-5 w-16 rounded-full" />
              <div className="bg-surface-variant h-6 w-32 rounded-lg" />
            </div>
          </div>
        )}
      </div>

      <div className="w-px bg-[var(--border)]" />

      <div className="flex w-40 flex-col justify-center gap-1.5">
        {Object.entries(timingData).map(([name, value]) => (
          <LatencyTag key={name} name={name} value={value} />
        ))}
      </div>
    </Paper>
  )
}

export default CombinedInfoPanel
