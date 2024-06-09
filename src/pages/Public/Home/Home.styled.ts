import { styled } from '@mui/system';

export const HomeStyled = styled('div')(({ theme }) => ({
  '.home-container': {
    backgroundImage: 'url(/assets/images/cool-background.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
    zIndex: '-1',
    userSelect: 'none',
  },
  '.home-wrapper': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 30px',
    },
    '.home-header': {
      marginTop: 162,
      textAlign: 'center',
      letterSpacing: '0.4px',
      '.home-heading': {
        fontSize: '58px',
        color: theme.palette.common.white,
        textShadow: `0 1px 0 ${theme.palette.grey[700]}`,
        marginBottom: 8,
        [theme.breakpoints.down('sm')]: {
          fontSize: '45px',
        },
      },
      '.home-sub-heading': {
        margin: '8px 0px 8px 0px',
        lineHeight: '32px',
        fontSize: '1.26rem',
        [theme.breakpoints.down('sm')]: {
          fontSize: '19px',
        },
      },
      '.home-login-btn': {
        marginTop: 10,
        textTransform: 'none',
        fontWeight: 600,
        backgroundColor: `${theme.palette.action.active} !important`,
        width: '120px',
        height: '50px',
        fontSize: '16px',
        borderRadius: 7,
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          height: 'auto',
        },
      },
      '.home-login-btn:hover': {
        backgroundColor: `${theme.palette.action.hover} !important`,
      },
    },
    '.home-footer': {
      margin: 'auto 0px 8px 0px',
      textAlign: 'center',
      '.home-footer-sub-heading': {
        fontSize: '14.5px',
      },
    },
  },
}));
