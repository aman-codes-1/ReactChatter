import { styled } from '@mui/material';

export const SuccessErrorMessageStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'height',
})<{
  height: number;
}>(({ theme, height }) => ({
  width: '100%',
  display: 'flex',
  alignItems: height > 24 ? 'flex-start' : 'center',
  gap: '0.5rem',
  '.message': {
    fontSize: '0.875rem',
    fontWeight: 600,
    wordBreak: 'break-word',
  },
  '.error': {
    color: theme.palette.error.main,
  },
  '.success': {
    color: theme.palette.success.main,
  },
}));
