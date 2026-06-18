import { createFileRoute } from '@tanstack/react-router'
import SettingClashWeb from '@/components/setting/setting-clash-web'
import {
  SettingsTitle,
  SettingsTitlePlaceholder,
} from '../_modules/settings-title'

export const Route = createFileRoute(
  '/(experimental)/experimental/settings/web-ui',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SettingsTitlePlaceholder />
      <SettingsTitle>Web UI</SettingsTitle>

      <SettingClashWeb />
    </>
  )
}
