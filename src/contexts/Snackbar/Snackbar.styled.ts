import { styled } from '@mui/system';

export const SnackbarStyled = styled('div')(({ theme }) => ({
  '.snackbar': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100svh',
    top: '0px',
    '.snackbar-wrapper': {
      width: '430px',
      padding: '22px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      minHeight: '130px',
      textAlign: 'center',
      '.close-btn': {
        marginBottom: '18px',
      },
      '.error-bg-light': {
        backgroundColor: `${theme.palette.error.light} !important`,
      },
      '.success-bg-light': {
        backgroundColor: `${theme.palette.success.light} !important`,
      },
      '.error-bg-dark': {
        backgroundColor: `${theme.palette.error.dark} !important`,
      },
      '.success-bg-dark': {
        backgroundColor: `${theme.palette.success.dark} !important`,
      },
      '.error-dark': {
        color: theme.palette.error.dark,
      },
      '.success-dark': {
        color: theme.palette.success.dark,
      },
      '.title': {
        fontSize: '1.0625rem',
        marginBottom: '2.5px',
      },
      '.message': {
        marginTop: '2.5px',
        fontSize: '1rem',
        color: theme.palette.grey[800],
      },
      '.submit-btn': {
        marginTop: '22px',
        width: '100%',
      },
      '.error-submit-btn': {
        backgroundColor: `${theme.palette.error.dark} !important`,
      },
      '.error-submit-btn:hover': {
        backgroundColor: `${theme.palette.error[900]} !important`,
      },
      '.success-submit-btn': {
        backgroundColor: `${theme.palette.success.dark} !important`,
      },
      '.success-submit-btn:hover': {
        backgroundColor: `${theme.palette.success[900]} !important`,
      },
    },
  },
}));
