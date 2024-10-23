import { styled, keyframes } from '@mui/system';

const fadeIn = keyframes`
  0% {
    // opacity: 0;
    transform: scale(0.95);
  }
  100% {
    // opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  0% {
    // opacity: 1;
    transform: scale(1);
  }
  100% {
    // opacity: 0;
    transform: scale(1.05);
  }
`;

export const ChatsStyled = styled('div')<{
  navbarHeight: number;
  message: string;
  sideBarWidth: number;
}>(({ theme, navbarHeight, sideBarWidth, message }) => ({
  '.app-bar-wrapper': {
    position: 'fixed',
    width: `calc(100% - ${sideBarWidth || 0}px)`,
    top: 0,
    zIndex: 1,
  },
  '.app-bar': {
    backgroundColor: theme.palette.primary.light,
  },
  '.text-field-wrapper': {
    position: 'fixed',
    width: `calc(100% - ${sideBarWidth || 0}px)`,
    top: 'auto',
    bottom: 0,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      bottom: navbarHeight,
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
    borderRadius: '10px',
    backgroundColor: theme.palette.common.white,
    height: 44,
  },
}));

export const ChatGroupsStyled = styled('div')<{
  navbarHeight: number;
  appBarHeight: number;
  textFieldHeight: number;
}>(({ theme, navbarHeight, appBarHeight, textFieldHeight }) => ({
  '.chat-container': {
    display: 'flex',
    width: '100%',
    marginTop: `${appBarHeight}px`,
    overflow: 'auto',
    padding: '0rem 4rem',
    height: `calc(100svh - ${appBarHeight || 0}px - ${textFieldHeight || 0}px)`,
    [theme.breakpoints.down('md')]: {
      padding: '0rem 2rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0rem 1rem',
      height: `calc(100svh - ${appBarHeight || 0}px - ${textFieldHeight || 0}px - ${navbarHeight || 0}px)`,
    },
  },
  '.no-messages-wrapper': {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '.chat-wrapper': {
    width: '100%',
    marginTop: 'auto',
  },
  '.chat-grid': {
    display: 'grid',
    margin: '0.8rem 0rem 1.438rem 0rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0.8rem 0rem 1.063rem 0rem',
    },
  },
  '.chat-group': {
    '.date-label-wrapper': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '1.75rem 0rem 0.875rem 0rem',
    },
    '.date-label-chip': {
      height: 'auto',
      '& .MuiChip-label': {
        fontWeight: 500,
        display: 'block',
        whiteSpace: 'normal',
        textTransform: 'uppercase',
        fontSize: '0.725rem',
      },
    },
  },
  '.chat-group:nth-of-type(1)': {
    '.date-label-wrapper': {
      margin: '0.25rem 0rem 0.875rem 0rem',
    },
  },
  '.chat-group-grid': {
    margin: '7px 0rem',
  },
  '.chat-group-grid:nth-of-type(1)': {
    marginTop: 0,
  },
  '.chat-group-grid:nth-last-of-type(1)': {
    marginBottom: 0,
  },
}));

export const ChatBubbleStyled = styled('div')(({ theme }) => ({
  '.msg': {
    display: 'inline-block',
    maxWidth: '100%',
    padding: '8px 14px 10px 14px',
    borderRadius: 5,
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
    wordBreak: 'break-all',
    fontWeight: 470,
  },
  '.msg-content-left': {
    color: theme.palette.grey[900],
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
    top: '8px',
    marginBottom: '4px',
    marginLeft: '0.75rem',
    whiteSpace: 'nowrap',
  },
  '.msg-timestamp-overflow': {
    alignSelf: 'flex-end',
    top: 4,
    marginBottom: 0,
  },
  '.msg-timestamp-text-left': {
    color: theme.palette.grey[700],
  },
  '.msg-timestamp-text-right': {
    color: theme.palette.primary.contrastText,
  },
}));
