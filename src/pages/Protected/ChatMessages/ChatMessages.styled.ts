import { styled } from '@mui/system';

export const ChatMessagesStyled = styled('div')<{
  navbarHeight: number;
  appBarHeight: number;
  textFieldHeight: number;
  IsNoMessages: boolean;
}>(({ theme, navbarHeight, appBarHeight, textFieldHeight, IsNoMessages }) => ({
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
    height: `calc(100svh - ${appBarHeight || 0}px - ${textFieldHeight || 0}px - ${IsNoMessages ? '0rem' : '1.45rem'})`,
    [theme.breakpoints.down('md')]: {
      padding: '0rem 1.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0rem 1rem',
      height: `calc(100svh - ${appBarHeight || 0}px - ${textFieldHeight || 0}px - ${navbarHeight || 0}px - ${IsNoMessages ? '0rem' : '1.15rem'})`,
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
  '.msg': {
    display: 'inline-flex',
    padding: '6px 14px',
    borderRadius: 4,
    marginTop: 5,
    wordBreak: 'break-word',
  },
  '.leftRow': {
    textAlign: 'left',
  },
  '.rightRow': {
    textAlign: 'right',
  },
  '.left': {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: theme.palette.grey[100],
  },
  '.right': {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  '.leftFirst': {
    borderTopLeftRadius: 20,
  },
  '.rightFirst': {
    borderTopRightRadius: 20,
  },
  '.leftLast': {
    borderBottomLeftRadius: 20,
  },
  '.rightLast': {
    borderBottomRightRadius: 20,
  },
  '.text-field-wrapper': {
    position: 'fixed',
    width: 'stretch',
    top: 'auto',
    bottom: 0,
    zIndex: 1000,
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
