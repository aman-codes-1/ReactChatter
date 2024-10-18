import { styled } from '@mui/system';

export const FriendRequestStyled = styled('div')<{
  isConfirmBtn: boolean;
}>(({ theme, isConfirmBtn }) => ({
  '.friend-request-loader': {
    gap: '1.2rem',
    [theme.breakpoints.down('md')]: {
      gap: '0.4rem',
    },
    [theme.breakpoints.down('xs')]: {
      gap: '0rem',
    },
  },
  '.friend-request-loader-avatar': {
    width: 55,
    height: 55,
    [theme.breakpoints.down('md')]: {
      width: 45,
      height: 45,
    },
    [theme.breakpoints.down('xs')]: {
      width: 40,
      height: 40,
    },
  },
  '.friend-request-list-wrapper': {
    overflow: 'auto',
  },
  '.friend-request-list': {
    width: '400px',
    maxWidth: '100%',
  },
  '.friend-request-list-item-btn': {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: '8px',
    '.MuiButtonBase-root': {
      gap: '1.2rem',
      [theme.breakpoints.down('md')]: {
        gap: '0.4rem',
      },
      [theme.breakpoints.down('xs')]: {
        gap: '0rem',
      },
    },
  },
  '.friend-request-avatar': {
    '.MuiAvatar-root': {
      fontSize: '1rem',
      width: 55,
      height: 55,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.5rem',
        width: 45,
        height: 45,
      },
      [theme.breakpoints.down('xs')]: {
        width: 40,
        height: 40,
      },
    },
  },
  '.friend-request-action-btn-wrapper': {
    marginTop: '0.85rem',
    display: 'flex',
    justifyContent: isConfirmBtn ? 'space-between' : 'flex-end',
    gap: '1rem',
    '@media(min-width: 600px) and (max-width: 735px)': {
      flexDirection: 'column',
    },
    '@media(min-width: 0px) and (max-width: 425px)': {
      flexDirection: 'column',
    },
  },
  '.friend-request-text-wrapper': {
    margin: '0.7rem 0rem',
    [theme.breakpoints.down('md')]: {
      margin: '0.42rem 0rem',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0.25rem 0rem',
    },
  },
}));
