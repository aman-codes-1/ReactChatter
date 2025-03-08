import { forwardRef } from 'react';
import {
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material';
import { Avatar } from '../..';
import { ListItemButtonProps } from './IListItemButton';
import {
  AvatarStyledBadge,
  ListItemButtonStyled,
} from './ListItemButton.styled';

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
          <AvatarStyledBadge
            backgroundColor={avatarProps?.badge?.backgroundColor}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={avatarProps?.badge?.content}
          >
            <Avatar {...avatarProps} />
          </AvatarStyledBadge>
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
