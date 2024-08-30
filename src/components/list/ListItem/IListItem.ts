import {
  ListItemProps as MuiListItemProps,
  ListItemTextProps,
} from '@mui/material';
import { ListItemButtonProps } from '../ListItemButton/IListItemButton';

export interface ListItemProps extends MuiListItemProps {
  width?: string;
  disableHover?: boolean;
  wrapperClassName?: string;
  btnProps?: ListItemButtonProps;
}
