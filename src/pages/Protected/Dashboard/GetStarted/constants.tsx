import { MouseEventHandler } from 'react';
import {
  Alert,
  ButtonProps,
  IconButton,
  Link,
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import {
  FriendRequestList,
  NotificationList,
  SuccessErrorMessage,
} from '../../../../components';
import { AddFriend } from '../..';
import { sortByLastMessageTimestamp } from '../../../../helpers';

export const email = 'aman.codes0@gmail.com';

const handleContinue = (
  _: any,
  idx: number,
  _id: string,
  setIsListItemClicked: any,
  setActiveStep: any,
  setIsStepper: any,
  setIsStepperTimeoutRunning: any,
) => {
  if (idx === 0) {
    setIsListItemClicked((prev: boolean) => !prev);
  }
  setActiveStep((prevActiveStep: number) => {
    const val = prevActiveStep + 1;
    if (idx === 2) {
      localStorage.removeItem(`start_progress_${_id}`);
      setIsStepperTimeoutRunning(true);
      setIsStepper(false);
    } else {
      localStorage.setItem(
        `start_progress_${_id}`,
        JSON.stringify({ activeStep: String(val) }),
      );
    }
    return val;
  });
};

const handleBack = (
  _: any,
  idx: number,
  _id: string,
  setIsListItemClicked: any,
  setActiveStep: any,
) => {
  if (idx === 2) {
    setIsListItemClicked((prev: boolean) => !prev);
  }
  setActiveStep((prevActiveStep: number) => {
    const val = prevActiveStep - 1;
    localStorage.setItem(
      `start_progress_${_id}`,
      JSON.stringify({ activeStep: String(val) }),
    );
    return val;
  });
};

const handleClickRequest = async (
  _: MouseEventHandler,
  __: number,
  request: any,
  status: string,
  updateRequest: any,
  _id: string,
  openSnackbar: any,
) => {
  try {
    await updateRequest({
      variables: {
        userId: _id,
        requestId: request?._id,
        status,
      },
    });
  } catch (err: any) {
    openSnackbar({
      message: err?.graphQLErrors?.[0]?.message,
      type: 'error',
    });
  }
};

export const stepsData = (
  name: string,
  handleClickCopy: any,
  isCopyTimeoutRunning: boolean,
  theme: Theme,
  currentChats: any[],
  currentFriends: any[],
  pendingRequests: any[],
  pendingRequestsCount: number,
  sentRequests: any[],
  sentRequestsCount: number,
  updateRequest: any,
  updateRequestLoading: boolean,
  _id: string,
  msgRef: any,
  openSnackbar: any,
) => [
  {
    label: 'Find Friends',
    component: (
      <>
        <Typography component="div">
          Hey {name}, Welcome to ReactChatter.
          <br />
          I&rsquo;m{' '}
          <Link
            href="https://bold.pro/my/aman-codes"
            target="_blank"
            rel="noreferrer"
            underline="none"
          >
            Aman Jain
          </Link>
          , the developer of this application.
          <br />
          Feel free to add me or other registered user as a friend.
          <br />
          <Typography className="get-started-margin-top" />
          <Typography className="get-started-email-heading">
            You can use the following email:
          </Typography>
        </Typography>
        <div className="get-started-email-copy-wrapper">
          <pre className="get-started-email-wrapper">
            <code>{email}</code>
          </pre>
          {isCopyTimeoutRunning ? (
            <Tooltip
              title="Copied"
              arrow
              placement="top-start"
              disableHoverListener={!isCopyTimeoutRunning}
              slotProps={{
                tooltip: {
                  sx: { backgroundColor: theme.palette.success.dark },
                },
                arrow: { sx: { color: theme.palette.success.dark } },
              }}
            >
              <CheckBoxRoundedIcon
                fontSize="large"
                color="success"
                className="get-started-email-copied-icon"
              />
            </Tooltip>
          ) : (
            <Tooltip
              title="Copy"
              arrow
              placement="top"
              disableHoverListener={isCopyTimeoutRunning}
            >
              <IconButton
                className="get-started-email-copy-btn"
                onClick={handleClickCopy}
              >
                <ContentCopyRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </>
    ),
    actions: [
      {
        label: 'Continue',
        handler: handleContinue,
        disabled: false,
        variant: 'contained',
        className: 'get-started-btn',
      },
    ],
  },
  {
    label: sentRequestsCount ? 'Sent Requests' : 'Send a Friend Request',
    component: (
      <>
        {sentRequestsCount ? (
          <FriendRequestList
            maxHeight="144.5px"
            data={sentRequests}
            nameKey="name"
            emailKey="email"
            pictureKey="picture"
            deleteBtnProps={{
              onClick: updateRequestLoading
                ? () => {}
                : (_: MouseEventHandler, __: number, ___: any) =>
                    handleClickRequest(
                      _,
                      __,
                      ___,
                      'cancelled',
                      updateRequest,
                      _id,
                      openSnackbar,
                    ),
            }}
          />
        ) : (
          <AddFriend disableHeading />
        )}
        {currentChats?.length || currentFriends?.length ? (
          <SuccessErrorMessage
            ref={msgRef}
            message={`${currentChats?.length + currentFriends?.length} of your friend requests have been confirmed or accepted.`}
            type="success"
            className="get-started-margin-top"
          />
        ) : null}
        {pendingRequestsCount ? (
          <SuccessErrorMessage
            ref={msgRef}
            message={`You have received ${pendingRequestsCount} friend requests.`}
            type="success"
            className="get-started-margin-top"
          />
        ) : null}
      </>
    ),
    actions: [
      {
        label: 'Continue',
        handler: handleContinue,
        disabled:
          !currentChats?.length &&
          !currentFriends?.length &&
          !pendingRequestsCount &&
          !sentRequestsCount,
        variant: 'contained' as ButtonProps['variant'],
        className: 'get-started-btn',
      },
      {
        label: 'Back',
        handler: handleBack,
        disabled: false,
        variant: 'text' as ButtonProps['variant'],
        className: 'get-started-back-btn',
      },
    ],
  },
  {
    label: 'Start a New Conversation',
    component: (
      <>
        {currentChats?.length ||
        currentFriends?.length ||
        pendingRequestsCount ? (
          <NotificationList
            dense
            disableGutters
            data={sortByLastMessageTimestamp([
              ...currentChats,
              ...currentFriends,
              ...pendingRequests,
            ])}
          />
        ) : (
          <div className="get-started-no-friends-wrapper">
            <Groups2OutlinedIcon
              color="primary"
              className="get-started-no-friends-icon"
            />
            <Typography
              align="center"
              className="get-started-no-friends-heading"
            >
              No friends to show
            </Typography>
            <Alert
              variant="outlined"
              severity="warning"
              className="get-started-alert get-started-margin-top"
            >
              Please wait until the friend requests have been accepted.
            </Alert>
          </div>
        )}
      </>
    ),
    actions: [
      {
        label: 'Finish',
        handler: handleContinue,
        disabled: !currentChats?.length && !currentFriends?.length,
        variant: 'contained' as ButtonProps['variant'],
        className: 'get-started-btn',
      },
      {
        label: 'Back',
        handler: handleBack,
        disabled: false,
        variant: 'text' as ButtonProps['variant'],
        className: 'get-started-back-btn',
      },
    ],
  },
];
