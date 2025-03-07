import { styled } from '@mui/material';

export const BaseProtectedStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'navBarHeight',
})<{
  navBarHeight: number;
}>(({ theme, navBarHeight }) => ({
  width: '100%',
  height: '100dvh',
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    height: `calc(100dvh - ${navBarHeight || 0}px)`,
  },
}));
