import { useContext } from 'react';
import { DataList, MainLayout } from '../../../../components';
import { ChatsAndFriendsContext } from '../../../../contexts';

const RecentChats = () => {
  const { currentChats = [], handleClickChat } = useContext(
    ChatsAndFriendsContext,
  );

  return (
    <MainLayout
      heading="Recent Chats"
      description={currentChats?.length ? '' : 'Nothing to show here...'}
      data={currentChats}
    >
      <DataList
        disableGutters
        data={currentChats}
        handleClickListItem={handleClickChat}
      />
    </MainLayout>
  );
};

export default RecentChats;
