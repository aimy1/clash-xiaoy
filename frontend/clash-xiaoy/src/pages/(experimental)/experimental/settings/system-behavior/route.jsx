import { createFileRoute } from '@tanstack/react-router';
import SettingSystemBehavior from '@/components/setting/setting-system-behavior';
import { SettingsTitle, SettingsTitlePlaceholder, } from '../_modules/settings-title';
export const Route = createFileRoute('/(experimental)/experimental/settings/system-behavior')({
    component: RouteComponent,
});
function RouteComponent() {
    return (<>
      <SettingsTitlePlaceholder />
      <SettingsTitle>System Behavior</SettingsTitle>

      <SettingSystemBehavior />
    </>);
}
