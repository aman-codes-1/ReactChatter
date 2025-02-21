import { Button, styled } from '@mui/material';

export const ButtonStyled = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'hideText',
})<{
  hideText?: boolean;
}>(({ theme, hideText }) => ({
  textTransform: 'none',
  fontWeight: 600,
  ...(hideText
    ? {
        '.MuiButton-startIcon': {
          margin: 0,
        },
        '.MuiButton-endIcon': {
          margin: 0,
        },
      }
    : {}),
}));
