import { styled } from '@mui/system';

export const SideBarStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '22%',
  height: '100svh',
  borderRight: `1px solid ${theme.palette.grey[200]}`,
  gap: '0.7rem',
  overflow: 'auto',
  [theme.breakpoints.up('sm')]: {
    '.flex-item:nth-child(2)': {
      marginTop: '-1rem',
    },
  },
  [theme.breakpoints.down('xl')]: {
    maxWidth: '30%',
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '38%',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '42%',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    border: 'none',
    '.hidden-from-mobile': {
      display: 'none',
    },
  },
}));
