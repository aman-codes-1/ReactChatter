import { styled } from '@mui/system';

export const ChatMessagesStyled = styled('div')<{
  navbarHeight?: number;
  textFieldHeight?: number;
  appBarHeight?: number;
  messageQueue?: any;
}>(({ theme, navbarHeight, appBarHeight, textFieldHeight, messageQueue }) => ({
  '.app-bar-wrapper': {
    position: 'fixed',
    width: 'stretch',
    top: 0,
  },
  '.app-bar': {
    backgroundColor: theme.palette.primary.light,
  },
  '.chat-container': {
    display: 'flex',
    width: '100%',
    marginTop: `${appBarHeight}px`,
    overflow: 'auto',
    padding: '0rem 2.5rem',
    height: `calc(100svh - ${appBarHeight || 0}px - ${textFieldHeight || 0}px)`,
    [theme.breakpoints.down('md')]: {
      padding: '0rem 1.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0rem 1rem',
      height: `calc(100svh - ${appBarHeight || 0}px - ${textFieldHeight || 0}px - ${navbarHeight || 0}px)`,
    },
  },
  '.chat-wrapper': {
    width: '100%',
    marginTop: 'auto',
  },
  '.no-messages-wrapper': {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '.msg-grid': {
    margin: '8px 0px 13px 0px',
    [theme.breakpoints.down('sm')]: {
      margin: '8px 0px 11px 0px',
    },
  },
  '.msg-left-row': {
    textAlign: 'left',
    margin: '3.5px 0px',
  },
  '.msg-right-row': {
    textAlign: 'right',
    margin: '3.5px 0px',
  },
  '.msg-left-row:nth-child(1)': {
    marginTop: 0,
  },
  '.msg-right-row:nth-child(1)': {
    marginTop: 0,
  },
  '.msg': {
    display: 'inline-flex',
    position: 'relative',
    padding: '8px 14px 11px 14px',
    borderRadius: 4,
  },
  '.msg-left': {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: theme.palette.grey[100],
  },
  '.msg-right': {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  '.msg-left-first': {
    borderTopLeftRadius: 16,
  },
  '.msg-right-first': {
    borderTopRightRadius: 16,
  },
  '.msg-left-last': {
    borderBottomLeftRadius: 16,
  },
  '.msg-right-last': {
    borderBottomRightRadius: 16,
  },
  '.msg-content': {
    position: 'relative',
    display: 'inline-block',
    fontWeight: 470,
    color: theme.palette.common.white,
  },
  '.msg-content::after': {
    content: '""',
    display: 'inline-block',
    width: '85px',
  },
  '.msg-timestamp': {
    position: 'absolute',
    right: '10px',
    bottom: '5px',
    display: 'flex',
    gap: '0.25rem',
    alignItems: 'center',
  },
  '.msg-timestamp-text': {
    color: theme.palette.primary.contrastText,
  },
  '.text-field-wrapper': {
    position: 'fixed',
    width: 'stretch',
    top: 'auto',
    bottom: 0,
    [theme.breakpoints.down('sm')]: {
      bottom: navbarHeight,
    },
  },
  '.text-field-app-bar': {
    padding: '1.28rem 2.5rem',
    [theme.breakpoints.down('md')]: {
      padding: '1.28rem 1.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
  },
  '.text-field-input-wrapper': {
    display: 'flex',
    gap: '0.7rem',
    alignItems: 'center',
    width: '100%',
  },
  '.text-field-input': {
    borderRadius: '10px',
    backgroundColor: theme.palette.common.white,
    height: 44,
  },
}));
