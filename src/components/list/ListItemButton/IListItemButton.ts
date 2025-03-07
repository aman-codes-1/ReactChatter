import { ReactNode } from 'react';
import {
  AvatarProps as MuiAvatarProps,
  ListItemButtonProps as MuiListItemButtonProps,
  ListItemTextProps,
} from '@mui/material';

interface AvatarProps extends MuiAvatarProps {
  name?: string;
  loading?: boolean;
  badge?: any;
}

export interface ListItemButtonProps extends MuiListItemButtonProps {
  width?: string;
  height?: string;
  disableHover?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  avatarProps?: AvatarProps;
  textProps?: ListItemTextProps;
}
