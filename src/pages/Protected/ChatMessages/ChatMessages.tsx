import {
  ChangeEvent,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { AppBar, IconButton, TextField, Toolbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../../hooks';
import { ChatsAndFriendsContext, MessagesContext } from '../../../contexts';
import { handleKeyPress, setFocus, updateHeight } from '../../../helpers';
import { ChatMessagesStyled } from './ChatMessages.styled';
import Chats from './Chats';

const ChatMessages = () => {
  const navigate = useNavigate();
  const [navbarHeight] = useOutletContext<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const friendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const [message, setMessage] = useState('');
  const [textFieldHeight, setTextFieldHeight] = useState(0);
  const { auth: { _id = '' } = {} } = useAuth();
  const {
    chats = [],
    chatsLoading,
    chatError,
    chatsCalled,
    otherFriends = [],
    otherFriendsLoading,
    otherFriendsCalled,
    createChat,
    selectedMember,
  } = useContext(ChatsAndFriendsContext);
  const { loadingMessages, createMessage, setMessageGroups, setMessageQueue } =
    useContext(MessagesContext);
  const inputRef = useRef<any>(null);
  const textFieldRef = useRef<any>(null);

  setFocus(inputRef);

  useLayoutEffect(() => {
    updateHeight(textFieldRef, setTextFieldHeight);
    window.addEventListener('resize', () =>
      updateHeight(textFieldRef, setTextFieldHeight),
    );

    return () => {
      window.removeEventListener('resize', () =>
        updateHeight(textFieldRef, setTextFieldHeight),
      );
    };
  }, []);

  useLayoutEffect(() => {
    if (
      chatsLoading ||
      !chatsCalled ||
      otherFriendsLoading ||
      !otherFriendsCalled
    )
      return;
    if ((chatId && !chats?.length) || (friendId && !otherFriends?.length)) {
      navigate('/');
    }
  }, [
    chatId,
    chats?.length,
    chatsLoading,
    chatsCalled,
    friendId,
    otherFriends?.length,
    otherFriendsLoading,
    otherFriendsCalled,
    navigate,
  ]);

  const resetAllStates = () => {
    setMessage('');
    setMessageGroups([]);
  };

  useLayoutEffect(() => {
    if (friendId) {
      resetAllStates();
    }
  }, [friendId]);

  if (chatError) {
    navigate('/');
  }

  const handleChangeMessage = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setMessage(e?.target?.value);
  };

  const handleSendMessage = async () => {
    if (!message) return;
    const timestamp = Date.now();
    setMessageQueue((prev: any) => [
      ...prev,
      {
        timestamp,
        message,
      },
    ]);
    setMessage('');
    if (friendId) {
      const res = await createChat({
        variables: {
          userId: _id,
          friendId,
          type: 'private',
          friendUserId: selectedMember?._id,
        },
      });
      const newChatId = res?.data?.createChat?._id;
      if (newChatId) {
        await createMessage({
          variables: {
            chatId: newChatId,
            message,
            senderId: _id,
            timestamp,
          },
        });
        setSearchParams((params) => {
          params.set('id', newChatId);
          params.set('type', 'chat');
          return params;
        });
      }
    }
    if (chatId) {
      await createMessage({
        variables: {
          chatId,
          message,
          senderId: _id,
          timestamp,
        },
      });
    }
  };

  const loading =
    loadingMessages ||
    (chatId && (chatsLoading || !chatsCalled)) ||
    (friendId && (otherFriendsLoading || !otherFriendsCalled));

  return (
    <ChatMessagesStyled
      navbarHeight={navbarHeight}
      textFieldHeight={textFieldHeight}
    >
      {loading ? null : <Chats textFieldHeight={textFieldHeight} />}
      <div className="text-field-wrapper" ref={textFieldRef}>
        <AppBar position="static" className="app-bar text-field-app-bar">
          <Toolbar disableGutters variant="dense">
            <div className="text-field-input-wrapper">
              <TextField
                autoFocus
                fullWidth
                value={message}
                onKeyUp={(_: any) => handleKeyPress(_, handleSendMessage)}
                onChange={handleChangeMessage}
                slotProps={{
                  input: {
                    className: 'text-field-input',
                  },
                }}
                placeholder=" Type a message"
                inputRef={inputRef}
              />
              {message ? (
                <IconButton onClick={handleSendMessage}>
                  <SendIcon color="info" />
                </IconButton>
              ) : null}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </ChatMessagesStyled>
  );
};

export default ChatMessages;
