import { createFileRoute } from '@tanstack/react-router';
import SettingSystemService from '@/components/setting/setting-system-service';
import { SettingsTitle, SettingsTitlePlaceholder, } from '../_modules/settings-title';
export const Route = createFileRoute('/(experimental)/experimental/settings/system-service')({
    component: RouteComponent,
});
function RouteComponent() {
    return (<>
      <SettingsTitlePlaceholder />
      <SettingsTitle>System Service</SettingsTitle>

      <SettingSystemService />
    </>);
}
