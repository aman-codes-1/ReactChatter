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
import {
  groupMessages,
  groupNewMessageForOtherMember,
  mergeByDateLabel,
  scrollIntoView,
  updateNewMessageInGroup,
} from '../../../helpers';
import ChatBubble from './ChatBubble';
import { ChatGroupsStyled } from './Chats.styled';
import { MESSAGE_GROUPS_QUERY } from '../../../contexts/Messages';

const ChatGroups = ({ appBarHeight, textFieldHeight }: any) => {
  const MessageQueue = new MessageQueueService();
  const [navbarHeight] = useOutletContext<any>();
  const [searchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const friendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const [isResize, setIsResize] = useState(false);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [hasFetched, setHasFetched] = useState(false);
  const { auth: { _id = '' } = {} } = useAuth();
  const { isListItemClicked } = useContext(ChatsAndFriendsContext);
  const {
    messagesClient,
    subscribeMessagesToMore,
    fetchMoreMessages,
    loadingChatMessages,
    setLoadingChatMessages,
    messageGroups = [],
    messagesPageInfo = {},
    messageGroupsClient,
    setMessageGroups,
    scrollToBottom,
    getCombinedMessages,
    getChatMessagesWithQueue,
  } = useContext(MessagesContext);
  const scrollRef = useRef<any>(null);
  const scrollBottomRef = useRef<any>(null);
  const unsubscribeRef = useRef<() => void>();

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      scrollIntoView(scrollBottomRef);
    });
  }, [scrollToBottom]);

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
          // const messages = prev?.messages?.length
          //   ? [...prev.messages, OnMessageAddedMessage]
          //   : [OnMessageAddedMessage];

          // const groupedMessages = groupMessages(messages, _id);
          // setMessageGroups(groupedMessages);
          setMessageGroups((prev: any) => {
            const updatedMessageGroups = groupNewMessageForOtherMember(
              prev,
              OnMessageAddedMessage,
            );
            return updatedMessageGroups;
          });
        } else {
          setMessageGroups((prev: any) => {
            const updatedMessageGroups = updateNewMessageInGroup(
              prev,
              OnMessageAddedQueueId,
              OnMessageAddedMessage,
            );
            return updatedMessageGroups;
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

  const fetchData = async (fetchFunction: any, id: string, key: string) => {
    try {
      await fetchFunction(id, key);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingChatMessages(false);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (chatId) {
        await fetchData(getChatMessagesWithQueue, chatId, 'chatId');
      }

      if (friendId) {
        await fetchData(getCombinedMessages, friendId, 'friendId');
      }
    };

    fetchMessages();
  }, []);

  if (loadingChatMessages) {
    return null;
  }

  const handleScroll = async () => {
    if (scrollRef?.current && messageGroups?.length) {
      const currentScrollTop = scrollRef?.current?.scrollTop;
      // const scrollHeight = scrollRef?.current?.scrollHeight;
      const isScrollingUp = currentScrollTop < prevScrollTop;

      const minScrollTop = 300;

      if (
        messagesPageInfo?.hasNextPage === true &&
        currentScrollTop < minScrollTop &&
        isScrollingUp &&
        !hasFetched
      ) {
        setHasFetched(true);
        // const currentScrollPos = scrollHeight - currentScrollTop;
        // scrollRef.current.scrollTop = minScrollTop;

        const moreMessages = await fetchMoreMessages({
          variables: {
            chatId,
            after: messagesPageInfo?.endCursor,
          },
          updateQuery: (prev: any, { fetchMoreResult }: any) => {
            if (!fetchMoreResult) return prev;
            return {
              messages: fetchMoreResult?.messages,
            };
          },
        });

        const newMessagesData = moreMessages?.data?.messages;
        const newMessages = newMessagesData?.edges;
        const newPageInfo = newMessagesData?.pageInfo;

        if (newMessages?.length) {
          const groupedNewMessages = groupMessages(newMessages, _id);
          const updatedNewMessageGroups = mergeByDateLabel(
            messageGroups,
            groupedNewMessages,
          );

          messageGroupsClient.writeQuery({
            query: MESSAGE_GROUPS_QUERY,
            data: {
              messageGroups: {
                data: updatedNewMessageGroups,
                pageInfo: newPageInfo,
              },
            },
            variables: { chatId },
          });
        }

        // setTimeout(() => {
        //   if (scrollRef?.current) {
        //     scrollRef.current.scrollTop =
        //       scrollRef.current?.scrollHeight - currentScrollPos;
        //   }
        //   // setLoading(false);
        // }, 0);
      }

      if (currentScrollTop >= minScrollTop) {
        setHasFetched(false);
      }

      setPrevScrollTop(currentScrollTop);
    }
  };

  return (
    <ChatGroupsStyled
      navbarHeight={navbarHeight}
      appBarHeight={appBarHeight}
      textFieldHeight={textFieldHeight}
    >
      <div className="chat-container" ref={scrollRef} onScroll={handleScroll}>
        {!messageGroups?.length ? (
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
            <div ref={scrollBottomRef} />
          </div>
        ) : null}
      </div>
    </ChatGroupsStyled>
  );
};

export default ChatGroups;
