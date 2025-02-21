import { useContext, useState } from 'react';
import { GetStarted, NewChat, RecentChats } from './components';
import { useTimeout } from '../../../hooks';
import { ChatsAndFriendsContext } from '../../../contexts';

const Dashboard = () => {
  const activeStep = localStorage.getItem('activeStep');
  const [isStepper, setIsStepper] = useState(!!activeStep);
  const {
    sentRequestsLoading,
    isFetchingChats,
    isFetchingOtherFriends,
    currentChats = [],
    currentOtherFriends = [],
  } = useContext(ChatsAndFriendsContext);
  const [isStepperTimeoutRunning, setIsStepperTimeoutRunning] = useTimeout(
    () => setIsStepperTimeoutRunning(false),
    2000,
  );

  const renderDashboard = () => {
    if (
      isStepper ||
      isStepperTimeoutRunning ||
      (!currentChats?.length && !currentOtherFriends?.length)
    ) {
      return (
        <GetStarted
          setIsStepper={setIsStepper}
          setIsStepperTimeoutRunning={setIsStepperTimeoutRunning}
        />
      );
    } else if (!currentChats?.length && currentOtherFriends?.length) {
      return <NewChat />;
    } else {
      return <RecentChats />;
    }
  };

  // to do: loader skeleton on MainLayout heading and subHeading

  const loading =
    isFetchingChats || isFetchingOtherFriends || sentRequestsLoading;

  if (loading) return null;

  return <>{renderDashboard()}</>;
};

export default Dashboard;
