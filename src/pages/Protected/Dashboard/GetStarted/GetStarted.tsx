import { useContext, useRef, useState } from 'react';
import {
  ButtonProps,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from '@mui/material';
import { Button, MainLayout } from '../../../../components';
import { useAuth, useSnackbar, useTimeout } from '../../../../hooks';
import { ChatsAndFriendsContext } from '../../../../contexts';
import { checkIfNumber } from '../../../../helpers';
import { email, stepsData } from './constants';
import { GetStartedStyled } from './GetStarted.styled';

const GetStarted = ({ setIsStepper, setIsStepperTimeoutRunning }: any) => {
  const theme = useTheme();
  const { auth: { _id = '', given_name = '' } = {} } = useAuth();
  const storedUser = localStorage.getItem(`start_progress_${_id}`);
  const storedUserData = storedUser ? JSON.parse(storedUser) : {};
  const storedActiveStep = storedUserData?.activeStep;
  const numStep = checkIfNumber(storedActiveStep)
    ? Number(storedActiveStep)
    : 0;
  const [activeStep, setActiveStep] = useState(numStep);
  const {
    pendingRequests = [],
    pendingRequestsCount = 0,
    sentRequests = [],
    sentRequestsCount = 0,
    updateRequest,
    updateRequestLoading,
    setIsListItemClicked,
    currentChats = [],
    currentFriends = [],
  } = useContext(ChatsAndFriendsContext);
  const [isCopyTimeoutRunning, setIsCopyTimeoutRunning] = useTimeout(
    () => setIsCopyTimeoutRunning(false),
    2000,
  );
  const { openSnackbar } = useSnackbar();
  const msgRef = useRef<HTMLDivElement | null>(null);

  const handleClickCopy = (_: any) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setIsCopyTimeoutRunning(true);
      })
      .catch(() => {
        setIsCopyTimeoutRunning(false);
      });
  };

  const steps = stepsData(
    given_name,
    handleClickCopy,
    isCopyTimeoutRunning,
    theme,
    currentChats,
    currentFriends,
    pendingRequests,
    pendingRequestsCount,
    sentRequests,
    sentRequestsCount,
    updateRequest,
    updateRequestLoading,
    _id,
    msgRef,
    openSnackbar,
  );

  const stepsLastIndex = steps?.length - 1;

  return (
    <GetStartedStyled>
      <MainLayout heading="Get Started">
        <div className="get-started-wrapper">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps?.map((step, index) => (
              <Step key={step?.label}>
                <StepLabel
                  optional={
                    index === stepsLastIndex ? (
                      <Typography variant="caption">
                        or Continue chatting
                      </Typography>
                    ) : null
                  }
                >
                  {step?.label}
                </StepLabel>
                <StepContent
                  slotProps={{ transition: { unmountOnExit: false } }}
                >
                  {step?.component}
                  <div className="get-started-btn-wrapper">
                    {step?.actions?.map((action) => (
                      <Button
                        key={action?.label}
                        variant={action?.variant as ButtonProps['variant']}
                        onClick={(_: any) =>
                          action?.handler(
                            _,
                            index,
                            _id,
                            setIsListItemClicked,
                            setActiveStep,
                            setIsStepper,
                            setIsStepperTimeoutRunning,
                          )
                        }
                        className={action?.className}
                        disabled={action?.disabled}
                      >
                        {action?.label}
                      </Button>
                    ))}
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      </MainLayout>
    </GetStartedStyled>
  );
};

export default GetStarted;
