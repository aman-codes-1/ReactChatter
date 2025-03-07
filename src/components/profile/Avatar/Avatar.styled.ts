import { Avatar, styled } from '@mui/material';

export const AvatarStyled = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'loading',
})(() => ({}));
