import { styled } from '@mui/material';

export const AddFriendStyled = styled('div')(({ theme }) => ({
  '.add-friend-email-wrapper': {
    marginTop: '0.625rem',
    display: 'flex',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    '@media(min-width: 600px) and (max-width: 735px), (min-width: 0px) and (max-width: 415px)':
      {
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: '0.9rem',
      },
    '.add-friend-text-field-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      width: '100%',
      '.add-friend-email-input': {
        width: '100%',
      },
      '.add-friend-email-input-props': {
        fontWeight: 600,
      },
    },
    '.add-friend-email-btn-wrapper': {
      width: '100%',
      flex: '1',
      '.add-friend-email-btn': {
        height: '2.475rem',
        textTransform: 'none',
        fontSize: '0.875rem',
        fontWeight: 700,
        color: theme.palette.common.white,
        '@media(min-width: 600px) and (max-width: 735px), (min-width: 0px) and (max-width: 415px)':
          { width: '100%' },
      },
    },
    '.add-btn-active': {
      backgroundColor: `${theme.palette.action.active} !important`,
    },
  },
}));
