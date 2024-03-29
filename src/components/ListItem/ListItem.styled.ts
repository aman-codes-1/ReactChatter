import { ReactNode } from 'react';
import { styled } from '@mui/system';

export const ListItemStyled = styled('div')<{
  padding: string;
  secondaryAction: ReactNode;
  disableHover: boolean;
}>(({ theme, padding, secondaryAction, disableHover }) => ({
  width: '100%',
  padding,
  '.list-item-btn': {
    borderRadius: '10px',
    gap: '17px',
    '.MuiListItemText-root': {
      wordWrap: 'break-word',
      marginRight: secondaryAction ? '18px' : '',
      '.MuiListItemText-primary': {
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: '1.5rem',
        color: theme.palette.grey[900],
      },
      '.MuiListItemText-secondary': {
        fontSize: '0.75rem',
        fontWeight: 600,
        lineHeight: '1rem',
        color: theme.palette.grey[600],
      },
    },
  },
  '.list-item-btn:hover': {
    background: disableHover ? 'transparent' : '#F9FAFB',
    cursor: disableHover ? 'default' : 'pointer',
    color: '#4F46E5',
    '.MuiTypography-root, .Mui-selected': {
      color: disableHover ? '' : '#4F46E5',
    },
    '.list-item-icon': {
      color: disableHover ? '' : '#4F46E5',
      outline: disableHover ? '' : '1px solid #4F46E5',
      background: disableHover ? '' : theme.palette.common.white,
    },
  },
  '.MuiButtonBase-root.MuiListItemButton-root.Mui-selected': {
    '.MuiTypography-root': {
      color: '#4F46E5',
    },
    '.list-item-icon': {
      color: '#4F46E5',
      outline: '1px solid #4F46E5',
      background: theme.palette.common.white,
    },
  },
}));
