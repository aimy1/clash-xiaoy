import '@csstools/normalize.css/normalize.css';
import '@csstools/normalize.css/opinionated.css';
import './assets/styles/index.scss';
import './assets/styles/tailwind.css';
import './services/i18n';
import '@/utils/language';
declare const router: import("@tanstack/router-core").RouterCore<import("@tanstack/router-core").Route<Register, any, "/", "/", string, "__root__", undefined, {}, {}, import("@tanstack/react-router").AnyContext, import("@tanstack/react-router").AnyContext, {}, undefined, import("./route-tree.gen").RootRouteChildren, import("./route-tree.gen").FileRouteTypes, unknown, unknown, undefined>, "never", false, import("@tanstack/history").RouterHistory, Record<string, any>>;
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
export {};
