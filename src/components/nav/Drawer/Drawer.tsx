import { forwardRef, useContext } from 'react';
import { DrawerProps, Drawer as MuiDrawer, useTheme } from '@mui/material';
import { DrawerContext } from '../../../contexts';

const Drawer = forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
  const { children, ...rest } = props;

  const theme = useTheme();
  const { navBarHeight, getDrawerWidth } = useContext(DrawerContext);

  return (
    <MuiDrawer
      {...rest}
      ref={ref}
      sx={{
        width: '100%',
        maxWidth: `${getDrawerWidth() || 300}px`,
        flexShrink: 0,
      }}
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: `${getDrawerWidth() || 300}px`,
            height: `calc(100% - ${navBarHeight || 0}px)`,
            [theme.breakpoints.down('xs')]: {
              maxWidth: '82vw',
            },
          },
        },
      }}
    >
      {children}
    </MuiDrawer>
  );
});

export default Drawer;
