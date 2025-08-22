import { forwardRef, useLayoutEffect } from 'react';
import {
  DrawerProps as MuiDrawerProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Drawer, NavBar } from '..';
import { MenuFooter, MenuList } from '.';
import { updateWidth } from '../../../helpers';

interface DrawerProps extends MuiDrawerProps {
  setMenuWidth?: any;
}

const Menu = forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
  const { setMenuWidth, ...rest } = props;

  const theme = useTheme();
  const isMediumOrAbove = useMediaQuery(theme.breakpoints.up('sm'));

  useLayoutEffect(() => {
    const update = () => updateWidth(ref, setMenuWidth, true);
    update();

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <Drawer {...rest} ref={ref}>
      {isMediumOrAbove ? <NavBar /> : null}
      <MenuList />
      <MenuFooter />
    </Drawer>
  );
});

export default Menu;
