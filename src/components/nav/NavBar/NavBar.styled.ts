import { styled } from '@mui/material';

export const NavBarStyled = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  paddingRight: '1rem',
  marginBottom: '-0.5rem',
  [theme.breakpoints.down('sm')]: {
    padding: '0.75rem 1rem',
  },
  '.nav-logo': {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem 2.5rem 1.5rem 1.5rem',
    [theme.breakpoints.down('sm')]: {
      padding: '0.391rem 2.25rem',
      borderRadius: '8px',
      justifyContent: 'center',
      backgroundColor: theme.palette.grey[300],
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0.375rem 1.375rem',
    },
  },
  '.nav-logo-svg': {
    width: '32px',
    height: '32px',
    color: theme.palette.secondary.main,
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '24px',
      height: '24px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '20px',
      height: '20px',
    },
  },
  '.nav-logo:hover': {
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.grey[300],
    },
  },
  '.nav-menu-btn': {
    color: theme.palette.common.white,
    backgroundColor: `${theme.palette.action.active} !important`,
  },
  '.nav-menu-btn:hover': {
    backgroundColor: `${theme.palette.action.hover} !important`,
  },
}));
