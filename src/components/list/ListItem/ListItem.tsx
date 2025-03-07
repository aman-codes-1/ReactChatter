import { forwardRef } from 'react';
import { ListItemButton } from '..';
import { ListItemProps } from './IListItem';
import { ListItemStyled } from './ListItem.styled';

const ListItem = forwardRef<HTMLDivElement, ListItemProps>((props, ref) => {
  const {
    width = '',
    disableHover = false,
    btnProps,
    children,
    sx,
    ...rest
  } = props;

  const isListItemButton = !!Object.keys(btnProps || {})?.length;

  return (
    <ListItemStyled
      width={width}
      disableHover={disableHover}
      {...rest}
      sx={{ ...sx, cursor: 'default' }}
    >
      {isListItemButton ? (
        <ListItemButton disableHover={disableHover} ref={ref} {...btnProps} />
      ) : null}
      {children}
    </ListItemStyled>
  );
});

export default ListItem;
