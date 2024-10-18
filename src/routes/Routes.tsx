import { ReactNode, Suspense, useLayoutEffect, useState } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { routesConfig } from './config';
import { IRouteConfig } from './IRoutes';
import { BaseProtected } from '../pages';

const AppRoutes = () => {
  const { pathname } = useLocation();
  const { auth } = useAuth();
  const [defaultRoutes, setDefaultRoutes] = useState<ReactNode[]>([]);
  const [privateRoutes, setPrivateRoutes] = useState<ReactNode[]>([]);
  const [publicRoutes, setPublicRoutes] = useState<ReactNode[]>([]);

  useLayoutEffect(() => {
    routesConfig().forEach((route: IRouteConfig, index: number) => {
      const { Element, path, type } = route;
      const key = `${index + 1}`;
      const routeElement = (
        <Route key={key} path={path} element={<Element />} />
      );
      if (type === 'private') {
        setPrivateRoutes((prev: ReactNode[]) => [...prev, routeElement]);
      } else if (type === 'public') {
        setPublicRoutes((prev: ReactNode[]) => [...prev, routeElement]);
      } else if (type === 'default') {
        setDefaultRoutes((prev: ReactNode[]) => [...prev, routeElement]);
      }
    });
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  window.addEventListener('storage', () => {
    window.location.reload();
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          auth?.isLoggedIn ? (
            <BaseProtected />
          ) : (
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          )
        }
      >
        {defaultRoutes}
        {auth?.isLoggedIn ? privateRoutes : publicRoutes}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
