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
  secondaryAction,
  dense = false,
  selected = false,
  onClick,
}: ListItemProps) => (
  <ListItemStyled
    padding={padding}
    secondaryAction={secondaryAction}
    disableHover={disableHover}
  >
    <List dense={dense} disablePadding>
      <MuiListItem disablePadding secondaryAction={secondaryAction}>
        <ListItemButton
          disableRipple={disableHover}
          disableTouchRipple={disableHover}
          selected={selected}
          className="list-item-btn"
          onClick={onClick}
        >
          {listItemIcon}
          <ListItemText id={primaryText} primary={primaryText} secondary={secondaryText || null} />
        </ListItemButton>
      </MuiListItem>
    </List>
  </ListItemStyled>
);

export default ListItem;
