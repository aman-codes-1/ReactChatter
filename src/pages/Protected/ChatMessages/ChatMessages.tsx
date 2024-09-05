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
import {
  AppBar,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Avatar, ListItem } from '../../../components';
import { MESSAGES_QUERY, useAuth, useMessages } from '../../../hooks';
import { ChatsAndFriendsContext } from '../../../contexts';
import {
  checkWrapping,
  getTime,
  handleKeyPress,
  scrollIntoView,
  setFocus,
  updateHeight,
} from '../../../helpers';
import { ChatMessagesStyled } from './ChatMessages.styled';

const ChatMessages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarHeight] = useOutletContext<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const friendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const [message, setMessage] = useState('');
  const [messagesQueue, setMessagesQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
    client,
    messagesData,
    loadingMessages,
    setMessages,
    messageGroups,
    setMessageGroups,
    messagesWithQueue,
  } = useMessages(chatId, setMessagesQueue);
  const inputRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const appBarRef = useRef<any>(null);
  const textFieldRef = useRef<any>(null);
  const msgRefs = useRef<any>([]);
  const msgQueueRefs = useRef<any>([]);

  const resetAllStates = () => {
    setMessages([]);
    setMessageGroups([]);
    setMessage('');
    setMessagesQueue([]);
    setLoading(false);
  };

  setFocus(inputRef);

  useLayoutEffect(() => {
    scrollIntoView(scrollRef);
    window.addEventListener('resize', () => scrollIntoView(scrollRef));

    return () => {
      window.removeEventListener('resize', () => scrollIntoView(scrollRef));
    };
  }, [
    chatsLoading,
    otherFriendsLoading,
    messageGroups,
    messagesQueue,
    location?.state?.isListItemClicked,
  ]);

  useLayoutEffect(() => {
    const checkColumns = () => {
      if (messageGroups?.length) {
        messageGroups?.map((messageGroup) => {
          if (messageGroup?.data?.length) {
            messageGroup?.data?.map((_: any, index: number) => {
              const result = checkWrapping(msgRefs, index);
              console.log(result);
              if (result?.timeStampDiv) {
                if (result?.isColumn) {
                  result?.timeStampDiv?.classList?.add?.('msg-column');
                } else {
                  result?.timeStampDiv?.classList?.add?.('msg-row');
                }
              }
            });
          }
        });
      }
    };

    checkColumns();

    window.addEventListener('resize', checkColumns);

    return () => {
      window.removeEventListener('resize', checkColumns);
    };
  }, [messagesWithQueue]);

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
  }, [messagesWithQueue, selectedMember]);

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
  }, [messagesWithQueue, selectedMember]);

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

  useLayoutEffect(() => {
    if (chatId || friendId) {
      resetAllStates();
    }
  }, [chatId, friendId]);

  useLayoutEffect(() => {
    const getCachedData = async () => {
      setLoading(true);
      const cachedData = await client?.readQuery({
        query: MESSAGES_QUERY,
        variables: {
          chatId,
        },
      });
      if (!cachedData) {
        messagesWithQueue(messagesData?.messages);
        setLoading(false);
      } else {
        messagesWithQueue(cachedData?.messages);
        setLoading(false);
      }
    };
    if (chatId) {
      getCachedData();
    }
  }, [messagesData, chatId]);

  if (chatError) {
    navigate('/');
  }

  if (
    loading ||
    loadingMessages ||
    (chatId && (chatsLoading || !chatsCalled)) ||
    (friendId && (otherFriendsLoading || !otherFriendsCalled))
  ) {
    return null;
  }

  const handleChangeMessage = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setMessage(e?.target?.value);
  };

  const handleSendMessage = async () => {
    if (!message) return;
    const timestamp = Date.now();
    setMessagesQueue((prev: any) => [
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

  const attachClass = (data: any, index: number, side: string) => {
    if (index === 0) {
      return `${side}First`;
    }
    if (data && Array.isArray(data) && index === data.length - 1) {
      return `${side}Last`;
    }
    return '';
  };

  const renderChat = (msg: any, index: number, data: any, side: string) => {
    return (
      <div className={`${side}Row`} key={msg?._id}>
        <Typography
          align="left"
          className={`msg ${side} ${attachClass(data, index, side)}`}
          ref={(el) => (msgRefs.current[index] = el)}
        >
          <span>{msg?.message}</span>
          <div className="msg-timestamp">
            {msg?.sender?.sentStatus?.timestamp ? (
              <Typography variant="caption">
                {getTime(msg?.sender?.sentStatus?.timestamp)}
              </Typography>
            ) : null}
            {side === 'right' ? (
              <>
                {msg?.sender?.sentStatus?.isSent === true ? (
                  <DoneIcon sx={{ fontSize: 16, p: '0px 2px' }} />
                ) : null}
                {msg?.receiver?.readStatus?.isRead === true ? (
                  <DoneAllIcon sx={{ fontSize: 16, p: '0px 2px' }} />
                ) : null}
              </>
            ) : null}
          </div>
        </Typography>
      </div>
    );
  };

  const IsNoMessages = !(messageGroups?.length || messagesQueue?.length);

  return (
    <ChatMessagesStyled
      navbarHeight={navbarHeight}
      appBarHeight={appBarHeight}
      textFieldHeight={textFieldHeight}
      IsNoMessages={IsNoMessages}
    >
      <div className="app-bar-wrapper">
        <AppBar position="static" className="app-bar" ref={appBarRef}>
          <Toolbar>
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
              ></ListItem>
            </List>
          </Toolbar>
        </AppBar>
      </div>
      <div className="chat-container">
        {IsNoMessages ? (
          <div className="no-messages-wrapper">No Messages</div>
        ) : null}
        {!loadingMessages &&
        !loading &&
        (messageGroups?.length || messagesQueue?.length) ? (
          <div className="chat-wrapper">
            {messageGroups?.map((messageGroup: any, idx: number) => (
              <Grid
                container
                spacing={2}
                justifyContent={
                  messageGroup?.side === 'right' ? 'flex-end' : 'flex-start'
                }
                alignItems="flex-end"
                key={`${JSON.stringify(messageGroup)} ${idx}`}
              >
                {messageGroup?.side === 'left' && (
                  <Grid>
                    <Avatar src="" width={32} height={32} />
                  </Grid>
                )}
                <Grid size={8}>
                  {messageGroup?.data?.length
                    ? messageGroup?.data?.map((msg: any, index: number) =>
                        renderChat(
                          msg,
                          index,
                          messageGroup?.data,
                          messageGroup?.side,
                        ),
                      )
                    : null}
                </Grid>
              </Grid>
            ))}
            {messagesQueue?.map((messageQueue: any, idx: number) => {
              return (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-end"
                  key={`${JSON.stringify(messageQueue)} ${idx}`}
                >
                  <Grid size={8}>
                    <div className="rightRow">
                      <Typography
                        align="left"
                        className="msg right"
                        ref={(el) => (msgQueueRefs.current[idx] = el)}
                      >
                        {messageQueue?.message}
                        <div className="msg-timestamp">
                          {messageQueue?.timestamp ? (
                            <Typography variant="caption">
                              {getTime(messageQueue?.timestamp)}
                            </Typography>
                          ) : null}
                          <AccessTimeIcon
                            sx={{ fontSize: 14, p: '0px 2.6px' }}
                          />
                        </div>
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              );
            })}
            <div ref={scrollRef} />
          </div>
        ) : null}
      </div>
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
