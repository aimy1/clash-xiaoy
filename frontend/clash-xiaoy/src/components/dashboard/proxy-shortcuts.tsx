import { useLockFn } from 'ahooks'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Notice } from '@/components/base'
import { formatError } from '@/utils'
import { message } from '@/utils/notification'
import { NetworkPing, SettingsEthernet } from '@mui/icons-material'
import { Chip, Paper, type ChipProps } from '@mui/material'
import { useClashConfig, useSetting, useSystemProxy } from '@nyanpasu/interface'
import { PaperSwitchButton } from '../setting/modules/system-proxy'

const TitleComp = () => {
  const { t } = useTranslation()

  const { data } = useSystemProxy()

  const {
    query: { data: clashConfigs },
  } = useClashConfig()

  const status = useMemo<{
    label: string
    color: ChipProps['color']
  }>(() => {
    if (data?.enable) {
      const port = Number(data.server.split(':')[1])

      if (port === clashConfigs?.['mixed-port']) {
        return {
          label: t('Successful'),
          color: 'success',
        }
      } else {
        return {
          label: t('Occupied'),
          color: 'warning',
        }
      }
    } else {
      return {
        label: t('Disabled'),
        color: 'error',
      }
    }
  }, [clashConfigs, data?.enable, data?.server, t])

  return (
    <div className="flex items-center justify-between gap-2 px-1">
      <div className="text-sm font-semibold text-[var(--text-title)]">
        {t('Proxy Takeover Status')}
      </div>

      <Chip
        color={status.color}
        size="small"
        className="!h-5"
        sx={{
          span: {
            padding: '0 8px',
          },
        }}
        label={status.label}
      />
    </div>
  )
}

export const ProxyShortcuts = () => {
  const { t } = useTranslation()

  const systemProxy = useSetting('enable_system_proxy')

  const handleSystemProxy = useLockFn(async () => {
    try {
      const next = !Boolean(systemProxy.value)
      await systemProxy.upsert(next)
      // Notice.success(`${t('System Proxy')} ${next ? '已开启' : '已关闭'}`)
    } catch (error) {
      message(`Activation System Proxy failed!`, {
        title: t('Error'),
        kind: 'error',
      })
    }
  })

  const tunMode = useSetting('enable_tun_mode')

  const handleTunMode = useLockFn(async () => {
    try {
      const next = !Boolean(tunMode.value)
      await tunMode.upsert(next)
      // Notice.success(`${t('TUN Mode')} ${next ? '已开启' : '已关闭'}`)
    } catch (error) {
      message(`Activation TUN Mode failed! \n Error: ${formatError(error)}`, {
        title: t('Error'),
        kind: 'error',
      })
    }
  })

  return (
    <Paper className="flex !h-full flex-col justify-between gap-2 !rounded-[var(--radius-card)] p-3 cyber-glass">
      <TitleComp />

      <div className="grid grid-cols-2 gap-3">
        <PaperSwitchButton
          checked={systemProxy.value || false}
          onClick={handleSystemProxy}
          sxPaper={{
            borderRadius: 'var(--radius-control)',
            border: '1px solid var(--border)',
            backgroundColor: systemProxy.value
              ? 'var(--primary-soft)'
              : 'transparent',
          }}
        >
          <div className="relative flex w-full flex-col gap-1.5">
            <NetworkPing sx={{ fontSize: 22, color: 'var(--primary)' }} />
            <div className="text-sm font-semibold text-[var(--text-title)]">
              {t('System Proxy')}
            </div>
            <span
              className={`absolute right-0 top-0 inline-flex h-5 min-w-10 items-center justify-center gap-1 rounded-md border px-2 text-[10px] font-mono tracking-wider select-none transition-colors ${
                systemProxy.value
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--bg-card)] text-[var(--text-sub)] border-[var(--border)]'
              }`}
            >
              <span
                className={`inline-block size-1.5 rounded-full ${
                  systemProxy.value
                    ? 'bg-white'
                    : 'bg-[var(--text-sub)] opacity-60'
                }`}
              />
              {systemProxy.value ? 'ON' : 'OFF'}
            </span>
          </div>
        </PaperSwitchButton>

        <PaperSwitchButton
          checked={tunMode.value || false}
          onClick={handleTunMode}
          sxPaper={{
            borderRadius: 'var(--radius-control)',
            border: '1px solid var(--border)',
            backgroundColor: tunMode.value ? 'var(--primary-soft)' : 'transparent',
          }}
        >
          <div className="relative flex w-full flex-col gap-1.5">
            <SettingsEthernet sx={{ fontSize: 22, color: 'var(--primary)' }} />
            <div className="text-sm font-semibold text-[var(--text-title)]">
              {t('TUN Mode')}
            </div>
            <span
              className={`absolute right-0 top-0 inline-flex h-5 min-w-10 items-center justify-center gap-1 rounded-md border px-2 text-[10px] font-mono tracking-wider select-none transition-colors ${
                tunMode.value
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--bg-card)] text-[var(--text-sub)] border-[var(--border)]'
              }`}
            >
              <span
                className={`inline-block size-1.5 rounded-full ${
                  tunMode.value
                    ? 'bg-white'
                    : 'bg-[var(--text-sub)] opacity-60'
                }`}
              />
              {tunMode.value ? 'ON' : 'OFF'}
            </span>
          </div>
        </PaperSwitchButton>
      </div>
    </Paper>
  )
}

export default ProxyShortcuts
