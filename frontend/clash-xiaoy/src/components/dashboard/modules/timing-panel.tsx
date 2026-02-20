import { useTranslation } from 'react-i18next'
import { useColorSxForDelay } from '@/hooks/theme'
import { Box, Paper } from '@mui/material'

function LatencyTag({ name, value }: { name: string; value: number }) {
  const { t } = useTranslation()

  const sx = useColorSxForDelay(value)

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm font-semibold text-[var(--text-title)]">
        {name}:
      </div>

      <Box className="min-w-0 flex-1 truncate text-right text-sm tabular-nums" sx={sx}>
        {value ? `${value.toFixed(0)} ms` : t('Timeout')}
      </Box>
    </div>
  )
}

export const TimingPanel = ({ data }: { data: { [key: string]: number } }) => {
  return (
    <Paper className="!h-full !rounded-3xl p-4 cyber-glass">
      <div className="flex h-full flex-col gap-2">
        {Object.entries(data).map(([name, value]) => (
          <LatencyTag key={name} name={name} value={value} />
        ))}
      </div>
    </Paper>
  )
}

export default TimingPanel
