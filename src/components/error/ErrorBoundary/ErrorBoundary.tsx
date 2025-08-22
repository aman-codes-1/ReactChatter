import { useState, useLayoutEffect } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ReactErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div style={{ padding: '20px', color: 'red', backgroundColor: '#ffe6e6' }}>
    <h2>Something went wrong in a React component!</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

const ErrorBoundary = ({ children }: any) => {
  const [globalError, setGlobalError] = useState<any>(null);

  useLayoutEffect(() => {
    const handleGlobalError = (
      message: any,
      source: any,
      lineno: any,
      colno: any,
    ) => {
      setGlobalError({ message, source, lineno, colno });
    };

    const handlePromiseRejection = (event: any) => {
      setGlobalError({
        message: event?.reason?.toString?.(),
        source: 'Promise',
        lineno: 0,
        colno: 0,
      });
    };

    window.onerror = handleGlobalError;
    window.onunhandledrejection = handlePromiseRejection;

    return () => {
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, []);

  if (globalError) {
    return (
      <div
        style={{ padding: '20px', color: 'red', backgroundColor: '#ffe6e6' }}
      >
        <h2>Error Detected!</h2>
        <p>{globalError?.message}</p>
        <p>
          Source: {globalError?.source} | Line: {globalError?.lineno}, Column:{' '}
          {globalError?.colno}
        </p>
        <button onClick={() => setGlobalError(null)}>Dismiss</button>
      </div>
    );
  }

  return (
    <ReactErrorBoundary FallbackComponent={ReactErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
