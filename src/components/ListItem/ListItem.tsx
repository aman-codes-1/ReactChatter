import {
  List,
  ListItem as MuiListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { ListItemStyled } from './ListItem.styled';
import { ListItemProps } from './IListItem';

const ListItem = ({
  listItemIcon,
  primaryText,
  secondaryText,
  padding = '',
  disableHover = false,
  disabled = false,
  secondaryAction,
  dense = false,
  selected = false,
  onClick,
  btnSx,
  children,
}: ListItemProps) => (
  <ListItemStyled
    padding={padding}
    disableHover={disableHover}
    primaryTextFontSize={primaryText?.fontSize}
    primaryTextFontWeight={primaryText?.fontWeight}
    secondaryTextFontSize={secondaryText?.fontSize}
    secondaryTextFontWeight={secondaryText?.fontWeight}
  >
    <List dense={dense} disablePadding>
      <MuiListItem disablePadding secondaryAction={secondaryAction}>
        <ListItemButton
          disableRipple={disableHover}
          disableTouchRipple={disableHover}
          selected={selected}
          className="list-item-btn"
          onClick={onClick}
          disabled={disabled}
          sx={btnSx}
        >
          {children}
          {listItemIcon}
          {primaryText || secondaryText ? (
            <ListItemText
              primary={primaryText?.title}
              secondary={secondaryText?.title || null}
            />
          ) : null}
        </ListItemButton>
      </MuiListItem>
    </List>
  </ListItemStyled>
);

export default ListItem;
