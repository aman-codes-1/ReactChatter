import { styled } from '@mui/system';

export const SideBarListStyled = styled('div')<{ chats: any }>(
  ({ theme, chats }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    overflow: 'auto',
    margin: '0rem 1rem',
    [theme.breakpoints.down('sm')]: {
      margin: '1.25rem 0.6rem 0rem 0.6rem',
    },
    '.margin-bottom': {
      marginBottom: '1rem',
      cursor: 'default',
    },
    '.default-heading': {
      fontSize: '0.825rem',
      fontWeight: 700,
      color: theme.palette.grey[800],
    },
    '.heading': {
      fontSize: '1.25rem',
      fontWeight: 800,
    },
    '.chats-wrapper': {
      flex: '1 1 auto',
      overflow: 'auto',
      minHeight: '4.6rem',
    },
    '.chats-wrapper:nth-of-type(1)': {
      flex: chats?.length > 1 ? '0 0 9.15rem' : '1 1 auto',
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
      fontSize: '1.25rem',
      color: theme.palette.grey[600],
      outline: `1px solid ${theme.palette.grey[600]}`,
      borderRadius: '6px',
    },
  }),
);
