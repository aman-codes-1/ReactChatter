import { styled } from '@mui/system';

export const SuccessErrorMessageStyled = styled('div')<{ height: number }>(
  ({ theme, height }) => ({
    '.success-error-message-wrapper': {
      marginTop: '0.5rem',
      width: '100%',
      display: 'flex',
      alignItems: height > 24 ? 'flex-start' : 'center',
      gap: '0.5rem',
      '.success-error-message': {
        fontSize: '0.875rem',
        wordBreak: 'break-word',
      },
      '.error-dark': {
        color: theme.palette.error.dark,
      },
      '.success-dark': {
        color: theme.palette.success.dark,
      },
    },
  }),
);
