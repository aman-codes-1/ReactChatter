import { ReactNode } from 'react';

export type MainLayoutProps = {
  heading?: string;
  defaultText?: string;
  loading?: boolean;
  loaderProps?: any;
  disableLoader?: boolean;
  data?: any;
  error?: string;
  onlyChildren?: boolean;
  children?: ReactNode;
};
