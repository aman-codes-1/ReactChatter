import { MouseEventHandler, useContext } from 'react';
import { FriendRequest } from '../../../components';
import { useAuth, useSnackbar } from '../../../hooks';
import { ChatsAndFriendsContext } from '../../../contexts';

const SentRequests = () => {
  const {
    sentRequests = [],
    sentRequestsLoading,
    sentRequestsError,
    updateRequest,
    updateRequestLoading,
  } = useContext(ChatsAndFriendsContext);
  const { auth: { _id = '' } = {} } = useAuth();
  const { openSnackbar } = useSnackbar();

  const handleClickRequest = async (
    _: MouseEventHandler,
    __: number,
    request: any,
    status: string,
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

  return (
    <FriendRequest
      mainLayoutProps={{
        heading: 'Sent Requests',
        description: sentRequests?.length
          ? ''
          : "You haven't sent any friend requests.",
        loadingData: sentRequestsLoading,
        error: sentRequestsError?.graphQLErrors?.[0]?.message,
        data: sentRequests,
      }}
      data={sentRequests}
      nameKey="name"
      emailKey="email"
      pictureKey="picture"
      deleteBtnProps={{
        onClick: updateRequestLoading
          ? () => {}
          : (_: MouseEventHandler, __: number, ___: any) =>
              handleClickRequest(_, __, ___, 'cancelled'),
      }}
    />
  );
};

export default SentRequests;
