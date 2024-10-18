import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Chip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Avatar } from '../../../components';
import { useAuth } from '../../../hooks';
import {
  ChatsAndFriendsContext,
  MESSAGE_ADDED_SUBSCRIPTION,
  MESSAGES_QUERY,
  MessagesContext,
} from '../../../contexts';
import { MessageQueueService } from '../../../services';
import { groupMessages, scrollIntoView } from '../../../helpers';
import ChatBubble from './ChatBubble';
import { ChatMessagesStyled } from './Chats.styled';

const ChatMessages = ({ appBarHeight, textFieldHeight, message }: any) => {
  const MessageQueue = new MessageQueueService();
  const [navbarHeight] = useOutletContext<any>();
  const [searchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const friendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const [isResize, setIsResize] = useState(false);
  const { auth: { _id = '' } = {} } = useAuth();
  const { isListItemClicked } = useContext(ChatsAndFriendsContext);
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
    requestAnimationFrame(() => {
      scrollIntoView(scrollRef);
    });
  }, [messageGroups, isListItemClicked]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsResize((prev) => !prev);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  if (loadingChatMessages) {
    return null;
  }

  const IsNoMessages = !messageGroups?.length;

  return (
    <ChatMessagesStyled
      navbarHeight={navbarHeight}
      appBarHeight={appBarHeight}
      textFieldHeight={textFieldHeight}
    >
      <div className="chat-container">
        {IsNoMessages ? (
          <div className="no-messages-wrapper">No Messages</div>
        ) : null}
        {messageGroups?.length ? (
          <div className="chat-wrapper">
            <div className="chat-grid">
              {messageGroups?.map((messageGroup: any, index: number) => (
                <div
                  className="chat-group"
                  key={`${messageGroup?.dateLabel}-${index}`}
                >
                  {messageGroup?.dateLabel ? (
                    <div className="date-label-wrapper">
                      <Chip
                        size="small"
                        variant="outlined"
                        label={messageGroup?.dateLabel}
                        className="date-label-chip"
                      />
                    </div>
                  ) : null}
                  {messageGroup?.groups?.length
                    ? messageGroup?.groups?.map((group: any, idx: number) => (
                        <div
                          className="chat-group-grid"
                          key={`${group?.data?.[0]?._id}-${idx}`}
                        >
                          <Grid
                            container
                            spacing={2}
                            justifyContent={
                              group?.side === 'right'
                                ? 'flex-end'
                                : 'flex-start'
                            }
                            alignItems="flex-end"
                          >
                            {group?.side === 'left' && (
                              <Grid>
                                <Avatar src="" width={32} height={32} />
                              </Grid>
                            )}
                            {group?.data?.length ? (
                              <Grid
                                size={8.15}
                                gap={0.6}
                                display="flex"
                                flexDirection="column"
                                alignItems={
                                  group?.side === 'right'
                                    ? 'flex-end'
                                    : 'flex-start'
                                }
                              >
                                {group?.data?.map((msg: any, i: number) => (
                                  <ChatBubble
                                    msg={msg}
                                    index={i}
                                    data={group?.data}
                                    side={group?.side}
                                    isResize={isResize}
                                    key={`${msg?._id}-${i}-${isResize}`}
                                  />
                                ))}
                              </Grid>
                            ) : null}
                          </Grid>
                        </div>
                      ))
                    : null}
                </div>
              ))}
            </div>
            <div ref={scrollRef} />
          </div>
        ) : null}
      </div>
    </ChatMessagesStyled>
  );
};

export default ChatMessages;
