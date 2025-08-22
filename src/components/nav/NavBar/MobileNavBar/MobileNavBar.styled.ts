import { styled } from '@mui/material';

export const MobileNavBarStyled = styled('div')(({ theme }) => ({
  '.mobile-navbar-wrapper': {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    zIndex: theme.zIndex.drawer + 1,
  },
  '.mobile-navbar-app-bar': {
    minHeight: '3.75rem',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.down('sm')]: {
      padding: '0.875rem 1rem',
    },
  },
  '.mobile-navbar-tool-bar': {
    minHeight: 0,
  },
}));
