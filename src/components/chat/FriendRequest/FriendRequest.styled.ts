import { styled } from '@mui/material';

export const FriendRequestStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isConfirmBtn' && prop !== 'maxHeight',
})<{
  isConfirmBtn?: boolean;
  maxHeight?: string;
}>(({ theme, isConfirmBtn, maxHeight }) => ({
  overflow: 'auto',
  '.friend-request-list': {
    width: '100%',
    maxWidth: '400px',
    height: '100%',
    overflow: 'auto',
    paddingRight: '2rem',
    ...(maxHeight ? { maxHeight } : {}),
    '@media(min-width: 600px) and (max-width: 769px), (min-width: 0px) and (max-width: 445px)':
      {
        padding: 0,
      },
  },
  '.friend-request-list-item': {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '6px',
    margin: '1rem 0rem',
  },
  '.friend-request-list-item:nth-of-type(1)': {
    marginTop: 0,
  },
  '.friend-request-list-item:nth-last-of-type(1)': {
    marginBottom: 0,
  },
  '.friend-request-list-item-btn': {
    gap: '1rem',
    [theme.breakpoints.between('sm', 'md')]: {
      gap: '0.6875rem',
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      gap: '0.375rem',
    },
    [theme.breakpoints.down('xs')]: {
      gap: '0rem',
    },
  },
  '.friend-request-avatar': {
    fontSize: '1.75rem',
    width: '55px !important',
    height: '55px !important',
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '1.625rem',
      width: '50px !important',
      height: '50px !important',
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '1.5rem',
      width: '45px !important',
      height: '45px !important',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem',
      width: '40px !important',
      height: '40px !important',
    },
  },
  '.friend-request-action-btn-wrapper': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.25rem 1rem 0.5rem 1rem',
    marginLeft: 'auto',
    ...(isConfirmBtn
      ? {
          '@media(min-width: 600px) and (max-width: 769px), (min-width: 0px) and (max-width: 445px)':
            {
              width: '100%',
              margin: 0,
            },
        }
      : {
          '@media(min-width: 600px) and (max-width: 679px), (min-width: 0px) and (max-width: 347px)':
            {
              width: '100%',
              margin: 0,
            },
        }),
    '@media(min-width: 0px) and (max-width: 294px)': {
      flexDirection: 'column',
    },
  },
}));
