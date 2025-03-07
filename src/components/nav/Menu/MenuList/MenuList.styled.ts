import { styled } from '@mui/material';

export const MenuListStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    marginTop: '1rem',
  },
  '.default-heading': {
    fontSize: '0.875rem',
    fontWeight: 700,
  },
  '.heading': {
    fontSize: '1.375rem',
    fontWeight: 800,
  },
  '.flex-list-item': {
    flex: '0 10 auto',
  },
  '.flex-list-item:nth-of-type(1)': {
    flex: '0 1 auto',
  },
  '.flex-list-item:nth-last-of-type(1)': {
    flex: '0 0 auto',
  },
  '.margin-bottom': {
    marginBottom: '1rem',
    cursor: 'default',
  },
  '.list-item-icon': {
    padding: '0.17rem',
    fontSize: '1.25rem',
    color: theme.palette.text.secondary,
    outline: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: '6px',
  },
}));
