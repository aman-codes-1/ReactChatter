import { display, styled } from '@mui/system';

export const BaseProtectedStyled = styled('div')(({ theme }: any) => ({
  display: 'flex',
  width: '100%',
  height: '100svh',
  [theme.breakpoints.up('sm')]: {
    '.hidden-from-web': {
      display: 'none',
    },
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    '.mobile-navbar': {
      borderTop: `1px solid ${theme.palette.grey[300]}`,
      top: 'auto',
      bottom: 0,
      zIndex: theme.zIndex.drawer + 1,
    },
    '.hidden-from-mobile': {
      display: 'none',
    },
  },
}));
