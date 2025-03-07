import {
  ChangeEvent,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MainLayout, SuccessErrorMessage } from '../../../components';
import { useAuth, useTimeout } from '../../../hooks';
import { ChatsAndFriendsContext } from '../../../contexts';
import { handleKeyPress, regex, setFocus } from '../../../helpers';
import { AddFriendStyled } from './AddFriend.styled';

const AddFriend = ({ disableHeading }: any) => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [validation, setValidation] = useState({
    isRequired: false,
    isNotValid: false,
  });
  const [state, setState] = useState({
    message: '',
    type: '',
  });
  const { auth: { _id = '', email: Email = '' } = {} } = useAuth();
  const [isShortTimeoutRunning, setIsShortTimeoutRunning] = useTimeout(
    () => setIsShortTimeoutRunning(false),
    3000,
  );
  const [isLongTimeoutRunning, setIsLongTimeoutRunning] = useTimeout(
    () => setIsLongTimeoutRunning(false),
    5000,
  );
  const { createRequest, createRequestLoading, isListItemClicked } = useContext(
    ChatsAndFriendsContext,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const msgRef = useRef<HTMLDivElement | null>(null);

  const resetStates = () => {
    setState({
      message: '',
      type: '',
    });
    setValidation({
      isRequired: false,
      isNotValid: false,
    });
  };

  useLayoutEffect(() => {
    setFocus(inputRef);
    setEmail('');
    resetStates();
  }, [isListItemClicked]);

  const handleChangeEmail = (e: ChangeEvent) => {
    resetStates();
    setState({
      message: '',
      type: '',
    });
    const val = (e.target as HTMLInputElement)?.value;
    setEmail(val);
    if (val?.toLowerCase() === Email?.toLowerCase()) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleCheckEmail = () => {
    resetStates();
    const { validateEmail } = regex;
    let validationCheck = {
      isRequired: false,
      isNotValid: false,
    };
    if (!email) {
      validationCheck = {
        isRequired: true,
        isNotValid: false,
      };
      setIsShortTimeoutRunning(true);
    } else if (email && !validateEmail.test(email?.toLowerCase())) {
      validationCheck = {
        isRequired: false,
        isNotValid: true,
      };
      setIsShortTimeoutRunning(true);
    } else {
      validationCheck = {
        isRequired: false,
        isNotValid: false,
      };
    }
    setValidation(validationCheck);
    return validationCheck;
  };

  const handleClickAdd = async () => {
    if (disabled || createRequestLoading) return;

    resetStates();

    const validationCheck = handleCheckEmail();
    if (Object.values(validationCheck).some((x) => x)) {
      return;
    }

    try {
      const { data } = await createRequest({
        variables: {
          userId: _id,
          sendToEmail: email?.toLowerCase(),
        },
      });
      if (data?.createRequest?._id) {
        setState({
          message: 'Friend Request Sent.',
          type: 'success',
        });
        setEmail('');
        setIsLongTimeoutRunning(true);
      }
    } catch (err: any) {
      setState({
        message:
          err?.graphQLErrors?.[0]?.message ||
          'Something went wrong. Please try again.',
        type: 'error',
      });
      setIsLongTimeoutRunning(true);
    }
  };

  const { isRequired, isNotValid } = validation;
  const { message, type } = state;

  return (
    <AddFriendStyled>
      <MainLayout
        heading={disableHeading ? '' : 'Add Friend'}
        description="Add friend by email"
        disablePadding={disableHeading}
      >
        <div className="add-friend-email-wrapper">
          <div className="add-friend-text-field-wrapper">
            <TextField
              autoFocus
              slotProps={{
                input: {
                  className: 'add-friend-email-input-props',
                },
              }}
              className="add-friend-email-input"
              size="small"
              placeholder="you@example.com"
              value={email}
              onKeyUp={(_: any) => handleKeyPress(_, handleClickAdd)}
              onChange={handleChangeEmail}
              inputRef={inputRef}
              error={(isRequired || isNotValid) && isShortTimeoutRunning}
              type="email"
              required
            />
            {isRequired && isShortTimeoutRunning ? (
              <SuccessErrorMessage
                ref={msgRef}
                message="Email is required"
                type="error"
              />
            ) : null}
            {isNotValid && isShortTimeoutRunning ? (
              <SuccessErrorMessage
                ref={msgRef}
                message="Please enter a valid email"
                type="error"
              />
            ) : null}
            {message && (isShortTimeoutRunning || isLongTimeoutRunning) ? (
              <SuccessErrorMessage ref={msgRef} message={message} type={type} />
            ) : null}
          </div>
          <div className="add-friend-email-btn-wrapper">
            <LoadingButton
              loading={createRequestLoading}
              variant="contained"
              className={`add-friend-email-btn ${
                createRequestLoading || disabled ? '' : 'add-btn-active'
              }`}
              onClick={handleClickAdd}
              disabled={disabled}
              size="large"
            >
              Add
            </LoadingButton>
          </div>
        </div>
      </MainLayout>
    </AddFriendStyled>
  );
};

export default AddFriend;
