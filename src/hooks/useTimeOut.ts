/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';

export const useTimeout = (callback: any, delay: any) => {
  const [isTimeoutRunning, setIsTimeoutRunning] = useState(false);

  useEffect(() => {
    if (isTimeoutRunning) {
      const timeout = setTimeout(callback, delay);
      return () => clearTimeout(timeout);
    }
  }, [isTimeoutRunning, delay, callback]);

  return [isTimeoutRunning, setIsTimeoutRunning] as any;
};