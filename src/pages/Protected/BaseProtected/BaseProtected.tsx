import { Suspense, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { DrawerContext } from '../../../contexts';
import { BaseProtectedStyled } from './BaseProtected.styled';

const BaseProtected = () => {
  const { navbarHeight } = useContext(DrawerContext);

  return (
    <BaseProtectedStyled navbarHeight={navbarHeight}>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </BaseProtectedStyled>
  );
};

export default BaseProtected;
