import { styled } from '@mui/system';

export const SideBarStyled = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '20rem',
  height: '100vh',
  borderRight: '1px solid #E5E7EB',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  '.sidebar-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '20rem',
    height: '100%',
    '.sidebar-menu-wrapper': {
      padding: '0rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      maxWidth: '17rem',
      height: '100%',
      gap: '1.45rem',
      '.your-chats-menu-wrapper': {
        width: '100%',
        '.your-chats-chat-wrapper': {
          width: '100%',
          paddingTop: '1.35rem',
        },
      },
      '.overview-menu-wrapper': {
        width: '100%',
        paddingTop: '0.5rem',
        '.overview-nav-link-wrapper': {
          width: '100%',
          paddingTop: '0.5rem',
        },
      },
      '.sidebar-heading': {
        fontSize: '0.75rem',
        color: theme.palette.grey[600],
      },
    },
  },
  '.list-item-icon': {
    color: '#9CA3AF',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
  },
}));
