import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from '../../../components';
import { useAuth } from '../../../hooks';
import {
  ChatsAndFriendsContext,
  MESSAGE_ADDED_SUBSCRIPTION,
  MESSAGES_QUERY,
  MessagesContext,
} from '../../../contexts';
import { MessageQueueService } from '../../../services';
import { getTime, groupMessages, scrollIntoView } from '../../../helpers';
import { ChatsStyled } from './Chats.styled';

const ChatMessages = ({ appBarHeight, textFieldHeight, message }: any) => {
  const MessageQueue = new MessageQueueService();
  const [navbarHeight] = useOutletContext<any>();
  const [searchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const friendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const { auth: { _id = '' } = {} } = useAuth();
  const { isListItemClicked, selectedChat } = useContext(
    ChatsAndFriendsContext,
  );
  const {
    messagesClient,
    subscribeMessagesToMore,
    loadingChatMessages,
    setLoadingChatMessages,
    messageGroups = [],
    setMessageGroups,
    getChatMessagesWithQueue,
    getFriendMessagesWithQueue,
  } = useContext(MessagesContext);
  const scrollRef = useRef<any>(null);
  const unsubscribeRef = useRef<() => void>();

  useLayoutEffect(() => {
    if (selectedChat) {
      requestAnimationFrame(() => {
        scrollIntoView(scrollRef);
      });
    }
  }, [messageGroups, isListItemClicked, selectedChat]);

  const updateQuery = useCallback(
    async (prev: any, { subscriptionData }: any) => {
      if (!subscriptionData?.data) return prev;

      const OnMessageAdded = subscriptionData?.data?.OnMessageAdded;
      const OnMessageAddedChatId = OnMessageAdded?.chatId;
      const OnMessageAddedMessage = OnMessageAdded?.message;
      const OnMessageAddedQueueId = OnMessageAddedMessage?.queueId;
      const OnMessageAddedOtherMembers = OnMessageAddedMessage?.otherMembers;

      const isAlreadyExists = prev?.messages?.length
        ? prev?.messages?.some(
            (message: any) => message?._id === OnMessageAddedMessage?._id,
          )
        : false;

      const isChatExists = OnMessageAddedChatId === chatId;

      if (!isAlreadyExists && isChatExists) {
        const isOtherMember = OnMessageAddedOtherMembers?.length
          ? OnMessageAddedOtherMembers?.some(
              (otherMember: any) => otherMember?._id === _id,
            )
          : false;

        if (isOtherMember) {
          const messages = prev?.messages?.length
            ? [...prev.messages, OnMessageAddedMessage]
            : [OnMessageAddedMessage];

          const messageGroupsData = groupMessages(messages, _id);
          setMessageGroups(messageGroupsData);
        } else {
          setMessageGroups((prevGroups: any) => {
            if (!prevGroups?.length) return prevGroups;

            const updatedGroups = prevGroups?.map((group: any) => {
              const index = group?.data?.findIndex(
                (item: any) => item?.id === OnMessageAddedQueueId,
              );

              if (index < 0) return group;

              const dataCopy = [...group.data];
              dataCopy[index] = OnMessageAddedMessage;

              return {
                ...group,
                data: dataCopy,
              };
            });

            return updatedGroups;
          });

          await MessageQueue.deleteMessageFromQueue(OnMessageAddedQueueId);
        }

        const data = {
          ...prev,
          messages: prev?.messages?.length
            ? [...prev.messages, OnMessageAddedMessage]
            : [OnMessageAddedMessage],
        };

        messagesClient.writeQuery({
          query: MESSAGES_QUERY,
          data,
          variables: {
            chatId,
          },
        });

        return data;
      }

      return prev;
    },
    [chatId, setMessageGroups, messagesClient],
  );

  useEffect(() => {
    if (unsubscribeRef?.current) {
      unsubscribeRef?.current();
    }

    unsubscribeRef.current = subscribeMessagesToMore({
      document: MESSAGE_ADDED_SUBSCRIPTION,
      updateQuery,
      variables: {
        chatId,
      },
    });

    return () => {
      if (unsubscribeRef?.current) {
        unsubscribeRef?.current();
      }
    };
  }, [chatId, subscribeMessagesToMore, updateQuery]);

  const fetchData = async (id: string, fetchQuery: any) => {
    try {
      await fetchQuery(id);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingChatMessages(false);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (chatId) {
        await fetchData(chatId, getChatMessagesWithQueue);
      }

      if (friendId) {
        await fetchData(friendId, getFriendMessagesWithQueue);
      }
    };

    fetchMessages();
  }, []);

  const attachClass = (data: any, index: number, side: string) => {
    if (index === 0) {
      return `msg-${side}-first`;
    }
    if (data && Array.isArray(data) && index === data.length - 1) {
      return `msg-${side}-last`;
    }
    return '';
  };

  const renderChat = (msg: any, index: number, data: any, side: string) => {
    if (!msg) return null;

    const sender = msg?.sender;
    const sentStatus = sender?.sentStatus;
    const sentTimeStamp = sentStatus?.timestamp;
    const isQueued = sentStatus?.isQueued;
    const isSent = sentStatus?.isSent;

    let readStatus;
    let readTimestamp;
    let isRead;

    if (selectedChat && selectedChat?.type === 'private') {
      const receivers = msg?.otherMembers;
      readStatus =
        receivers?.length === 1 &&
        receivers?.find((otherMember: any) => otherMember?._id !== _id);
      readTimestamp = readStatus?.timestamp;
      isRead = readStatus?.isRead;
    }

    return (
      <div
        className={`msg-${side}-row`}
        key={`${JSON.stringify(msg)} ${index}`}
      >
        <div
          className={`msg msg-${side} ${attachClass(data, index, side)} ${isQueued ? 'msg-animation' : ''}`}
        >
          {msg?.message ? (
            <Typography className={`msg-content msg-content-${side}`}>
              {msg?.message}
            </Typography>
          ) : null}
          {sentStatus || readStatus ? (
            <div className="msg-timestamp">
              {sentTimeStamp ? (
                <Typography
                  variant="caption"
                  whiteSpace="nowrap"
                  fontWeight={500}
                  className={`msg-timestamp-text-${side}`}
                >
                  {getTime(sentTimeStamp)}
                </Typography>
              ) : null}
              {side === 'right' ? (
                <>
                  {isQueued === true ? (
                    <AccessTimeIcon fontSize="inherit" />
                  ) : null}
                  {isSent === true ? (
                    <DoneRoundedIcon fontSize="inherit" />
                  ) : null}
                  {isRead === true ? (
                    <DoneAllRoundedIcon fontSize="inherit" />
                  ) : null}
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  if (loadingChatMessages) {
    return null;
  }

  const IsNoMessages = !messageGroups?.length;

  return (
    <ChatsStyled
      navbarHeight={navbarHeight}
      appBarHeight={appBarHeight}
      textFieldHeight={textFieldHeight}
      message={message}
    >
      <div className="chat-container">
        {IsNoMessages ? (
          <div className="no-messages-wrapper">No Messages</div>
        ) : null}
        {messageGroups?.length ? (
          <div className="chat-wrapper">
            <div className="chat-grid">
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
            </div>
            <div ref={scrollRef} />
          </div>
        ) : null}
      </div>
    </ChatsStyled>
  );
};

export default ChatMessages;
