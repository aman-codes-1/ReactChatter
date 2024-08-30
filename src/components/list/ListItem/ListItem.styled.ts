import { styled } from '@mui/system';

export const ListItemStyled = styled('div')<{
  width: string;
  disableHover: boolean;
}>(({ theme, width, disableHover }) => ({
  width: width || '100%',
  cursor: disableHover ? 'default' : 'pointer',
}));
