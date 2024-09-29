import {
  ChangeEvent,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { AppBar, IconButton, List, TextField, Toolbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../../hooks';
import { ChatsAndFriendsContext, MessagesContext } from '../../../contexts';
import {
  handleKeyPress,
  setFocus,
  updateHeight,
  validateSearchParams,
} from '../../../helpers';
import { ListItem } from '../../../components';
import { MainLayoutLoader } from '../components';
import { MessageQueueService } from '../../../services';
import Chats from './Chats';
import { ChatMessagesStyled } from './ChatMessages.styled';
import { MessageData } from '../../../contexts/Messages/IMessage';

const ChatMessages = () => {
  const MessageQueue = new MessageQueueService();
  const navigate = useNavigate();
  const location = useLocation();
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
    chatError,
    chats = [],
    chatsLoading,
    chatsCalled,
    createChat,
    friendError,
    otherFriends = [],
    otherFriendsLoading,
    otherFriendsCalled,
    selectedMember,
  } = useContext(ChatsAndFriendsContext);
  const { createMessage, setMessageQueue } = useContext(MessagesContext);
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
      loadingCreateMessage
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
    loadingCreateMessage,
    navigate,
  ]);

  const resetAllStates = () => {
    setMessage('');
  };

  useLayoutEffect(() => {
    resetAllStates();
  }, [chatId, friendId]);

  useLayoutEffect(() => {
    try {
      const isValid = validateSearchParams(location?.search);
      if (!isValid) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error getting url:', error);
    }
  }, [location, navigate]);

  const handleChangeMessage = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setMessage(e?.target?.value);
  };

  const getQueuedMessage = async (data: MessageData) => {
    const queuedMessage = await MessageQueue.addMessageToQueue(data);

    if (!queuedMessage) return null;

    if (
      queuedMessage?.chatId == chatId ||
      queuedMessage?.friendId === friendId
    ) {
      setMessageQueue((prev: any) => [...prev, queuedMessage]);
      return queuedMessage;
    }

    return null;
  };

  const handleSendMessage = async () => {
    if (!message) return;

    setMessage('');
    const timestamp = Date.now();

    setLoadingCreateMessage(true);

    try {
      let chatIdToUse = chatId || '';
      let queuedMessage = null;

      if (!chatIdToUse && friendId) {
        setLoadingCreateChat(true);

        const QueuedMessage = await getQueuedMessage({
          friendId,
          message,
          timestamp,
        });

        queuedMessage = QueuedMessage;

        const createdChat = await createChat({
          variables: {
            userId: _id,
            friendId,
            type: 'private',
            friendUserId: selectedMember?._id,
          },
        });

        const createdChatData = createdChat?.data?.createChat;
        const createdChatId = createdChatData?._id;

        if (!createdChatId) throw new Error('Failed to create chat');

        chatIdToUse = createdChatId;
        setLoadingCreateChat(false);

        if (queuedMessage?.id) {
          await MessageQueue.updateMessageToQueue(queuedMessage?.id, {
            chatId: createdChatId,
          });
        }
      }

      if (chatIdToUse) {
        queuedMessage =
          queuedMessage ||
          (await getQueuedMessage({ chatId: chatIdToUse, message, timestamp }));

        const createdMessage = await createMessage({
          variables: {
            chatId: chatIdToUse,
            senderId: _id,
            queueId: queuedMessage?.id,
            message,
            timestamp,
          },
        });

        const createdMessageData = createdMessage?.data?.createMessage;
        const createdMessageId = createdMessageData?._id;

        if (!createdMessageId) throw new Error('Failed to create message');

        setSearchParams((params) => {
          params.set('id', chatIdToUse);
          params.set('type', 'chat');
          return params;
        });

        if (
          createdMessageData?.queueId &&
          queuedMessage?.id &&
          createdMessageData?.queueId === queuedMessage?.id
        ) {
          await MessageQueue.deleteMessageFromQueue(queuedMessage?.id);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoadingCreateMessage(false);
      setLoadingCreateChat(false);
    }
  };

  const loading =
    (chatId && (chatsLoading || !chatsCalled)) ||
    (friendId && (otherFriendsLoading || !otherFriendsCalled));

  if (chatError || friendError) {
    navigate('/');
  }

  return (
    <ChatMessagesStyled
      navbarHeight={navbarHeight}
      appBarHeight={appBarHeight}
      textFieldHeight={textFieldHeight}
    >
      {loading || selectedMember ? (
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
      ) : null}
      {loading ? null : (
        <Chats appBarHeight={appBarHeight} textFieldHeight={textFieldHeight} />
      )}
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
