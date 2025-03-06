import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ecf7fc',
      main: '#007aff',
      dark: '#0056b3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#eae9fc',
      main: '#4F46E5',
      dark: '#251dc9',
    },
    info: {
      light: '#03a9f4',
      main: '#0288d1',
      dark: '#01579b',
      contrastText: '#CCFFDD',
    },
    warning: {
      light: '#ff9800',
      main: '#ed6c02',
      dark: '#e65100',
      contrastText: '#FFFFFF',
    },
    success: {
      light: '#22c55e',
      main: '#2e7d32',
      dark: '#1b5e20',
      contrastText: '#f5fff5',
    },
    error: {
      light: '#ef5350',
      main: '#d32f2f',
      dark: '#c62828',
      contrastText: '#f2dede',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    grey: {
      50: 'rgba(255, 255, 255, 0.4)',
      100: '#F9FAFB',
      200: '#f5f5f5',
      300: '#e8eaf6',
      400: 'rgba(0, 0, 0, 0.12)',
      500: '#dbdcdc',
      600: '#9B9BA3',
      700: '#667781',
      800: '#71717A',
      900: '#111B21',
    },
    text: {
      primary: '#111827',
      secondary: '#667781',
      disabled: 'rgba(0,0,0, 0.38)',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    action: {
      active: '#0F172B',
      hover: '#1E293B',
    },
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
