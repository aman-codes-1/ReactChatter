import { styled } from '@mui/system';

export const MainLayoutStyled = styled('div')<{ navbarHeight: number }>(
  ({ theme, navbarHeight }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '3.8rem 4.5rem',
    height: '100svh',
    [theme.breakpoints.down('md')]: {
      padding: '2.5rem 3rem',
    },
    [theme.breakpoints.down('sm')]: {
      height: `calc(100svh - ${navbarHeight || 0}px)`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: '2.5rem 2rem',
    },
    '.main-layout-heading': {
      fontSize: '3rem',
      lineHeight: 1,
      marginBottom: '2rem',
      color: theme.palette.text.primary,
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.75rem',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '2.5rem',
      },
    },
    '.main-layout-default-text': {
      fontSize: '0.875rem',
      marginTop: '0.5rem',
      color: theme.palette.grey[800],
    },
    '.overflow-wrapper': {
      width: '100%',
      overflow: 'auto',
    },
  }),
);

export const MainLayoutLoaderStyled = styled('div')(() => ({
  width: '100%',
  '.primary-skeleton': {
    maxWidth: '130px',
  },
  '.secondary-skeleton': {
    maxWidth: '230px',
  },
  '.avatar-skeleton': {
    width: 40,
    height: 40,
  },
}));
