import { useLockFn } from 'ahooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Notice } from '@/components/base'
import { formatError } from '@/utils'
import { message } from '@/utils/notification'
import { InputAdornment, List, ListItem } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useSetting, useSystemProxy } from '@nyanpasu/interface'
import {
  BaseCard,
  Expand,
  ExpandMore,
  NumberItem,
  SwitchItem,
  TextItem,
} from '@nyanpasu/ui'
import { PaperSwitchButton } from './modules/system-proxy'

const TunModeButton = () => {
  const { t } = useTranslation()

  const tunMode = useSetting('enable_tun_mode')

  const handleTunMode = useLockFn(async () => {
    try {
      const next = !Boolean(tunMode.value)
      await tunMode.upsert(next)
      Notice.success(`${t('TUN Mode')} ${next ? '已开启' : '已关闭'}`)
    } catch (error) {
      message(`Activation TUN Mode failed! \n Error: ${formatError(error)}`, {
        title: t('Error'),
        kind: 'error',
      })
    }
  })

  return (
    <PaperSwitchButton
      label={t('TUN Mode')}
      checked={Boolean(tunMode.value)}
      onClick={handleTunMode}
    >
      <span
        className={`ml-auto mr-8 inline-flex h-5 min-w-10 items-center justify-center gap-1 rounded-full border px-2 text-[10px] font-mono tracking-wider select-none shadow-sm transition-colors ${
          tunMode.value
            ? 'bg-transparent text-[var(--cyber-primary)] border-[rgba(0,255,255,0.40)] shadow-[0_0_14px_rgba(0,255,255,0.10)]'
            : 'bg-transparent text-[var(--cyber-text-muted)] border-[rgba(255,255,255,0.14)]'
        }`}
      >
        <span
          className={`inline-block size-1.5 rounded-full ${
            tunMode.value
              ? 'bg-[var(--cyber-primary)] shadow-[0_0_10px_rgba(0,255,255,0.35)]'
              : 'bg-[var(--cyber-secondary)] opacity-60'
          }`}
        />
        {tunMode.value ? 'ON' : 'OFF'}
      </span>
    </PaperSwitchButton>
  )
}

const SystemProxyButton = () => {
  const { t } = useTranslation()

  const systemProxy = useSetting('enable_system_proxy')

  const handleSystemProxy = useLockFn(async () => {
    try {
      const next = !Boolean(systemProxy.value)
      await systemProxy.upsert(next)
      Notice.success(`${t('System Proxy')} ${next ? '已开启' : '已关闭'}`)
    } catch (error) {
      message(`Activation System Proxy failed!`, {
        title: t('Error'),
        kind: 'error',
      })
    }
  })

  return (
    <PaperSwitchButton
      label={t('System Proxy')}
      checked={Boolean(systemProxy.value)}
      onClick={handleSystemProxy}
    >
      <span
        className={`ml-auto mr-8 inline-flex h-5 min-w-10 items-center justify-center gap-1 rounded-full border px-2 text-[10px] font-mono tracking-wider select-none shadow-sm transition-colors ${
          systemProxy.value
            ? 'bg-transparent text-[var(--cyber-primary)] border-[rgba(0,255,255,0.40)] shadow-[0_0_14px_rgba(0,255,255,0.10)]'
            : 'bg-transparent text-[var(--cyber-text-muted)] border-[rgba(255,255,255,0.14)]'
        }`}
      >
        <span
          className={`inline-block size-1.5 rounded-full ${
            systemProxy.value
              ? 'bg-[var(--cyber-primary)] shadow-[0_0_10px_rgba(0,255,255,0.35)]'
              : 'bg-[var(--cyber-secondary)] opacity-60'
          }`}
        />
        {systemProxy.value ? 'ON' : 'OFF'}
      </span>
    </PaperSwitchButton>
  )
}

const ProxyGuardSwitch = () => {
  const { t } = useTranslation()

  const proxyGuard = useSetting('enable_proxy_guard')

  const handleProxyGuard = useLockFn(async () => {
    try {
      await proxyGuard.upsert(!proxyGuard.value)
    } catch (error) {
      message(`Activation Proxy Guard failed!`, {
        title: t('Error'),
        kind: 'error',
      })
    }
  })

  return (
    <SwitchItem
      label={t('Proxy Guard')}
      checked={Boolean(proxyGuard.value)}
      onClick={handleProxyGuard}
    />
  )
}

const ProxyGuardInterval = () => {
  const { t } = useTranslation()

  const proxyGuardInterval = useSetting('proxy_guard_interval')

  return (
    <NumberItem
      label={t('Guard Interval')}
      value={proxyGuardInterval.value || 0}
      checkEvent={(input) => input <= 0}
      checkLabel={t('The interval must be greater than 0 second')}
      onApply={(value) => {
        proxyGuardInterval.upsert(value)
      }}
      textFieldProps={{
        inputProps: {
          'aria-autocomplete': 'none',
        },
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">{t('seconds')}</InputAdornment>
          ),
        },
      }}
    />
  )
}

const DEFAULT_BYPASS =
  'localhost;127.;192.168.;10.;172.16.;172.17.;172.18.;172.19.;172.20.;172.21.;172.22.;172.23.;172.24.;172.25.;172.26.;172.27.;172.28.;172.29.;172.30.;172.31.*'

const SystemProxyBypass = () => {
  const { t } = useTranslation()

  const systemProxyBypass = useSetting('system_proxy_bypass')

  return (
    <TextItem
      label={t('Proxy Bypass')}
      value={systemProxyBypass.data || ''}
      onApply={(value) => {
        if (!value || value.trim() === '') {
          // 输入为空 → 重置为默认规则
          systemProxyBypass.upsert(DEFAULT_BYPASS)
        } else {
          // 正常写入用户配置
          systemProxyBypass.upsert(value)
        }
      }}
    />
  )
}

const CurrentSystemProxy = () => {
  const { t } = useTranslation()

  const { data } = useSystemProxy()

  return (
    <ListItem
      className="!w-full !flex-col !items-start select-text"
      sx={{ pl: 0, pr: 0 }}
    >
      <div className="text-base leading-10">{t('Current System Proxy')}</div>

      {Object.entries(data ?? []).map(([key, value], index) => {
        return (
          <div key={index} className="flex w-full leading-8">
            <div className="w-28 capitalize">{key}:</div>

            <div className="text-warp flex-1 break-all">{String(value)}</div>
          </div>
        )
      })}
    </ListItem>
  )
}

export const SettingSystemProxy = () => {
  const { t } = useTranslation()

  const [expand, setExpand] = useState(false)

  return (
    <BaseCard
      label={t('System Setting')}
      labelChildren={
        <ExpandMore expand={expand} onClick={() => setExpand(!expand)} />
      }
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <TunModeButton />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <SystemProxyButton />
        </Grid>
      </Grid>

      <Expand open={expand}>
        <List disablePadding sx={{ pt: 1 }}>
          <ProxyGuardSwitch />

          <ProxyGuardInterval />

          <SystemProxyBypass />

          <CurrentSystemProxy />
        </List>
      </Expand>
    </BaseCard>
  )
}

export default SettingSystemProxy
