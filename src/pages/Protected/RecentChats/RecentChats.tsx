import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '..';
import { ChatsAndFriendsContext, MessagesContext } from '../../../contexts';
import { DataList } from '../../../components';

const RecentChats = () => {
  const navigate = useNavigate();
  const {
    chats = [],
    chatsLoading,
    chatsCalled,
    setIsListItemClicked,
    selectedChat,
    setSelectedChat,
    setSelectedFriend,
    setSelectedMember,
  } = useContext(ChatsAndFriendsContext);
  const { getChatMessagesWithQueue } = useContext(MessagesContext);

  const handleClickChat = async (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    chat: any,
    selectedMember: any,
  ) => {
    setIsListItemClicked((prev: boolean) => !prev);

    if (chat?._id) {
      try {
        setSelectedFriend(undefined);
        setSelectedChat(chat);
        setSelectedMember(selectedMember);
        await getChatMessagesWithQueue(chat?._id);
        navigate(`/chat?id=${chat?._id}&type=chat`);
      } catch (error: any) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  return (
    <MainLayout
      heading="Recent Chats"
      defaultText="Nothing to show here..."
      loading={chatsLoading || !chatsCalled}
      data={chats}
    >
      <DataList
        disableGutters
        data={chats}
        selectedItem={selectedChat}
        handleClickListItem={handleClickChat}
        className="overflow-wrapper"
        WebkitLineClamp={2}
      />
    </MainLayout>
  );
};

export default RecentChats;
