import { Badge, ListItemButton, styled } from '@mui/material';

export const ListItemButtonStyled = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== 'width' &&
    prop !== 'disableHover' &&
    prop !== 'primaryEllipsesLineClamp' &&
    prop !== 'secondaryEllipsesLineClamp',
})<{
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
    borderRadius: '6px',
    cursor: disableHover ? 'default' : 'pointer',
    '&:hover': {
      backgroundColor: disableHover ? 'transparent' : theme.palette.grey[100],
      cursor: disableHover ? 'default' : 'pointer',
    },
    '.MuiListItemText-root': {
      wordBreak: 'break-word',
      '.MuiListItemText-primary': {
        color: theme.palette.text.primary,
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
        color: theme.palette.text.secondary,
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
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: theme.palette.primary.light,
      '.MuiListItemText-primary': {
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

export const AvatarStyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<{ backgroundColor: string }>(({ theme, backgroundColor }) => ({
  '& .MuiBadge-badge': {
    backgroundColor,
    color: theme.palette.common.white,
    boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
    minWidth: '0',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    bottom: '6.5px',
  },
}));
