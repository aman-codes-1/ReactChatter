import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '..';
import { ChatsAndFriendsContext } from '../../../contexts';
import { DataList } from '../../../components';

const RecentChats = () => {
  const navigate = useNavigate();
  const [isListItemClicked, setIsListItemClicked] = useState(false);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const {
    chats = [],
    chatsLoading,
    chatsCalled,
    selectedChat,
    setSelectedChat,
    setSelectedFriend,
    setSelectedMember,
  } = useContext(ChatsAndFriendsContext);

  const handleClickChat = async (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    chat: any,
    selectedMember: any,
  ) => {
    setIsListItemClicked((prev) => !prev);
    if (chat?._id) {
      setSelectedFriend(undefined);
      setSelectedChat(chat);
      setSelectedMember(selectedMember);
      navigate(`/chat?id=${chat?._id}&type=chat`, {
        state: { isListItemClicked },
      });
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
        dense={hasScrollbar}
        disableGutters
        data={chats}
        selectedItem={selectedChat}
        handleClickListItem={handleClickChat}
        className="overflow-wrapper"
        dividerVariant="fullWidth"
        WebkitLineClamp={2}
        sxScrollPaddingRight="1.25rem"
        hasScrollbar={hasScrollbar}
        setHasScrollbar={setHasScrollbar}
      />
    </MainLayout>
  );
};

export default RecentChats;
