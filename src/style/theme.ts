import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#007AFF',
      // main: '#0196DA',
      light: '#ecf7fc',
      dark: '#017ab2',
      contrastText: '#cef5ff',
    },
    secondary: {
      main: '#4F46E5',
      light: '#eae9fc',
      dark: '#251dc9',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#57AF47',
      contrastText: '#f5fff5',
      light: '#CCE8CD',
      dark: '#388e3c',
      900: '#2b702e',
    },
    error: {
      main: '#a94442',
      contrastText: '#f2dede',
      light: '#FEE2E2',
      dark: '#DC2626',
      900: '#bd2020',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    grey: {
      50: 'rgba(255, 255, 255, 0.4)',
      100: '#F9FAFB',
      200: '#f5f5f5',
      300: 'rgba(0, 0, 0, 0.12)',
      400: '#e8eaf6',
      500: '#e0e0e0',
      600: '#9B9BA3',
      700: '#667781',
      800: '#71717A',
      900: '#111B21',
    },
    text: {
      primary: '#111827',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0,0,0, 0.38)',
    },
    background: {
      default: '#FFFFFF',
    },
    action: {
      active: '#0F172B',
      hover: '#1E293B',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    allVariants: {
      letterSpacing: '0.025rem',
      textDecoration: 'none',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      WebkitTapHighlightColor: 'transparent',
      WebkitTouchCallout: 'none',
    },
    fontSize: 14,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 390,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
