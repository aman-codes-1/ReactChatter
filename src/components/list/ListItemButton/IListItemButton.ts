import { ReactNode } from 'react';
import {
  AvatarProps,
  ListItemButtonProps as MuiListItemButtonProps,
  ListItemTextProps,
} from '@mui/material';

export interface ListItemButtonProps extends MuiListItemButtonProps {
  width?: string;
  height?: string;
  disableHover?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  avatarProps?: AvatarProps;
  textProps?: ListItemTextProps;
}
