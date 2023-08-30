import { ROOT_ROUTE } from "core/config/consts";
import { join } from "path";

// Portal Route:
export const PORTAL_ROUTE = "/portal";
export const PORTAL_APP_CATALOG_ROUTE = join(PORTAL_ROUTE, "/app-catalog");
export const PORTAL_APP_USER_ROUTE = join(PORTAL_ROUTE, "/app-user");
export const PORTAL_LANDING_PAGE_ROUTE = join(PORTAL_ROUTE, "/landing-page");

// Dashbroad Route:
export const DASHBROAD_ROUTE = join(ROOT_ROUTE, "/dashbroad");
