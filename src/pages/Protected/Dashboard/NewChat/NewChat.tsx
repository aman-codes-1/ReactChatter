import { useContext } from 'react';
import { DataList, MainLayout } from '../../../../components';
import { ChatsAndFriendsContext } from '../../../../contexts';

const NewChat = () => {
  const { currentFriends = [], handleClickChat } = useContext(
    ChatsAndFriendsContext,
  );

  return (
    <MainLayout
      heading="New Chat"
      description={currentFriends?.length ? '' : 'Nothing to show here...'}
      data={currentFriends}
    >
      <DataList
        disableGutters
        data={currentFriends}
        handleClickListItem={handleClickChat}
      />
    </MainLayout>
  );
};

export default NewChat;
