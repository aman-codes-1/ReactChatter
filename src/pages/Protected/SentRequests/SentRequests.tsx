import { MouseEventHandler, useContext } from 'react';
import { FriendRequest } from '..';
import { useSnackbar } from '../../../hooks';
import { ChatsAndFriendsContext } from '../../../contexts';

const SentRequests = () => {
  const { openSnackbar } = useSnackbar();
  const {
    sentRequests = [],
    sentRequestsLoading,
    sentRequestsCalled,
    sentRequestsError,
    updateRequest,
    updateRequestLoading,
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
        heading: 'Sent Requests',
        defaultText: 'You have not sent any friend requests.',
        loading: sentRequestsLoading || !sentRequestsCalled,
        error: sentRequestsError?.graphQLErrors?.[0]?.message,
      }}
      data={sentRequests}
      userObj="memberDetails"
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
