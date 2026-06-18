import SettingClashCore from '@/components/setting/setting-clash-core'
import { m } from '@/paraglide/messages'
import { createFileRoute } from '@tanstack/react-router'
import {
  SettingsTitle,
  SettingsTitlePlaceholder,
} from '../_modules/settings-title'

export const Route = createFileRoute(
  '/(experimental)/experimental/settings/clash-core',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SettingsTitlePlaceholder />
      <SettingsTitle>{m.settings_clash_settings_title()}</SettingsTitle>

      <SettingClashCore />
    </>
  )
}
