import { Drawer as MuiDrawer, useTheme } from '@mui/material';

const Drawer = ({
  anchor,
  isOpen,
  onClose,
  isMobile,
  navbarHeight = 0,
  children,
}: any) => {
  const theme = useTheme();

  return (
    <MuiDrawer
      anchor={anchor}
      open={isOpen}
      onClose={onClose}
      sx={
        isMobile
          ? {
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              },
            }
          : {}
      }
      PaperProps={{
        sx: { width: '87vw', height: `calc(100% - ${navbarHeight || 0}px)` },
      }}
    >
      {children}
    </MuiDrawer>
  );
};

export default Drawer;
