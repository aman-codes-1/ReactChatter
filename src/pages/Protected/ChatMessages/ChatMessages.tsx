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
import { AppBar, IconButton, List, TextField, Toolbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../../hooks';
import { ChatsAndFriendsContext, MessagesContext } from '../../../contexts';
import { handleKeyPress, setFocus, updateHeight } from '../../../helpers';
import { ChatMessagesStyled } from './ChatMessages.styled';
import Chats from './Chats';
import { ListItem } from '../../../components';
import { MainLayoutLoader } from '../components';

const ChatMessages = () => {
  const navigate = useNavigate();
  const [navbarHeight] = useOutletContext<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const friendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const [message, setMessage] = useState('');
  const [loadingCreateChat, setLoadingCreateChat] = useState(false);
  const [loadingCreateMessage, setLoadingCreateMessage] = useState(false);
  const [appBarHeight, setAppBarHeight] = useState(0);
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
  const {
    createMessage,
    setMessageQueue,
    addMessageToQueue,
    updateMessageToQueue,
    deleteMessageFromQueue,
    getQueuedMessageById,
  } = useContext(MessagesContext);
  const inputRef = useRef<any>(null);
  const appBarRef = useRef<any>(null);
  const textFieldRef = useRef<any>(null);

  setFocus(inputRef);

  useLayoutEffect(() => {
    updateHeight(appBarRef, setAppBarHeight);
    window.addEventListener('resize', () =>
      updateHeight(appBarRef, setAppBarHeight),
    );

    return () => {
      window.removeEventListener('resize', () =>
        updateHeight(appBarRef, setAppBarHeight),
      );
    };
  }, []);

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
      !otherFriendsCalled ||
      loadingCreateChat
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
    loadingCreateChat,
    navigate,
  ]);

  const resetAllStates = () => {
    setMessage('');
  };

  useLayoutEffect(() => {
    resetAllStates();
  }, [chatId, friendId]);

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
    setMessage('');
    const timestamp = Date.now();
    const id = await addMessageToQueue({
      chatId: chatId || friendId,
      message,
      timestamp,
    });
    let queuedMessage: any;
    if (id) {
      queuedMessage = await getQueuedMessageById(id);
      if (
        queuedMessage?.chatId === chatId ||
        queuedMessage?.chatId === friendId
      ) {
        setMessageQueue((prev: any) => [...prev, queuedMessage]);
      }
    }
    if (friendId) {
      setLoadingCreateChat(true);
      const chatResult = await createChat({
        variables: {
          userId: _id,
          friendId,
          type: 'private',
          friendUserId: selectedMember?._id,
        },
      });
      const newChatId = chatResult?.data?.createChat?._id;
      if (newChatId) {
        await updateMessageToQueue(queuedMessage?.id, newChatId);
        const msgResult = await createMessage({
          variables: {
            chatId: newChatId,
            senderId: _id,
            localId: queuedMessage?.id,
            message,
            timestamp,
          },
        });
        if (
          msgResult?.data?.createMessage?.localId &&
          msgResult?.data?.createMessage?.localId === queuedMessage?.id
        ) {
          await deleteMessageFromQueue(queuedMessage?.id);
        }
        if (msgResult?.data?.createMessage?._id) {
          setSearchParams((params) => {
            params.set('id', newChatId);
            params.set('type', 'chat');
            return params;
          });
        }
        setLoadingCreateChat(false);
      }
      setLoadingCreateChat(false);
    }
    setLoadingCreateChat(false);
    if (chatId) {
      setLoadingCreateMessage(true);
      await createMessage({
        variables: {
          chatId,
          message,
          senderId: _id,
          timestamp,
        },
      });
      setLoadingCreateMessage(false);
    }
    setLoadingCreateMessage(false);
  };

  const loading =
    (chatId && (chatsLoading || !chatsCalled)) ||
    (friendId && (otherFriendsLoading || !otherFriendsCalled));

  return (
    <ChatMessagesStyled
      navbarHeight={navbarHeight}
      appBarHeight={appBarHeight}
      textFieldHeight={textFieldHeight}
    >
      <div className="app-bar-wrapper">
        <AppBar position="static" className="app-bar" ref={appBarRef}>
          <Toolbar>
            {loading ? (
              <MainLayoutLoader dense disablePadding disableGutters />
            ) : (
              <List dense disablePadding>
                <ListItem
                  disableHover
                  disableGutters
                  disablePadding
                  btnProps={{
                    disableGutters: true,
                    alignItems: 'flex-start',
                    textProps: {
                      primary: selectedMember?.memberDetails?.name,
                      secondary: selectedMember?.memberDetails?.email,
                      primaryTypographyProps: {
                        fontSize: '1.08rem',
                      },
                      secondaryTypographyProps: {
                        fontSize: '0.85rem',
                        style: {
                          WebkitLineClamp: 1,
                        },
                      },
                    },
                    avatarProps: {
                      src: selectedMember?.memberDetails?.picture,
                    },
                  }}
                />
              </List>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <Chats appBarHeight={appBarHeight} textFieldHeight={textFieldHeight} />
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
