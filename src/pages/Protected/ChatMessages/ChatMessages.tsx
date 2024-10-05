import {
  ChangeEvent,
  useContext,
  useEffect,
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
  addQueuedMessageToLastGroup,
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

const ChatMessages = ({ loadingFallback }: any) => {
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
  const [loadingCreateMessage, setLoadingCreateMessage] = useState(false);
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [textFieldHeight, setTextFieldHeight] = useState(0);
  const { auth: { _id = '' } = {} } = useAuth();
  const {
    chatQuery,
    chatLoading,
    friendQuery,
    friendLoading,
    createChat,
    isListItemClicked,
    loadingChatMessages,
    setLoadingChatMessages,
    selectedMember,
  } = useContext(ChatsAndFriendsContext);
  const {
    createMessage,
    setMessageGroups,
    getChatMessagesWithQueue,
    getFriendMessagesWithQueue,
  } = useContext(MessagesContext);
  const inputRef = useRef<any>(null);
  const appBarRef = useRef<any>(null);
  const textFieldRef = useRef<any>(null);

  useLayoutEffect(() => {
    setFocus(inputRef);
  }, [isListItemClicked]);

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

  const fetchData = async (
    id: string,
    key: string,
    query: any,
    fetchQuery: any,
  ) => {
    setLoadingChatMessages(true);

    try {
      const res = await query({
        variables: {
          [key]: id,
        },
      });

      const error = res?.error?.message;

      if (error) {
        navigate('/');
        throw new Error(error);
      }

      await fetchQuery(id);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingChatMessages(false);
    }
  };

  useEffect(() => {
    if (loadingFallback || selectedMember) return;

    const fetchMessages = async () => {
      if (chatId) {
        await fetchData(chatId, 'chatId', chatQuery, getChatMessagesWithQueue);
      }

      if (friendId) {
        await fetchData(
          friendId,
          'friendId',
          friendQuery,
          getFriendMessagesWithQueue,
        );
      }
    };

    fetchMessages();
  }, [loadingFallback, selectedMember]);

  const handleChangeMessage = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setMessage(e?.target?.value);
  };

  const addAndGetQueuedMessage = async (data: MessageData) => {
    const queuedMessage = await MessageQueue.addMessageToQueue(data);

    if (!queuedMessage) return null;

    if (
      queuedMessage?.chatId == chatId ||
      queuedMessage?.friendId === friendId
    ) {
      setMessageGroups((prev: any) => {
        const newGroups = addQueuedMessageToLastGroup(prev, queuedMessage);
        return newGroups;
      });

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
        const QueuedMessage = await addAndGetQueuedMessage({
          friendId,
          message,
          sender: {
            _id,
            sentStatus: {
              isQueued: true,
              timestamp,
            },
          },
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

        if (queuedMessage?.id) {
          await MessageQueue.updateMessageToQueue(queuedMessage?.id, {
            chatId: createdChatId,
          });
        }
      }

      if (chatIdToUse) {
        queuedMessage =
          queuedMessage ||
          (await addAndGetQueuedMessage({
            chatId: chatIdToUse,
            message,
            sender: {
              _id,
              sentStatus: {
                isQueued: true,
                timestamp,
              },
            },
            timestamp,
          }));

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
          // await MessageQueue.deleteMessageFromQueue(queuedMessage?.id);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoadingCreateMessage(false);
    }
  };

  const loading = loadingChatMessages || chatLoading || friendLoading;

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
