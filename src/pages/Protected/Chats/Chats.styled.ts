import { AppBar, styled, keyframes } from '@mui/material';

const fadeIn = keyframes`
  0% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
`;

export const ChatsStyled = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'navBarHeight' && prop !== 'menuWidth' && prop !== 'message',
})<{
  navBarHeight: number;
  menuWidth: number;
  message: string;
}>(({ theme, navBarHeight, menuWidth, message }) => ({
  '.chats-main-layout-error': {
    marginTop: '0.6875rem',
  },
  '.top-app-bar-wrapper': {
    position: 'fixed',
    width: `calc(100% - ${menuWidth || 0}px)`,
    top: 0,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  '.app-bar': {
    minHeight: '4.3rem',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.light,
  },
  '.top-app-bar-tool-bar': {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 5,
    },
  },
  '.top-app-bar': {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      gap: '0.75rem',
    },
  },
  '.top-app-bar-back-btn': {
    marginLeft: '0.25rem',
  },
  '.text-field-app-bar-wrapper': {
    position: 'fixed',
    width: `calc(100% - ${menuWidth || 0}px)`,
    top: 'auto',
    bottom: 0,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      bottom: navBarHeight,
    },
  },
  '.text-field-app-bar': {
    padding: message ? '0.875rem 0.875rem 0.875rem 4rem' : '0.875rem 4rem',
    [theme.breakpoints.down('md')]: {
      padding: '0.875rem 2rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0.875rem 1rem',
    },
  },
  '.text-field-input-wrapper': {
    display: 'flex',
    gap: '0.625rem',
    alignItems: 'center',
    width: '100%',
  },
  '.text-field-input': {
    borderRadius: '6px',
    backgroundColor: theme.palette.common.white,
    height: 44,
  },
}));

export const ChatDrawerStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '.chat-drawer-heading-wrapper': {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    padding: '0rem 1rem',
    backgroundColor: theme.palette.common.white,
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
    },
  },
  '.chat-drawer-heading': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '4.3rem',
    textAlign: 'center',
  },
  '.chat-drawer-msg-wrapper': {
    margin: '-0.25rem 1.125rem 1rem 1.125rem',
  },
  '.chat-drawer-details-wrapper': {
    backgroundColor: theme.palette.primary.light,
    flex: 'auto',
    overflow: 'auto',
  },
  '.chat-drawer-details-box': {
    backgroundColor: theme.palette.common.white,
    margin: '1rem 1.125rem',
    borderRadius: '12px',
  },
  '.chat-drawer-details': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.875rem',
    padding: '1.25rem 1.5rem',
  },
  '.chat-drawer-details-item': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
  },
  '.chat-drawer-details-item-2': {
    '@media(min-width: 0px) and (max-width: 290px)': {
      flexDirection: 'column',
      alignItems: 'unset',
    },
  },
  '.chat-drawer-details-heading': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '@media(min-width: 0px) and (max-width: 290px)': {
      wordBreak: 'break-word',
    },
  },
  '.chat-drawer-details-content': {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
    gap: '0.375rem',
    wordBreak: 'break-word',
    '@media(min-width: 291px) and (max-width: 899px)': {
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '0.125rem',
    },
  },
  '.chat-drawer-content-date': {
    fontSize: '13.5px',
    color: theme.palette.text.secondary,
    textAlign: 'right',
  },
  '.chat-drawer-content-time': {
    fontSize: '14.5px',
    textAlign: 'right',
  },
}));

export const ChatGroupsStyled = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'navBarHeight' &&
    prop !== 'appBarHeight' &&
    prop !== 'textFieldHeight',
})<{
  navBarHeight: number;
  appBarHeight: number;
  textFieldHeight: number;
}>(({ theme, navBarHeight, appBarHeight, textFieldHeight }) => ({
  '.chat-container': {
    width: '100%',
    marginTop: `${appBarHeight || 0}px`,
    overflow: 'auto',
    padding: '0rem 4rem',
    height: `calc(100dvh - ${appBarHeight || 0}px - ${textFieldHeight || 0}px)`,
    [theme.breakpoints.down('md')]: {
      padding: '0rem 2rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0rem 1rem',
      height: `calc(100dvh - ${appBarHeight || 0}px - ${textFieldHeight || 0}px - ${navBarHeight || 0}px)`,
    },
  },
  '.no-messages-wrapper': {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '.chat-viewport': {
    marginBottom: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.125rem',
    },
  },
}));

export const ChatMessageStyled = styled('div')(() => ({
  '.chat-wrapper': {
    padding: '0.15rem 0rem',
  },
  '.chat-wrapper-date-label': {
    padding: '1.625rem 0rem 0.15rem 0rem',
  },
  '.chat-wrapper-first': {
    paddingTop: '0 !important',
  },
  '.chat-wrapper-last': {
    paddingBottom: '0 !important',
  },
  '.chat-margin-top': {
    paddingTop: '1rem !important',
  },
  '.chat-margin-bottom': {
    paddingBottom: '1rem !important',
  },
  '.chat-msg': {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '0.625rem',
  },
  '.date-label-wrapper': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  '.date-label-chip': {
    borderRadius: '8px',
    '& .MuiChip-label': {
      fontWeight: 500,
      display: 'block',
      whiteSpace: 'normal',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
    },
  },
}));

export const ChatBubbleStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'side' && prop !== 'isClickDisabled',
})<{
  side: string;
  isClickDisabled: boolean;
}>(({ theme, side, isClickDisabled }) => ({
  display: 'flex',
  gap: '0.4rem',
  justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
  width: '80%',
  marginLeft: side === 'right' ? 'auto' : '',
  alignItems: 'center',
  '.msg': {
    display: 'inline-block',
    maxWidth: '100%',
    padding: '8px 14px 10px 14px',
    borderRadius: '5px',
    textAlign: 'left',
    position: 'relative',
    wordBreak: 'break-all',
  },
  '.msg-overflow': {
    display: 'flex',
    flexDirection: 'column',
  },
  '.msg-animation': {
    transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
    animation: `${fadeIn} 0.5s ease-in-out`,
    '&.fade-out': {
      animation: `${fadeOut} 0.5s ease-in-out`,
    },
  },
  '.msg-left': {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: theme.palette.grey[200],
  },
  '.msg-right': {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: theme.palette.primary.main,
    ...(!isClickDisabled
      ? {
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            cursor: 'pointer',
            userSelect: 'none',
          },
        }
      : {}),
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
    wordBreak: 'break-all',
    fontSize: '0.938rem',
  },
  '.msg-content-left': {
    color: theme.palette.text.primary,
  },
  '.msg-content-right': {
    color: theme.palette.common.white,
  },
  '.msg-timestamp': {
    display: 'flex',
    gap: '0.25rem',
    alignItems: 'center',
    position: 'relative',
    float: 'right',
    top: '10px',
    marginBottom: '4px',
    marginLeft: '0.75rem',
    whiteSpace: 'nowrap',
  },
  '.msg-timestamp-overflow': {
    alignSelf: 'flex-end',
    top: 4,
    marginBottom: 0,
  },
  '.msg-timestamp-text': {
    fontSize: '0.688rem',
  },
  '.msg-timestamp-text-left': {
    color: theme.palette.text.secondary,
  },
  '.msg-timestamp-text-right': {
    color: theme.palette.grey[300],
  },
}));

export const ChatsMainStyled = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<{
  open: boolean;
  drawerWidth: number;
}>(({ theme, drawerWidth }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: `-${drawerWidth || 0}px`,
  position: 'relative',
  variants: [
    {
      props: ({ open }: { open: boolean }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      },
    },
  ],
}));

export const ChatsAppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<{
  open: boolean;
  drawerWidth: number;
}>(({ theme, drawerWidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }: { open: boolean }) => open,
      style: {
        width: `calc(100% - ${drawerWidth || 0}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: `-${drawerWidth || 0}px`,
      },
    },
  ],
}));
