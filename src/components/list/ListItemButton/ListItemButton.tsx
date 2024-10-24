import { forwardRef } from 'react';
import {
  ListItemAvatar,
  ListItemButton as MuiListItemButton,
  ListItemText,
} from '@mui/material';
import { Avatar } from '../..';
import { ListItemButtonProps } from './IListItemButton';
import { ListItemButtonStyled } from './ListItemButton.styled';

const ListItemButton = forwardRef((props: ListItemButtonProps, ref: any) => {
  const {
    width = '',
    height = '',
    disableHover = false,
    startIcon,
    endIcon,
    wrapperClassName,
    className,
    avatarProps,
    textProps,
    children,
    ...rest
  } = props;
  const name = (textProps?.primary as string) || '';
  const isAvatar = !!Object.keys(avatarProps || {})?.length;
  const isText = !!Object.keys(textProps || {})?.length;

  const renderAvatar = () => {
    if (name?.length && avatarProps?.src?.length) {
      return <Avatar alt={name} {...avatarProps} />;
    }

    const nameFirstLetter = name?.length
      ? name?.substring(0, 1).toUpperCase()
      : null;

    return (
      <Avatar alt={nameFirstLetter} src="" {...avatarProps}>
        {nameFirstLetter}
      </Avatar>
    );
  };

  return (
    <ListItemButtonStyled
      width={width}
      disableHover={disableHover}
      primaryEllipsesLineClamp={
        textProps?.primaryTypographyProps?.style?.WebkitLineClamp
      }
      secondaryEllipsesLineClamp={
        textProps?.secondaryTypographyProps?.style?.WebkitLineClamp
      }
      className={wrapperClassName}
    >
      <MuiListItemButton
        disableRipple={disableHover}
        disableTouchRipple={disableHover}
        className={`list-item-btn ${className}`}
        ref={ref}
        {...rest}
      >
        {isAvatar ? (
          <ListItemAvatar sx={{ cursor: disableHover ? 'default' : 'pointer' }}>
            {avatarProps?.children || renderAvatar()}
          </ListItemAvatar>
        ) : null}
        {startIcon}
        {isText ? (
          <ListItemText
            {...textProps}
            primaryTypographyProps={{
              fontWeight: 500,
              ...textProps?.primaryTypographyProps,
            }}
            secondaryTypographyProps={{
              fontWeight: 500,
              ...textProps?.secondaryTypographyProps,
            }}
            sx={{
              ...textProps?.sx,
              cursor: disableHover ? 'default' : 'pointer',
            }}
          />
        ) : null}
        {endIcon}
        {children}
      </MuiListItemButton>
    </ListItemButtonStyled>
  );
});

ListItemButton.displayName = 'ListItemButton';

export default ListItemButton;
