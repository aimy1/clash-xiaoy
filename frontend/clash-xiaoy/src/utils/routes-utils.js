import { Apps, Dashboard, DesignServices, GridView, PublicRounded, OpenInBrowserRounded, Settings, SettingsEthernet, Terminal, } from '@mui/icons-material';
const routes = {
    dashboard: Dashboard,
    proxies: PublicRounded,
    profiles: GridView,
    connections: SettingsEthernet,
    rules: DesignServices,
    logs: Terminal,
    settings: Settings,
    providers: Apps,
    browser: OpenInBrowserRounded,
};
export const getRoutes = () => {
    return Object.keys(routes).reduce((acc, key) => {
        acc[key] = `/${key}`;
        return acc;
    }, {});
};
export const getRoutesWithIcon = () => {
    return Object.keys(routes).reduce((acc, key) => {
        acc[key] = {
            path: `/${key}`,
            icon: routes[key],
        };
        return acc;
    }, {});
};
