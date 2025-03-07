import { Suspense, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { DrawerContext } from '../../../contexts';
import { BaseProtectedStyled } from './BaseProtected.styled';

const BaseProtected = () => {
  const { navBarHeight } = useContext(DrawerContext);

  return (
    <BaseProtectedStyled navBarHeight={navBarHeight}>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </BaseProtectedStyled>
  );
};

export default BaseProtected;
