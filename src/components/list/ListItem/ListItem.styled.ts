import { ListItem, styled } from '@mui/material';

export const ListItemStyled = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'disableHover',
})<{
  width: string;
  disableHover: boolean;
}>(({ theme, width, disableHover }) => ({
  width: width || '100%',
  cursor: disableHover ? 'default' : 'pointer',
}));
