import { ReactNode } from 'react';

export type MainLayoutProps = {
  heading?: string;
  description?: string;
  disableDescription?: boolean;
  loading?: boolean;
  loadingProps?: any;
  loadingData?: boolean;
  loadingDataProps?: any;
  data?: any;
  error?: string;
  disablePadding?: boolean;
  onError?: () => void;
  className?: string;
  children?: ReactNode;
};
