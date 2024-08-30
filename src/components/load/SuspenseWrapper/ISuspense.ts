import { ReactNode } from 'react';

export interface SuspenseWrapperProps {
  path: string;
  compName: string;
  fallback?: ReactNode;
  key?: any;
  isLoading?: boolean;
}
