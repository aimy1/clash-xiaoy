import { createFileRoute } from '@tanstack/react-router'
import { List } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSetting } from '@nyanpasu/interface'
import { BaseCard, MenuItem, NumberItem } from '@nyanpasu/ui'
import SettingNyanpasuPath from '@/components/setting/setting-nyanpasu-path'
import {
  SettingsTitle,
  SettingsTitlePlaceholder,
} from '../_modules/settings-title'

export const Route = createFileRoute(
  '/(experimental)/experimental/settings/nyanpasu-config',
)({
  component: RouteComponent,
})

const AppLogLevel = () => {
  const { t } = useTranslation()
  const { value, upsert } = useSetting('app_log_level')

  const options = {
    trace: 'Trace',
    debug: 'Debug',
    info: 'Info',
    warn: 'Warn',
    error: 'Error',
    silent: 'Silent',
  }

  return (
    <MenuItem
      label={t('App Log Level')}
      options={options}
      selected={value || 'info'}
      onSelected={(val) => upsert(val as any)}
    />
  )
}

const TrayProxiesSelector = () => {
  const { t } = useTranslation()
  const { value, upsert } = useSetting('clash_tray_selector')

  const options = {
    normal: t('Normal'),
    hidden: t('Hidden'),
    submenu: t('Submenu'),
  }

  return (
    <MenuItem
      label={t('Tray Proxies Selector')}
      options={options}
      selected={value || 'normal'}
      onSelected={(val) => upsert(val as any)}
    />
  )
}

const NetworkWidgetVariant = () => {
  const { t } = useTranslation()
  const { value, upsert } = useSetting('network_statistic_widget')

  const options = {
    disabled: t('Disabled'),
    small: 'Small',
    large: 'Large',
  } as const

  const selected =
    value?.kind === 'enabled' ? (value.value as any) : ('disabled' as const)

  return (
    <MenuItem
      label={t('Network Statistic Widget')}
      options={options}
      selected={selected}
      onSelected={(val) =>
        upsert(
          val === 'disabled'
            ? { kind: 'disabled' }
            : { kind: 'enabled', value: val as any },
        )
      }
    />
  )
}

const MaxLogFiles = () => {
  const { t } = useTranslation()
  const { value, upsert } = useSetting('max_log_files')

  return (
    <NumberItem
      value={value || 0}
      label={t('Max Log Files')}
      checkEvent={(value) => value <= 0}
      checkLabel="Value must larger than 0."
      onApply={(v) => upsert(v)}
    />
  )
}

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <>
      <SettingsTitlePlaceholder />
      <SettingsTitle>{t('clash-xiaoy Setting')}</SettingsTitle>

      <BaseCard label={t('General')}>
        <List disablePadding>
          <AppLogLevel />
          <TrayProxiesSelector />
          <NetworkWidgetVariant />
        </List>
      </BaseCard>

      <BaseCard label={t('Tasks')}>
        <List disablePadding>
          <MaxLogFiles />
        </List>
      </BaseCard>

      <SettingNyanpasuPath />
    </>
  )
}
