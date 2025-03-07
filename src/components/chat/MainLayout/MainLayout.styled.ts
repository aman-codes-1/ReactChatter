import { List, styled } from '@mui/material';

export const MainLayoutStyled = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'navBarHeight' &&
    prop !== 'disablePadding' &&
    prop !== 'isHeading',
})<{ navBarHeight: number; disablePadding: boolean; isHeading: boolean }>(
  ({ theme, navBarHeight, disablePadding, isHeading }) => ({
    width: '100%',
    ...(isHeading
      ? {
          display: 'flex',
          flexDirection: 'column',
          height: '100dvh',
          overflow: 'auto',
          [theme.breakpoints.down('sm')]: {
            height: `calc(100dvh - ${navBarHeight || 0}px)`,
          },
        }
      : {}),
    ...(disablePadding
      ? {}
      : {
          padding: '3.5rem 4.5rem 2rem 4.5rem',
          [theme.breakpoints.between('sm', 'md')]: {
            padding: '2.5rem 3rem 2.5rem 3rem',
          },
          [theme.breakpoints.between('xs', 'sm')]: {
            padding: '2.5rem 3rem 0rem 3rem',
          },
          [theme.breakpoints.down('xs')]: {
            padding: '2rem 2rem 0rem 2rem',
          },
        }),
    '.main-layout-heading': {
      fontSize: '3rem',
      fontWeight: 700,
      marginBottom: '2.5rem',
      lineHeight: 1,
      color: theme.palette.text.primary,
      [theme.breakpoints.down('sm')]: {
        marginBottom: '1.75rem',
        fontSize: '2.75rem',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '2.5rem',
      },
    },
    '.main-layout-heading-skeleton': {
      width: '100%',
      maxWidth: '280px',
    },
    '.main-layout-description-skeleton': {
      width: '100%',
      maxWidth: '360px',
      marginTop: '3rem',
    },
    '.main-layout-description': {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: theme.palette.text.secondary,
    },
    '.main-layout-margin-top': {
      marginTop: '0.5rem',
    },
  }),
);

export const MainLayoutLoaderStyled = styled(List)(() => ({
  width: '100%',
  overflow: 'auto',
  '.primary-skeleton': {
    maxWidth: '130px',
  },
  '.secondary-skeleton': {
    maxWidth: '230px',
  },
}));
