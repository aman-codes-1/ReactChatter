import { ReactNode } from 'react';
import {
  AvatarProps,
  ListItemButtonProps as MuiListItemButtonProps,
  ListItemTextProps as MuiListItemTextProps,
} from '@mui/material';

type TextStyles = {
  marginTop?: string;
  fontSize?: string;
  fontWeight?: number;
  ellipsesLineClamp?: number;
};

type StyleProps = {
  primary?: TextStyles;
  secondary?: TextStyles;
};

interface ListItemTextProps extends MuiListItemTextProps {
  styleProps?: StyleProps;
}

export interface ListItemButtonProps extends MuiListItemButtonProps {
  width?: string;
  height?: string;
  disableHover?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  wrapperClassName?: string;
  avatarProps?: AvatarProps;
  textProps?: ListItemTextProps;
}
