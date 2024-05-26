import { styled } from '@mui/system';

export const NavBarStyled = styled('div')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    width: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem',
    backgroundColor: theme.palette.grey[50],
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  '.nav-logo': {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '1rem 0rem',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      justifyContent: 'center',
    },
    '.nav-logo-svg': {
      width: '32px',
      height: '32px',
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('sm')]: {
        width: '24px',
        height: '24px',
      },
    },
  },
  '.nav-logo:hover': {
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.grey[200],
    },
  },
  '.nav-menu-btn': {
    textTransform: 'none',
    fontWeight: 'bold',
    backgroundColor: theme.palette.action.active,
    color: theme.palette.common.white,
    padding: '0.5rem 1rem',
    fontSize: '.875rem',
    borderRadius: '.375rem',
    gap: '0.5rem',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    '.nav-menu-btn-icon': {
      width: '24px',
      height: '24px',
    },
  },
  '.nav-menu-btn:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
