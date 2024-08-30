import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
import {
  AlertColor,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SnackbarStyled } from './Snackbar.styled';

type Props = {
  children: ReactNode;
};

export type State = {
  message?: string;
  type: AlertColor | undefined;
  title?: string | undefined;
};

type Context = {
  openSnackbar: (args: State) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const SnackbarContext = createContext<Context>({
  openSnackbar: (f) => f,
  setIsOpen: () => null,
});

export const SnackbarProvider = ({ children }: Props) => {
  const initialState: State = {
    message: 'There was an error processing your request.',
    type: 'error',
    title: 'Error',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<State>(initialState);
  const { message, type, title } = state;

  const openSnackbar = (args: State) => {
    if (args.type === 'error') {
      setState({
        ...args,
        title: 'Error',
        message: args?.message || 'There was an error processing your request.',
      });
    } else {
      setState({
        ...args,
        title: 'Success',
        message: args?.message || 'Your request was submitted successfully.',
      });
    }
    setIsOpen(true);
  };

  const handleClose = (_?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, setIsOpen }}>
      <SnackbarStyled>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isOpen}
          onClose={handleClose}
          className="snackbar"
        >
          <Paper className="snackbar-wrapper">
            <IconButton
              className={`close-btn ${
                type === 'error' ? 'error-bg-light' : 'success-bg-light'
              }`}
              disabled
            >
              {type === 'error' ? (
                <CancelIcon className="error-dark" />
              ) : (
                <CheckCircleIcon className="success-dark" />
              )}
            </IconButton>
            <Typography
              className={`title ${
                type === 'error' ? 'error-dark' : 'success-dark'
              }`}
              fontWeight={600}
            >
              {title}
            </Typography>
            {message && (
              <Typography className="message" fontWeight={400}>
                {message}
              </Typography>
            )}
            <Button
              className={`submit-btn ${
                type === 'error' ? 'error-submit-btn' : 'success-submit-btn'
              }`}
              variant="contained"
              onClick={handleClose}
            >
              OK
            </Button>
          </Paper>
        </Snackbar>
        {children}
      </SnackbarStyled>
    </SnackbarContext.Provider>
  );
};
