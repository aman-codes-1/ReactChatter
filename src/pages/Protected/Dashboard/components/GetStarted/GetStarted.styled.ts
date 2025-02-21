import { styled } from '@mui/material';

export const GetStartedStyled = styled('div')(({ theme }) => ({
  '.get-started-wrapper': {
    maxWidth: '424px',
    overflow: 'auto',
  },
  '.get-started-btn-wrapper': {
    display: 'flex',
    gap: '0.5rem',
    margin: '1rem 0rem',
    width: '100%',
    '@media(min-width: 0px) and (max-width: 294px)': {
      flexDirection: 'column',
    },
  },
  '.get-started-btn': {
    '@media(min-width: 0px) and (max-width: 294px)': {
      width: '100%',
    },
  },
  '.get-started-back-btn': {
    '@media(min-width: 0px) and (max-width: 294px)': {
      width: '100%',
    },
  },
  '.get-started-add-friend-main-layout': {
    height: 'auto',
    padding: 0,
  },
  '.get-started-margin-top': {
    marginTop: '10px',
  },
  '.get-started-email-heading': {
    fontSize: '0.875rem',
    fontWeight: 500,
    margin: 0,
  },
  '.get-started-email-copy-wrapper': {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '370px',
    marginTop: '0.4375rem',
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '6px',
    position: 'relative',
  },
  '.get-started-email-wrapper': {
    margin: 0,
    fontSize: '0.9375rem',
    padding: '0.875rem',
    paddingRight: '3.375rem',
    overflowX: 'auto',
    '&::before': {
      content: '""',
      display: 'inline-block',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      margin: '1rem 0rem',
      padding: '0rem 0.375rem',
      backgroundColor: theme.palette.grey[100],
    },
    '&::after': {
      content: '""',
      display: 'inline-block',
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      margin: '1rem 0rem',
      padding: '0rem 1.5rem',
      backgroundColor: theme.palette.grey[100],
    },
  },
  '.get-started-email-copied-icon': {
    position: 'absolute',
    right: 8,
    color: theme.palette.success.light,
  },
  '.get-started-email-copy-btn': {
    position: 'absolute',
    right: 8,
    borderRadius: '6px',
  },
  '.get-started-no-friends-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.125rem',
    padding: '0.5rem 1rem 1rem 1rem',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '6px',
    userSelect: 'none',
    cursor: 'default',
  },
  '.get-started-no-friends-icon': {
    fontSize: '2rem',
  },
  '.get-started-alert': {
    marginTop: '10px',
    borderRadius: '6px',
  },
}));
