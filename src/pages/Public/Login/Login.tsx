import { useLayoutEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Typography } from '@mui/material';
import { useAuth, useSnackbar } from '../../../hooks';
import { LoginStyled } from './Login.styled';

const Login = () => {
  const location = useLocation();
  const from: string =
    (location?.state?.from?.pathname === '/login'
      ? '/'
      : location?.state?.from?.pathname) || '/';
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { openSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    const googleLogin = async () => {
      const decoded = jwtDecode(token || '');
      localStorage.setItem('token', token || '');
      setAuth({
        isLoggedIn: true,
        ...decoded,
      });
      navigate('/', { replace: true });
    };

    if (token) {
      googleLogin();
    }
  }, [token, navigate]);

  const serverUri = `${process.env.REACT_APP_PROXY_URI}`;

  const handleLogin = async () => {
    try {
      window.open(
        `${serverUri}/api/auth/google/login/${from.replaceAll('/', '@')}`,
        '_self',
      );
    } catch (err) {
      openSnackbar({
        message: JSON.stringify(err || ''),
        type: 'error',
      });
    }
  };

  return (
    <LoginStyled>
      <Typography className="sign-in-heading" fontWeight={700}>
        Sign in to your account
      </Typography>
      <GoogleLogin
        ux_mode="redirect"
        shape="pill"
        click_listener={handleLogin}
        onSuccess={() => {}}
      />
    </LoginStyled>
  );
};

export default Login;
