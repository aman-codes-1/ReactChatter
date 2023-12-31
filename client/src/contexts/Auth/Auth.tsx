import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { AuthProviderProps, Context } from './IAuth';
import { Loader } from '../../components';
import { SnackbarContext } from '../Snackbar';
import { Authentication } from '../../libs';

export const AuthContext = createContext<Context>({
  auth: {},
  setAuth: () => null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authentication = new Authentication();
  const navigate = useNavigate();
  const [auth, setAuth] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const isGoogle = Boolean(localStorage.getItem('isGoogle'));
  const { openSnackbar } = useContext(SnackbarContext);

  const verifyLogin = async () => {
    setIsLoading(true);
    try {
      const { data }: any = await authentication.googleVerifyToken();
      setAuth({
        isLoggedIn: true,
        ...data?.data,
      });
      setIsLoading(false);
    } catch (err: any) {
      googleLogout();
      localStorage.removeItem('isGoogle');
      setAuth(undefined);
      navigate('/', { replace: true });
      openSnackbar({
        message: err?.response?.data?.message,
        type: 'error',
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!auth && isGoogle === true) {
      verifyLogin();
    } else {
      setIsLoading(false);
    }
  }, [auth, isGoogle]);

  if (isLoading) {
    return <Loader center />;
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
