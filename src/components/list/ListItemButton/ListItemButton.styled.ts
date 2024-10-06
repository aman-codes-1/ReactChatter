import { styled } from '@mui/system';

export const ListItemButtonStyled = styled('div')<{
  width: string;
  disableHover: boolean;
  primaryEllipsesLineClamp: any;
  secondaryEllipsesLineClamp: any;
}>(
  ({
    theme,
    width,
    disableHover,
    primaryEllipsesLineClamp,
    secondaryEllipsesLineClamp,
  }) => ({
    width: width || '100%',
    cursor: disableHover ? 'default' : 'pointer',
    '.list-item-btn': {
      borderRadius: '8px',
      '.MuiListItemText-root': {
        wordBreak: 'break-word',
        '.MuiListItemText-primary': {
          color: theme.palette.grey[900],
          wordBreak: 'break-word',
          ...(primaryEllipsesLineClamp
            ? {
                display: '-webkit-box',
                WebkitLineClamp: primaryEllipsesLineClamp,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }
            : {}),
        },
        '.MuiListItemText-secondary': {
          color: theme.palette.grey[700],
          wordBreak: 'break-word',
          ...(secondaryEllipsesLineClamp
            ? {
                display: '-webkit-box',
                WebkitLineClamp: secondaryEllipsesLineClamp,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }
            : {}),
        },
      },
    },
    '.list-item-btn:hover': {
      backgroundColor: disableHover ? 'transparent' : theme.palette.grey[100],
      cursor: disableHover ? 'default' : 'pointer',
      color: disableHover ? '' : theme.palette.secondary.main,
      '.MuiTypography-root, .Mui-selected': {
        color: disableHover ? '' : theme.palette.secondary.main,
      },
      '.list-item-icon': {
        color: disableHover ? '' : theme.palette.secondary.main,
        outline: disableHover
          ? ''
          : `1px solid ${theme.palette.secondary.main}`,
        backgroundColor: disableHover ? '' : theme.palette.common.white,
      },
    },
    '.MuiButtonBase-root.MuiListItemButton-root.Mui-selected': {
      backgroundColor: theme.palette.primary.light,
      '.MuiTypography-root': {
        color: theme.palette.secondary.main,
      },
      '.list-item-icon': {
        color: theme.palette.secondary.main,
        outline: `1px solid ${theme.palette.secondary.main}`,
        backgroundColor: theme.palette.common.white,
      },
    },
  }),
);
