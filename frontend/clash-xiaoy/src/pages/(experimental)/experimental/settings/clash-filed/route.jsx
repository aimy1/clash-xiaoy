import { createFileRoute } from '@tanstack/react-router';
import SettingClashField from '@/components/setting/setting-clash-field';
import { SettingsTitle, SettingsTitlePlaceholder, } from '../_modules/settings-title';
export const Route = createFileRoute('/(experimental)/experimental/settings/clash-filed')({
    component: RouteComponent,
});
function RouteComponent() {
    return (<>
      <SettingsTitlePlaceholder />
      <SettingsTitle>Clash Field</SettingsTitle>

      <SettingClashField />
    </>);
}
