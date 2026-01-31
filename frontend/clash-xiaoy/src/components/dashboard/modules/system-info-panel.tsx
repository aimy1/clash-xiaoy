import { useAtomValue } from 'jotai'
import { useEffect, useState, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { atomIsDrawer } from '@/store'
import { ComputerOutlined } from '@mui/icons-material'
import { Box, CircularProgress, Paper } from '@mui/material'
import Grid from '@mui/material/Grid'
import { collectEnvs, EnvInfos } from '@nyanpasu/interface'

const InfoItem = memo(({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <div className="text-[var(--text-sub)]">{label}:</div>
      <div className="min-w-0 truncate font-medium" title={value}>
        {value}
      </div>
    </div>
  )
})

function formatUptime(seconds: number) {
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const parts = []
  if (d > 0) parts.push(`${d}d`)
  if (h > 0) parts.push(`${h}h`)
  if (m > 0) parts.push(`${m}m`)
  if (parts.length === 0) return `${seconds}s`
  return parts.join(' ')
}

export const SystemInfoPanel = memo(() => {
  const { t } = useTranslation()
  const isDrawer = useAtomValue(atomIsDrawer)
  const [envs, setEnvs] = useState<EnvInfos | null>(null)

  useEffect(() => {
    collectEnvs().then(setEnvs)
  }, [])

  return (
    <Paper className="flex !h-full flex-col justify-between gap-2 !rounded-3xl p-3 cyber-glass">
      <div className="flex items-center gap-2 px-1">
        <ComputerOutlined sx={{ fontSize: 20, color: 'var(--primary)' }} />
        <div className="text-sm font-semibold text-[var(--text-title)]">
          {t('System Info')}
        </div>
      </div>

      {envs ? (
        <div className="flex flex-col gap-2">
          <InfoItem label="OS" value={envs.os} />
          {envs.device.kernel && <InfoItem label="Kernel" value={envs.device.kernel} />}
          <InfoItem label="Arch" value={envs.arch} />
          <InfoItem
            label="CPU"
            value={envs.device.cpu[0] || 'Unknown'}
          />
          {envs.device.gpu && envs.device.gpu.length > 0 && (
            <InfoItem label="GPU" value={envs.device.gpu[0]} />
          )}
          <InfoItem label="Memory" value={envs.device.memory} />
          {typeof envs.device.uptime === 'number' && (
            <InfoItem label="Uptime" value={formatUptime(envs.device.uptime)} />
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <CircularProgress size={24} />
        </div>
      )}
    </Paper>
  )
})

export default SystemInfoPanel
