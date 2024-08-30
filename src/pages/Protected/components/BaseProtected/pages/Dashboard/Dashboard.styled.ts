import { styled } from '@mui/system';

export const DashboardStyled = styled('div')<{
  navbarHeight: number;
}>(({ theme, navbarHeight }) => ({
  width: '100%',
  height: `calc(100svh - ${navbarHeight || 0}px)`,
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: 'unset',
  },
}));
