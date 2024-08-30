import { styled } from '@mui/system';

export const ButtonStyled = styled('div')(({ theme }) => ({
  '.btn': {
    textTransform: 'none',
    fontWeight: 501,
  },
  '.text-hidden': {
    '.MuiButton-startIcon': {
      margin: 0,
    },
    '.MuiButton-endIcon': {
      margin: 0,
    },
    div: {
      display: 'none',
    },
  },
  '.text-hidden-xs': {
    [theme.breakpoints.down('xs')]: {
      '.MuiButton-startIcon': {
        margin: 0,
      },
      '.MuiButton-endIcon': {
        margin: 0,
      },
      div: {
        display: 'none',
      },
    },
  },
}));
