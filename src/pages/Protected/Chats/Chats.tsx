import {
  ChangeEvent,
  Fragment,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Divider,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Drawer,
  ListItem,
  MainLayout,
  MessageStatus,
} from '../../../components';
import { useAuth } from '../../../hooks';
import { ChatsAndFriendsContext, DrawerContext } from '../../../contexts';
import {
  addUpdateChat,
  checkMessageStatus,
  deleteFriend,
  deleteFriendsCachedMessages,
  getChatType,
  getDateLabel2,
  getFriendId,
  getReceivers,
  getSender,
  getTime,
  handleKeyPress,
  renderMessage,
  setFocus,
  toggleDrawer,
  updateHeight,
  validateSearchParams,
} from '../../../helpers';
import { MessageQueueService } from '../../../services';
import ChatGroups from './ChatGroups';
import ChatMessage from './ChatMessage';
import {
  ChatDrawerStyled,
  ChatsAppBarStyled,
  ChatsMainStyled,
  ChatsStyled,
} from './Chats.styled';

const Chats = ({ loadingChats }: any) => {
  const theme = useTheme();
  const MessageQueue = new MessageQueueService();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const fullFriendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const { friendId, friendUserId } = getFriendId(fullFriendId);
  const [message, setMessage] = useState('');
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [textFieldHeight, setTextFieldHeight] = useState(0);
  const [loadingCreateChat, setLoadingCreateChat] = useState(false);
  const [isError, setIsError] = useState(false);
  const { auth: { _id = '' } = {} } = useAuth();
  const {
    cachedMessagesClient,
    userOnlineStatus,
    userOnlineStatusLoading,
    chatsClient,
    friendsClient,
    createMessage,
    createChat,
    isListItemClicked,
    selectedChat,
    selectedChatDetails,
    setLoadingCreateMessage,
    setScrollToBottom,
    isFetchingChats,
    isFetchingFriends,
    isMessageDrawerOpen,
    setIsMessageDrawerOpen,
    selectedMessage,
    setSelectedMessage,
  } = useContext(ChatsAndFriendsContext);
  const { navBarHeight, menuWidth, getDrawerWidth } = useContext(DrawerContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const appBarRef = useRef<HTMLDivElement | null>(null);
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const isExtraSmallOrBelow = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraLargeOrAbove = useMediaQuery(theme.breakpoints.up('lg'));

  useLayoutEffect(() => {
    setFocus(inputRef);
  }, [isListItemClicked]);

  useLayoutEffect(() => {
    const update = () => updateHeight(appBarRef, setAppBarHeight);
    update();

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  useLayoutEffect(() => {
    const update = () => updateHeight(textFieldRef, setTextFieldHeight);
    update();

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  const resetStates = () => {
    setMessage('');
  };

  useLayoutEffect(() => {
    resetStates();
  }, [chatId, friendId]);

  useLayoutEffect(() => {
    try {
      const isValid = validateSearchParams(search);
      if (!isValid) {
        navigate('/');
      }
    } catch (err) {
      console.error('Error getting url:', err);
    }
  }, [search]);

  const handleChangeMessage = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setMessage(e?.target?.value);
  };

  const handleSendMessage = async () => {
    if (!message || loadingCreateChat) return;
    setMessage('');
    setLoadingCreateMessage(true);

    try {
      const queueId = crypto.randomUUID();
      const timestamp = Date.now();
      let chatIdToUse = chatId || '';
      let friendIdToUse = friendId || '';
      let queuedMessage: any;
      let isAdded = false;
      let isUpdated = false;
      let isChatDone = false;
      let isRenderedChatMessage = false;

      const queuedMessageData = {
        _id: '',
        queueId,
        message,
        timestamp,
        sender: getSender(selectedChat?.members, timestamp, _id),
        receivers: getReceivers(selectedChat?.members, _id),
      };

      if (!chatIdToUse && fullFriendId) {
        setLoadingCreateChat(true);

        queuedMessage = {
          ...queuedMessageData,
          chatId: fullFriendId,
        };

        await renderMessage(
          cachedMessagesClient,
          queuedMessage,
          fullFriendId,
          setScrollToBottom,
        );

        deleteFriend(friendsClient, _id, friendIdToUse);

        const friend = {
          ...selectedChat,
          lastMessage: queuedMessage,
        };

        const { isChatAdded, isChatUpdated } = addUpdateChat(
          chatsClient,
          _id,
          friendIdToUse,
          '_id',
          friend,
          undefined,
          true,
        );

        isChatDone = isChatAdded || isChatUpdated;

        const addedQueuedMessage = await MessageQueue.addMessageToQueue(
          queuedMessage,
        ).catch((err) => {
          console.error('Error adding to queue:', err);
          return null;
        });

        if (addedQueuedMessage) {
          queuedMessage = addedQueuedMessage;
          isAdded = true;
        }

        const newChat = await createChat({
          variables: {
            userId: _id,
            type: 'private',
            friendIds: [friendIdToUse],
            friendUserIds: [friendUserId],
          },
        });

        const createdChatData = newChat?.data?.createChat;
        const createdChatIsAlreadyCreated = createdChatData?.isAlreadyCreated;
        const createdChat = createdChatData?.chat;
        const createdChatId = createdChat?._id;
        const createdChatFriends = createdChat?.friends;
        const createdChatFriendId = createdChatFriends?.[0]?._id;

        if (!createdChatId || !createdChatFriendId)
          throw new Error('Failed to create chat');

        const { isRendered } = await renderMessage(
          cachedMessagesClient,
          queuedMessage,
          createdChatId,
        );
        isRenderedChatMessage = isRendered;

        deleteFriendsCachedMessages(cachedMessagesClient, fullFriendId);

        chatIdToUse = createdChatId;
        friendIdToUse = createdChatFriendId;
        const { friends, ...rest } = createdChat || {};
        const chatData = {
          ...rest,
          lastMessage: queuedMessage,
        };

        if (createdChatIsAlreadyCreated) {
          addUpdateChat(chatsClient, _id, chatIdToUse, '_id', chatData);
        } else {
          addUpdateChat(chatsClient, _id, friendIdToUse, '_id', chatData);
        }

        const newData = {
          chatId: chatIdToUse,
        };

        const updatedQueuedMessage = await MessageQueue.updateMessageToQueue(
          queueId,
          newData,
        ).catch((err) => {
          console.error('Error updating to queue:', err);
          return null;
        });

        if (updatedQueuedMessage) {
          queuedMessage = updatedQueuedMessage;
          isUpdated = true;
        }

        if (!isUpdated) {
          queuedMessage = {
            ...queuedMessage,
            ...newData,
          };
        }

        if (
          friendId &&
          friendIdToUse &&
          chatIdToUse &&
          friendId === friendIdToUse
        ) {
          setSearchParams(
            (params) => {
              params.set('id', chatIdToUse);
              params.set('type', 'chat');
              return params;
            },
            { replace: true },
          );
        }

        setLoadingCreateChat(false);
      }

      if (chatIdToUse) {
        queuedMessage = queuedMessage || {
          ...queuedMessageData,
          chatId: chatIdToUse,
        };

        if (!isRenderedChatMessage) {
          await renderMessage(
            cachedMessagesClient,
            queuedMessage,
            chatIdToUse,
            setScrollToBottom,
          );
        }

        if (!isChatDone) {
          addUpdateChat(
            chatsClient,
            _id,
            chatIdToUse,
            '_id',
            queuedMessage,
            'lastMessage',
            true,
          );
        }

        if (!isAdded) {
          const addedQueuedMessage = await MessageQueue.addMessageToQueue(
            queuedMessage,
          ).catch((err) => {
            console.error('Error adding to queue:', err);
            return null;
          });

          if (addedQueuedMessage) {
            queuedMessage = addedQueuedMessage;
          }
        }

        const queuedMessageSender = queuedMessage?.sender;
        const queuedMessageQueuedStatus = queuedMessageSender?.queuedStatus;
        const queuedMessageQueuedStatusIsQueued =
          queuedMessageQueuedStatus?.isQueued || true;
        const queuedMessageQueuedStatusTimestamp =
          queuedMessageQueuedStatus?.timestamp || timestamp;

        const createdMessage = await createMessage({
          variables: {
            chatId: chatIdToUse,
            userId: _id,
            queueId,
            isQueued: queuedMessageQueuedStatusIsQueued,
            queuedTimestamp: queuedMessageQueuedStatusTimestamp,
            isSent: true,
            sentTimestamp: Date.now(),
            message,
          },
        });

        const createdMessageData = createdMessage?.data?.createMessage;
        const createdMessageId = createdMessageData?._id;
        const createdMessageQueueId = createdMessageData?.queueId;
        if (!createdMessageId) throw new Error('Failed to create message');

        if (createdMessageQueueId) {
          await MessageQueue.deleteMessageFromQueue(createdMessageQueueId);
        }
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoadingCreateChat(false);
      setLoadingCreateMessage(false);
    }
  };

  const loading = isFetchingChats || isFetchingFriends;

  const renderSecondary = () => {
    if (userOnlineStatusLoading) return '';
    const onlineStatus = userOnlineStatus?.userOnlineStatus?.onlineStatus;
    if (onlineStatus) {
      const isOnline = onlineStatus?.isOnline;
      const lastSeen = onlineStatus?.lastSeen;
      if (isOnline) {
        return 'online';
      }
      if (!isOnline && lastSeen) {
        const lastSeenStr = `last seen ${getDateLabel2(lastSeen, false, {
          day: 'numeric',
          month: 'numeric',
          year: '2-digit',
        })} at ${getTime(lastSeen)}`;
        return lastSeenStr;
      }
    }
    return selectedChatDetails?.email;
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  const renderMessageReceivers = () => {
    const { isPrivateChat } = getChatType(selectedChat);

    if (isPrivateChat) {
      const { isDelivered, isRead, deliveredTimestamp, readTimestamp } =
        checkMessageStatus(selectedMessage, selectedChat);

      const items = [
        {
          title: 'Read',
          messageStatus: {
            isRead: true,
          },
          isVisible: isRead,
          timestamp: readTimestamp,
        },
        {
          title: 'Delivered',
          messageStatus: {
            isDelivered: true,
          },
          isVisible: isDelivered,
          timestamp: deliveredTimestamp,
        },
      ];

      return (
        <div className="chat-drawer-details-wrapper">
          <div className="chat-drawer-details-box">
            <div className="chat-drawer-details">
              {items?.map((item, idx) => (
                <Fragment key={item?.title}>
                  <div
                    className={`chat-drawer-details-item ${item?.isVisible && item?.timestamp ? 'chat-drawer-details-item-2' : ''}`}
                  >
                    <div className="chat-drawer-details-heading">
                      <MessageStatus messageStatus={item?.messageStatus} />
                      <Typography fontWeight={500}>{item?.title}</Typography>
                    </div>
                    <div className="chat-drawer-details-content">
                      {item?.isVisible && item?.timestamp ? (
                        <>
                          <Typography
                            fontWeight={450}
                            className="chat-drawer-content-date"
                          >
                            {getDateLabel2(item?.timestamp, true, {
                              day: '2-digit',
                              month: '2-digit',
                              year: '2-digit',
                            })}
                          </Typography>
                          <Typography
                            fontWeight={500}
                            className="chat-drawer-content-time"
                          >
                            {getTime(item?.timestamp)}
                          </Typography>
                        </>
                      ) : (
                        <Typography fontSize="0.875rem">
                          &#x26AC;&#x26AC;&#x26AC;
                        </Typography>
                      )}
                    </div>
                  </div>
                  {idx === 0 ? <Divider sx={{ ml: 3.125 }} /> : null}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  const renderMessageDrawer = () => {
    return (
      <ChatDrawerStyled>
        <div className="chat-drawer-heading-wrapper">
          {isExtraLargeOrAbove ? (
            <IconButton onClick={handleClickCloseMessage}>
              <CloseRoundedIcon />
            </IconButton>
          ) : null}
          <Typography fontWeight={600} className="chat-drawer-heading">
            Message Info
          </Typography>
        </div>
        <Divider />
        <div className="chat-drawer-msg-wrapper">
          <ChatMessage msg={selectedMessage} isClickDisabled />
        </div>
        <Divider />
        {renderMessageReceivers()}
      </ChatDrawerStyled>
    );
  };

  const handleClickCloseMessage = () => {
    toggleDrawer(setIsMessageDrawerOpen);
    setTimeout(() => {
      setSelectedMessage(null);
    }, 200);
  };

  return (
    <ChatsStyled
      navBarHeight={navBarHeight}
      menuWidth={menuWidth}
      message={message}
    >
      <MainLayout
        disablePadding={!isError}
        onError={() => setIsError(true)}
        className={isError ? 'chats-main-layout-error' : ''}
      >
        <div style={{ display: 'flex' }}>
          <ChatsMainStyled
            open={isExtraLargeOrAbove ? isMessageDrawerOpen : false}
            drawerWidth={isExtraLargeOrAbove ? getDrawerWidth() : 0}
          >
            <div className="top-app-bar-wrapper">
              <ChatsAppBarStyled
                position="static"
                className="app-bar"
                open={isExtraLargeOrAbove ? isMessageDrawerOpen : false}
                drawerWidth={isExtraLargeOrAbove ? getDrawerWidth() : 0}
                ref={appBarRef}
              >
                <Toolbar className="top-app-bar-tool-bar">
                  <div className="top-app-bar">
                    {isExtraSmallOrBelow ? (
                      <IconButton
                        size="small"
                        className="top-app-bar-back-btn"
                        onClick={handleClickBack}
                      >
                        <ArrowBackIosNewIcon />
                      </IconButton>
                    ) : null}
                    <MainLayout
                      disablePadding
                      loadingData={loading}
                      loadingDataProps={{
                        dense: true,
                        disablePadding: true,
                        disableGutters: true,
                      }}
                    >
                      <List dense disablePadding>
                        <ListItem
                          disablePadding
                          disableGutters
                          disableHover
                          btnProps={{
                            disableGutters: true,
                            textProps: {
                              primary: selectedChatDetails?.name,
                              secondary: renderSecondary(),
                            },
                            style: {
                              WebkitLineClamp: 1,
                            },
                            avatarProps: {
                              name: selectedChatDetails?.name,
                              src: selectedChatDetails?.picture,
                            },
                          }}
                        />
                      </List>
                    </MainLayout>
                  </div>
                </Toolbar>
              </ChatsAppBarStyled>
            </div>
            {loadingChats ? null : (
              <ChatGroups
                appBarHeight={appBarHeight}
                textFieldHeight={textFieldHeight}
              />
            )}
            <div className="text-field-app-bar-wrapper">
              <ChatsAppBarStyled
                position="static"
                className="text-field-app-bar app-bar"
                open={isExtraLargeOrAbove ? isMessageDrawerOpen : false}
                drawerWidth={isExtraLargeOrAbove ? getDrawerWidth() : 0}
                ref={textFieldRef}
              >
                <Toolbar variant="dense" disableGutters>
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
              </ChatsAppBarStyled>
            </div>
          </ChatsMainStyled>
          <Drawer
            open={isMessageDrawerOpen}
            onClose={handleClickCloseMessage}
            variant={isExtraLargeOrAbove ? 'persistent' : 'temporary'}
            anchor="right"
          >
            {renderMessageDrawer()}
          </Drawer>
        </div>
      </MainLayout>
    </ChatsStyled>
  );
};

export default Chats;
