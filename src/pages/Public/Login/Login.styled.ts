import { styled } from '@mui/system';

export const LoginStyled = styled('div')(({ theme }) => ({
  marginTop: 124,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '0px 30px',
  },
  '.sign-in-heading': {
    fontSize: '1.875rem',
    marginBottom: '30px',
    textAlign: 'center',
  },
}));
