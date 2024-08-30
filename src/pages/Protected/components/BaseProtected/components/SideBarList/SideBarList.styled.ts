import { styled } from '@mui/system';

export const SideBarListStyled = styled('div')<{
  chats: any;
  otherFriends: any;
  toggleChats: boolean;
  toggleFriends: boolean;
  hasChatsScrollbar: boolean;
  hasFriendsScrollbar: boolean;
}>(
  ({
    theme,
    chats,
    otherFriends,
    toggleChats,
    toggleFriends,
    hasChatsScrollbar,
    hasFriendsScrollbar,
  }) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: '0rem 0.7rem',
    gap: '0.25rem',
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      margin: '0rem 0.25rem',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '1.2rem 0.25rem 0rem 0.25rem',
    },
    '.margin-bottom': {
      marginBottom: '0.8rem',
      cursor: 'default',
    },
    '.default-heading': {
      fontSize: '0.825rem',
      fontWeight: 700,
      color: theme.palette.grey[800],
    },
    '.heading': {
      fontSize: '1.25rem',
      fontWeight: 701,
    },
    '.chats-wrapper': {
      flex: chats?.length > 1 && toggleFriends ? '1 1 25rem' : '1 1 auto',
      overflow: 'auto',
      minHeight: '4.6rem',
      width: hasChatsScrollbar ? 'calc(100% - 2.25rem)' : '100%',
    },
    '.friends-wrapper': {
      flex: '0 1 auto',
      overflow: 'auto',
      minHeight: '4.6rem',
      width: hasFriendsScrollbar ? 'calc(100% - 2.12rem)' : '100%',
    },
    '.overview-wrapper': {
      flex: '0 0 auto',
      width: '100%',
    },
    '.list-item-icon': {
      marginRight: '1rem',
      padding: '0.17rem',
      fontSize: '1.28rem',
      color: theme.palette.grey[600],
      outline: `1px solid ${theme.palette.grey[600]}`,
      borderRadius: '7px',
    },
  }),
);
