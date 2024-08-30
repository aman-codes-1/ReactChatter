import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';
import { googleLogout } from '@react-oauth/google';
import { useAuth, useSocket } from '.';
import { apiRoutes } from '../helpers';

export const useApi = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { socket, setUser } = useSocket();
  const { auth, setAuth } = useAuth();

  const serverUri = `${process.env.REACT_APP_PROXY_URI}`;

  const logout = () => {
    if (socket) {
      socket.disconnect();
    }
    setUser?.();
    localStorage.removeItem('token');
    setAuth(undefined);
    navigate(pathname, { replace: true });
  };

  const callApi = async ({
    method = '',
    url = '',
    data = {},
    headers = {},
    baseURL = '',
    signal = undefined,
    responseType = '',
    withCredentials = false,
  }) => {
    const source = axios.CancelToken.source();
    const options = {
      method: method || 'GET',
      url,
      data,
      baseURL: baseURL || serverUri,
      headers,
      responseType,
      withCredentials,
      ...(signal ? { signal } : {}),
      cancelToken: source.token,
    } as AxiosRequestConfig;
    return new Promise((resolve, reject) => {
      axios(options)
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          if (err?.response?.status === 401) {
            logout();
          }
          reject(err);
        });
      setTimeout(() => {
        source.cancel();
      }, 40000);
    }) as any;
  };

  const callLogout = async () => {
    try {
      if (auth?.provider === 'google') {
        googleLogout();
      }
      await callApi({
        url: apiRoutes.AuthLogout,
        withCredentials: true,
      });
    } catch (err: any) {
      //
    } finally {
      logout();
    }
  };

  return { callApi, callLogout, logout };
};
