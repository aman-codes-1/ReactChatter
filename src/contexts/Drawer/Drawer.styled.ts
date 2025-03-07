import { styled } from '@mui/material';

export const DrawerMainStyled = styled('main', {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<{
  drawerWidth: number;
}>(({ theme, drawerWidth }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth || 0}px`,
}));
