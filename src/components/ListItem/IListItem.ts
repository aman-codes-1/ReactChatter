import { ReactNode } from 'react';
import { ListItemButtonProps } from '@mui/material';

export type ListItemProps = {
  listItemIcon?: ReactNode;
  primaryText?: string;
  secondaryText?: string;
  padding?: string;
  disableHover?: boolean;
  disabled?: boolean;
  secondaryAction?: ReactNode;
  dense?: boolean;
  selected?: boolean;
  onClick?: ListItemButtonProps['onClick'];
  btnSx?: ListItemButtonProps['sx'];
  children?: ReactNode;
};
