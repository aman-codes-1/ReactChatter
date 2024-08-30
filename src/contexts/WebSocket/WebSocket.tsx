import { createContext, useLayoutEffect, useMemo, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { io } from 'socket.io-client';
import { useApi, useAuth } from '../../hooks';
import { createApolloClient } from './createApolloClient';

export const WebSocketContext = createContext<any>({});

export const WebSocketProvider = ({ children }: any) => {
  const [user, setUser] = useState();
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const { callLogout } = useApi();

  const client: any = useMemo(() => {
    if (auth?.isLoggedIn) {
      return createApolloClient(auth, callLogout);
    }
    return false;
  }, [auth?.isLoggedIn]);

  useLayoutEffect(() => {
    if (client) {
      const userOnlineStatus = (status: boolean) => ({
        ...client?.auth,
        isOnline: status,
      });
      setUser(userOnlineStatus(true));
      const onWindowBlur = () => {
        setUser(userOnlineStatus(false));
      };
      const onWindowFocus = () => {
        setUser(userOnlineStatus(true));
      };
      const onVisibilityChange = () => {
        const isTabVisible = document.visibilityState === 'visible';
        setUser(userOnlineStatus(isTabVisible));
      };
      document.addEventListener('visibilitychange', onVisibilityChange);
      window.addEventListener('blur', onWindowBlur);
      window.addEventListener('focus', onWindowFocus);
      return () => {
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.removeEventListener('blur', onWindowBlur);
        window.removeEventListener('focus', onWindowFocus);
      };
    }
    return () => {};
  }, [client]);

  useLayoutEffect(() => {
    let socketInstance: any = null;

    const initializeSocket = async () => {
      const serverUri = `${process.env.REACT_APP_PROXY_URI}`;
      socketInstance = io(serverUri, {
        auth: user,
        transports: ['websocket'],
      });
      const socketPromise = new Promise((resolve, reject) => {
        socketInstance.once('connect', () => {
          resolve(socketInstance);
        });
        socketInstance.once('connect_error', (error: any) => {
          reject(error);
        });
      });
      try {
        await socketPromise;
        setSocket(socketInstance);
      } catch (err) {
        setSocket(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      initializeSocket();
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [user]);

  return (
    <WebSocketContext.Provider
      value={{ socket, setUser, isLoading, setIsLoading }}
    >
      {client ? (
        <ApolloProvider client={client?.client}>{children}</ApolloProvider>
      ) : (
        children
      )}
    </WebSocketContext.Provider>
  );
};
