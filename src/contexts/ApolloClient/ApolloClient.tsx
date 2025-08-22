import { createContext, useMemo, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApi, useAuth } from '../../hooks';
import { createApolloClient } from './createApolloClient';

export const ApolloClientContext = createContext<any>({});

export const ApolloClientProvider = ({ children }: any) => {
  const [isWsConnecting, setIsWsConnecting] = useState(true);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [isWsError, setIsWsError] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const { auth } = useAuth();
  const { callLogout } = useApi();

  const client: any = useMemo(
    () =>
      createApolloClient(
        callLogout,
        setIsWsConnecting,
        setIsWsConnected,
        setIsWsError,
        setIsNetworkError,
      ),
    [auth?.isLoggedIn],
  );

  return (
    <ApolloClientContext.Provider
      value={{
        isWsConnecting,
        setIsWsConnecting,
        isWsConnected,
        setIsWsConnected,
        isWsError,
        setIsWsError,
        isNetworkError,
        setIsNetworkError,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloClientContext.Provider>
  );
};
