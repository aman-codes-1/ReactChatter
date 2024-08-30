import { ReactNode } from 'react';

export type IRouteConfig = {
  Element: () => JSX.Element;
  type: string;
  path: string;
};

export type IAppRoute = {
  defaultRoutes: ReactNode;
  routes: ReactNode;
};
