import { createFileRoute } from '@tanstack/react-router'
import { useLockFn } from 'ahooks'
import { useTranslation } from 'react-i18next'
import { collectEnvs, openThat } from '@nyanpasu/interface'
import { BaseCard } from '@nyanpasu/ui'
import SettingNyanpasuPath from '@/components/setting/setting-nyanpasu-path'
import { Button } from '@/components/ui/button'
import {
  SettingsTitle,
  SettingsTitlePlaceholder,
} from '../_modules/settings-title'

export const Route = createFileRoute(
  '/(experimental)/experimental/settings/debug-utils',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  const handleCopyEnv = useLockFn(async () => {
    const envs = await collectEnvs()
    await navigator.clipboard.writeText(JSON.stringify(envs, null, 2))
  })

  const handleOpenRepo = useLockFn(() => {
    return openThat('https://github.com/clash-xiaoy/clash-xiaoy')
  })

  return (
    <>
      <SettingsTitlePlaceholder />
      <SettingsTitle>Debug Utils</SettingsTitle>

      <BaseCard label={t('Tools')}>
        <div className="flex flex-wrap gap-2 p-2">
          <Button variant="flat" onClick={handleCopyEnv}>
            复制环境信息
          </Button>
          <Button variant="basic" onClick={handleOpenRepo}>
            打开 GitHub
          </Button>
        </div>
      </BaseCard>

      <SettingNyanpasuPath />
    </>
  )
}
