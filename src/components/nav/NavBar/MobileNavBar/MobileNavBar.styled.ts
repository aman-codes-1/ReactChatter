import { styled } from '@mui/material';

export const MobileNavBarStyled = styled('div')(({ theme }) => ({
  '.mobile-navbar-wrapper': {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    zIndex: theme.zIndex.drawer + 1,
  },
  '.mobile-navbar': {
    backgroundColor: theme.palette.grey[100],
  },
}));
