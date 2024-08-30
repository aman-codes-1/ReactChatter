import { MouseEventHandler, useContext } from 'react';
import { FriendRequest, MainLayout } from '..';
import { useSnackbar } from '../../../hooks';
import { ChatsAndFriendsContext } from '../../../contexts';

const FriendRequests = () => {
  const { openSnackbar } = useSnackbar();
  const {
    updateRequest,
    pendingRequests,
    pendingRequestsLoading,
    pendingRequestsCalled,
    pendingRequestsError,
  } = useContext(ChatsAndFriendsContext);

  const handleClickRequest = async (
    _: MouseEventHandler,
    __: number,
    request: any,
    status: string,
  ) => {
    try {
      await updateRequest({
        variables: {
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

  return (
    <FriendRequest
      mainLayoutProps={{
        heading: 'Friend Requests',
        defaultText: 'You have no friend requests.',
        loading: pendingRequestsLoading || !pendingRequestsCalled,
        error: pendingRequestsError?.graphQLErrors?.[0]?.message,
      }}
      data={pendingRequests}
      userObj="memberDetails"
      nameKey="name"
      emailKey="email"
      pictureKey="picture"
      confirmBtnProps={{
        onClick: (_: MouseEventHandler, __: number, ___: any) =>
          handleClickRequest(_, __, ___, 'accepted'),
      }}
      deleteBtnProps={{
        onClick: (_: MouseEventHandler, __: number, ___: any) =>
          handleClickRequest(_, __, ___, 'rejected'),
      }}
    />
  );
};

export default FriendRequests;
