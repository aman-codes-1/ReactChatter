import { styled } from '@mui/material';

export const BaseProtectedStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'navbarHeight',
})<{
  navbarHeight: number;
}>(({ theme, navbarHeight }) => ({
  width: '100%',
  height: '100dvh',
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    height: `calc(100dvh - ${navbarHeight || 0}px)`,
  },
}));
