import { useContext, useState } from 'react';
import { MainLayout } from '../../../components';
import { useClient, useTimeout } from '../../../hooks';
import { ChatsAndFriendsContext } from '../../../contexts';
import { GetStarted, NewChat, RecentChats } from '.';

const Dashboard = () => {
  const activeStep = localStorage.getItem('activeStep');
  const [isStepper, setIsStepper] = useState(!!activeStep);
  const {
    pendingRequestsLoading,
    sentRequestsLoading,
    isFetchingChats,
    isFetchingFriends,
    currentChats = [],
    currentFriends = [],
  } = useContext(ChatsAndFriendsContext);
  const [isStepperTimeoutRunning, setIsStepperTimeoutRunning] = useTimeout(
    () => setIsStepperTimeoutRunning(false),
    2000,
  );
  const { isNetworkError } = useClient();

  const renderDashboard = () => {
    if (isNetworkError) {
      return <MainLayout heading="Server Error" />;
    } else if (
      isStepper ||
      isStepperTimeoutRunning ||
      (!currentChats?.length && !currentFriends?.length)
    ) {
      return (
        <GetStarted
          setIsStepper={setIsStepper}
          setIsStepperTimeoutRunning={setIsStepperTimeoutRunning}
        />
      );
    } else if (!currentChats?.length && currentFriends?.length) {
      return <NewChat />;
    } else {
      return <RecentChats />;
    }
  };

  const loading =
    !isNetworkError &&
    (isFetchingChats ||
      isFetchingFriends ||
      pendingRequestsLoading ||
      sentRequestsLoading);

  if (loading) {
    return (
      <MainLayout
        loading={loading}
        loadingProps={{ disableDescription: true }}
        loadingData={loading}
        loadingDataProps={{ dataCount: 5 }}
      />
    );
  }

  return <>{renderDashboard()}</>;
};

export default Dashboard;
