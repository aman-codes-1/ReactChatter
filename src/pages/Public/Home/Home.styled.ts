import { styled } from '@mui/material';

export const HomeStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'footerHeight',
})<{
  footerHeight: number;
}>(({ theme, footerHeight }) => ({
  backgroundImage: 'url(/assets/images/cool-background.svg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100dvh',
  zIndex: '-1',
  userSelect: 'none',
  '.home-header': {
    height: '100%',
    padding: '0px 30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.625rem',
    textAlign: 'center',
    paddingBottom: `calc(${footerHeight}px + 15px)`,
    [theme.breakpoints.down('sm')]: {
      gap: '0.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '6rem',
    },
    '.home-heading': {
      fontSize: '3.625rem',
      fontWeight: 700,
      color: theme.palette.common.white,
      textShadow: `0 1px 0 ${theme.palette.grey[50]}`,
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.75rem',
      },
    },
    '.home-sub-heading': {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: '32px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.125rem',
      },
    },
    '.home-login-btn-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      margin: '1rem 0rem',
      [theme.breakpoints.down('sm')]: {
        margin: '0.875rem 0rem',
      },
    },
  },
  '.home-footer': {
    position: 'fixed',
    padding: '0px 30px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    marginBottom: '0.5rem',
    textAlign: 'center',
    '.home-footer-sub-heading': {
      fontSize: '0.9375rem',
      fontWeight: 400,
    },
  },
}));
