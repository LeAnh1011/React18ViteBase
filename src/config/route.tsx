import { ROOT_ROUTE } from "core/config/consts";
import { lazy } from "react";
import { Redirect } from "react-router-dom";
import {
  DASHBROAD_ROUTE
} from "./route-const";
import DashbroadPage from "pages/DashbroadPage/DashbroadPage";
/* Routes component*/

export interface Route {
  path: string;
  component:
    | ((props?: unknown) => JSX.Element)
    | React.LazyExoticComponent<(props?: unknown) => JSX.Element>;
  exact?: boolean;
}

const userRoutes: Route[] = [
  // Adding routes here:
  {
    path: DASHBROAD_ROUTE,
    component: DashbroadPage,
  },

  // This base route should be at the end of all other routes
  {
    path: ROOT_ROUTE,
    exact: true,
    component: () => <Redirect to={DASHBROAD_ROUTE} />,
  },
];

export function lazyLoad(path: string, namedExport: string) {
  return lazy(async () => {
    const promise = import(/* @vite-ignore */ path);
    if (namedExport == null) {
      return promise;
    } else {
      return promise.then((module) => ({ default: module[namedExport] }));
    }
  });
}

export { userRoutes };
