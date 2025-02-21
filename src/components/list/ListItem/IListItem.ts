import { ListItemProps as MuiListItemProps } from '@mui/material';
import { ListItemButtonProps } from '../ListItemButton/IListItemButton';

export interface ListItemProps extends MuiListItemProps {
  width?: string;
  disableHover?: boolean;
  btnProps?: ListItemButtonProps;
}
