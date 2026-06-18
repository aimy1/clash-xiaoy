import { createFileRoute } from '@tanstack/react-router'
import SettingClashExternal from '@/components/setting/setting-clash-external'
import {
  SettingsTitle,
  SettingsTitlePlaceholder,
} from '../_modules/settings-title'

export const Route = createFileRoute(
  '/(experimental)/experimental/settings/clash-external-controll',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SettingsTitlePlaceholder />
      <SettingsTitle>Clash External Control</SettingsTitle>

      <SettingClashExternal />
    </>
  )
}
