import { createContext, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { io } from 'socket.io-client';
import { useAuth } from '../../hooks';
import { createApolloClient } from './createApolloClient';

export const WebSocketContext = createContext<any>({});

export const WebSocketProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [socket, setSocket] = useState<any>(null);
  const { auth = {}, setAuth } = useAuth();

  const client: any = useMemo(() => {
    if (auth?.isLoggedIn) {
      return createApolloClient(auth, setAuth, navigate, socket);
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
    if (user) {
      const socketUrl =
        process.env.NODE_ENV === 'development'
          ? `http://${process.env.REACT_APP_CLIENT_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}`
          : `${process.env.REACT_APP_SERVER_URI}`;
      const Socket = io(socketUrl, {
        auth: user,
      });
      const initializeSocket = async () => {
        const socketPromise = new Promise((resolve, reject) => {
          Socket.once('connect', () => {
            resolve(Socket);
          });
          Socket.once('connect_error', (error) => {
            reject(error);
          });
        });
        try {
          const asyncSocket = await socketPromise;
          setSocket(asyncSocket);
        } catch (error) {
          //
        }
      };
      initializeSocket();
      return () => {
        if (Socket) {
          Socket.disconnect();
        }
      };
    }
    return () => {};
  }, [user]);

  return (
    <WebSocketContext.Provider value={{ socket, setUser }}>
      {client ? (
        <ApolloProvider client={client?.client}>{children}</ApolloProvider>
      ) : (
        children
      )}
    </WebSocketContext.Provider>
  );
};