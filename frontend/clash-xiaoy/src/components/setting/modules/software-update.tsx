import { useTranslation } from 'react-i18next'
import { useSetAtom } from 'jotai'
import { Button } from '@mui/material'
import { useSetting } from '@nyanpasu/interface'
import { SwitchItem } from '@nyanpasu/ui'
import { checkUpdate, useUpdaterPlatformSupported } from '@/hooks/use-updater'
import { UpdaterInstanceAtom } from '@/store/updater'
import { useState, useEffect } from 'react'
import { Notice } from '@/components/base'
import { getVersion } from '@tauri-apps/api/app'

export const AutoCheckUpdatesSetting = () => {
  const { t } = useTranslation()
  const { value, upsert } = useSetting('enable_auto_check_update')

  return (
    <SwitchItem
      label={t('Auto Check Updates')}
      checked={Boolean(value)}
      onChange={() => upsert(!value)}
    />
  )
}

export const CheckForUpdatesSetting = () => {
  const { t } = useTranslation()
  const setUpdaterInstance = useSetAtom(UpdaterInstanceAtom)
  const isSupported = useUpdaterPlatformSupported()
  const [loading, setLoading] = useState(false)

  if (!isSupported) return null

  const handleCheck = async () => {
    setLoading(true)
    try {
      const update = await checkUpdate()
      if (update) {
        setUpdaterInstance(update)
      } else {
        Notice.info(t('You are already using the latest version'))
      }
    } catch (e) {
      Notice.error(t('Failed to check for updates'))
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="text-sm font-medium text-[var(--text-main)]">
        {t('Check for Updates')}
      </div>
      <Button
        variant="outlined"
        size="small"
        onClick={handleCheck}
        disabled={loading}
        sx={{ borderRadius: '12px' }}
      >
        {loading ? t('Checking...') : t('Check now')}
      </Button>
    </div>
  )
}

export const SoftwareVersionSetting = () => {
  const { t } = useTranslation()
  const [version, setVersion] = useState<string>('')

  useEffect(() => {
    getVersion().then(setVersion).catch(console.error)
  }, [])

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="text-sm font-medium text-[var(--text-main)]">
        {t('Nyanpasu Version')}
      </div>
      <div className="text-sm font-mono text-[var(--text-sub)]">
        {version || '...'}
      </div>
    </div>
  )
}
