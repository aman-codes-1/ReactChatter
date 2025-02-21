import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataList, MainLayout } from '../../../../../components';
import { ChatsAndFriendsContext, DrawerContext } from '../../../../../contexts';
import { clickChat } from '../../../../../helpers';

const NewChat = ({ loadingNewChat }: any) => {
  const navigate = useNavigate();
  const {
    setIsListItemClicked,
    setSelectedChat,
    setSelectedChatDetails,
    isFetchingChats,
    isFetchingOtherFriends,
    currentOtherFriends = [],
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
      heading="New Chat"
      description={loadingNewChat ? '' : 'Nothing to show here...'}
      loading={loading}
      data={currentOtherFriends}
    >
      <DataList
        disableGutters
        data={currentOtherFriends}
        handleClickListItem={handleClickChat}
      />
    </MainLayout>
  );
};

export default NewChat;
