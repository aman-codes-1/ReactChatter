import { styled } from '@mui/system';

export const SideBarListStyled = styled('div')<{
  chats: any;
  toggleFriends: boolean;
}>(({ theme, chats, toggleFriends }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  overflow: 'auto',
  margin: '0rem 1rem',
  [theme.breakpoints.down('sm')]: {
    margin: '1.25rem 0.6rem 0rem 0.6rem',
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
  },
  '.friends-wrapper': {
    flex: '0 1 auto',
    overflow: 'auto',
    minHeight: '4.6rem',
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
}));
