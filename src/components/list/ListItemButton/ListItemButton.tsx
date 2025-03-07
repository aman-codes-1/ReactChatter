import { forwardRef } from 'react';
import {
  Badge,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Skeleton,
  styled,
} from '@mui/material';
import { Avatar } from '../..';
import { ListItemButtonProps } from './IListItemButton';
import { ListItemButtonStyled } from './ListItemButton.styled';

const StyledBadge = styled(Badge, {
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

const ListItemButton = forwardRef<HTMLDivElement, ListItemButtonProps>(
  (props, ref) => {
    const {
      width = '',
      height = '',
      disableHover = false,
      startIcon,
      endIcon,
      avatarProps,
      textProps,
      children,
      ...rest
    } = props;
    const isAvatar = !!Object.keys(avatarProps || {})?.length;
    const isText = !!Object.keys(textProps || {})?.length;

    const renderAvatar = () => {
      if (avatarProps?.loading) {
        return (
          <Skeleton variant="circular">
            <Avatar {...avatarProps} />
          </Skeleton>
        );
      } else if (avatarProps?.badge) {
        return (
          <StyledBadge
            backgroundColor={avatarProps?.badge?.backgroundColor}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={avatarProps?.badge?.content}
          >
            <Avatar {...avatarProps} />
          </StyledBadge>
        );
      } else {
        return <Avatar {...avatarProps} />;
      }
    };

    return (
      <ListItemButtonStyled
        width={width}
        disableHover={disableHover}
        primaryEllipsesLineClamp={
          textProps?.style?.WebkitLineClamp ||
          (textProps?.slotProps?.primary as any)?.style?.WebkitLineClamp
        }
        secondaryEllipsesLineClamp={
          textProps?.style?.WebkitLineClamp ||
          (textProps?.slotProps?.secondary as any)?.style?.WebkitLineClamp
        }
        disableRipple={disableHover}
        disableTouchRipple={disableHover}
        ref={ref}
        {...rest}
      >
        {isAvatar ? (
          <ListItemAvatar sx={{ cursor: disableHover ? 'default' : 'pointer' }}>
            {renderAvatar()}
          </ListItemAvatar>
        ) : null}
        {startIcon ? (
          <ListItemIcon sx={{ minWidth: '2.25rem' }}>{startIcon}</ListItemIcon>
        ) : null}
        {isText ? (
          <ListItemText
            {...textProps}
            slotProps={{
              primary: {
                fontSize: '1rem',
                fontWeight: 500,
                ...textProps?.slotProps?.primary,
              },
              secondary: {
                fontWeight: 470,
                ...textProps?.slotProps?.secondary,
              },
            }}
            sx={{
              ...textProps?.sx,
              cursor: disableHover ? 'default' : 'pointer',
            }}
          />
        ) : null}
        {endIcon}
        {children}
      </ListItemButtonStyled>
    );
  },
);

export default ListItemButton;
