import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataList, MainLayout } from '../../../../../components';
import { ChatsAndFriendsContext, DrawerContext } from '../../../../../contexts';
import { clickChat } from '../../../../../helpers';

const RecentChats = ({ loadingRecentChats }: any) => {
  const navigate = useNavigate();
  const {
    setIsListItemClicked,
    setSelectedChat,
    setSelectedChatDetails,
    isFetchingChats,
    isFetchingOtherFriends,
    currentChats = [],
    getChatMessagesWithQueue,
    fetchAll,
  } = useContext(ChatsAndFriendsContext);
  const { toggleDrawer } = useContext(DrawerContext);
  const prevPathname = `${location?.pathname}${location?.search}`;

  const handleClickChat = async (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    chat: any,
    chatDetails: any,
  ) => {
    await clickChat(
      chat,
      chatDetails,
      setIsListItemClicked,
      setSelectedChat,
      setSelectedChatDetails,
      getChatMessagesWithQueue,
      navigate,
      prevPathname,
      fetchAll,
      toggleDrawer,
    );
  };

  const loading = isFetchingChats || isFetchingOtherFriends;

  return (
    <MainLayout
      heading="Recent Chats"
      description={loadingRecentChats ? '' : 'Nothing to show here...'}
      loading={loading}
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
