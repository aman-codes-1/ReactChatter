import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client';
import { useAuth, useClient, useSocket } from '../../hooks';
import {
  addArray,
  addObject,
  addRequest,
  checkIsMemberExists,
  clickChat,
  findAndMoveToTop,
  findAndUpdate,
  getChatType,
  getFriendId,
  getLastMessage,
  getMember,
  removeObject,
  removeRequest,
  sortByLastMessageTimestamp,
  sortByTimestamp,
  toggleDrawer,
  uniqueQueuedMessages,
} from '../../helpers';
import { MessageQueueService } from '../../services';
import {
  CACHED_MESSAGES_QUERY,
  CHAT_ADDED_SUBSCRIPTION,
  CHATS_QUERY,
  CHAT_UPDATED_SUBSCRIPTION,
  CREATE_CHAT_MUTATION,
  CREATE_MESSAGE_MUTATION,
  CREATE_REQUEST_MUTATION,
  FRIEND_ADDED_SUBSCRIPTION,
  FRIENDS_QUERY,
  FRIENDS_SORTED_QUERY,
  MESSAGE_ADDED_SUBSCRIPTION,
  MESSAGE_UPDATED_SUBSCRIPTION,
  MESSAGES_QUERY,
  PENDING_REQUESTS_QUERY,
  REQUEST_ADDED_SUBSCRIPTION,
  REQUEST_UPDATED_SUBSCRIPTION,
  SENT_REQUESTS_QUERY,
  SHOULD_NOTIFY_USER_MUTATION,
  UPDATE_REQUEST_MUTATION,
  USER_CLIENT_QUERY,
  USER_CLIENT_UPDATED_SUBSCRIPTION,
  USER_ONLINE_STATUS_SUBSCRIPTION,
  USER_ONLINE_STATUS_QUERY,
} from '..';

export const ChatsAndFriendsContext = createContext<any>({});

export const ChatsAndFriendsProvider = ({ children }: any) => {
  const client = useApolloClient();
  const MessageQueue = new MessageQueueService();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const fullFriendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const { friendId } = getFriendId(fullFriendId);
  const [isHomeButtonClicked, setIsHomeButtonClicked] = useState(false);
  const [isListItemClicked, setIsListItemClicked] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [selectedChatDetails, setSelectedChatDetails] = useState<any>(null);
  const [loadingCreateMessage, setLoadingCreateMessage] = useState(false);
  const [loadingProcessNextMessage, setLoadingProcessNextMessage] =
    useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [scrollToPosition, setScrollToPosition] = useState(false);
  const [isRefetchingMessages, setIsRefetchingMessages] = useState(false);
  const [isFetchingMessages, setIsFetchingMessages] = useState(true);
  const [isFetchingChats, setIsFetchingChats] = useState(true);
  const [isFetchingFriends, setIsFetchingFriends] = useState(true);
  const [isFetchingChats2, setIsFetchingChats2] = useState(true);
  const [isFetchingFriends2, setIsFetchingFriends2] = useState(true);
  const [currentChats, setCurrentChats] = useState<any>([]);
  const [currentFriends, setCurrentFriends] = useState<any>([]);
  const [toggleChats, setToggleChats] = useState(false);
  const [toggleFriends, setToggleFriends] = useState(false);
  const [isChatsVisible, setIsChatsVisible] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isNewChatDrawerOpen, setIsNewChatDrawerOpen] = useState(false);
  const [isMessageDrawerOpen, setIsMessageDrawerOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const { auth: { _id = '' } = {} } = useAuth();
  const { isWsConnected, isNetworkError } = useClient();
  const { socket } = useSocket();
  const prevPathname = `${location?.pathname}${location?.search}`;

  const {
    data: { userClient = {} } = {},
    loading: userClientLoading,
    error: userClientError,
    client: userClientClient,
    refetch: refetchUserClient,
  } = useQuery(USER_CLIENT_QUERY, { variables: { userId: _id } });

  const {
    data: {
      cachedMessages: {
        edges: messages = [],
        pageInfo: messagesPageInfo = {},
        scrollPosition: messagesScrollPosition = 0,
        isFetched: messagesIsFetched = true,
      } = {},
    } = {},
    client: cachedMessagesClient,
  } = useQuery(CACHED_MESSAGES_QUERY, {
    fetchPolicy: 'cache-only',
    variables: { chatId: chatId || fullFriendId },
    skip: !chatId && !fullFriendId,
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: messagesLoading,
    error: messagesError,
    called: messagesCalled,
    fetchMore: fetchMoreMessages,
    refetch: refetchMessages,
    subscribeToMore: subscribeMessagesToMore,
  } = useQuery(MESSAGES_QUERY, {
    fetchPolicy: 'no-cache',
    variables: { chatId },
    skip: !chatId || !!fullFriendId || !!selectedChat || !!selectedChatDetails,
    onCompleted: async (data) => {
      const messagesData = data?.messages;
      let edges = messagesData?.edges;
      const pageInfo = messagesData?.pageInfo;
      const scrollPosition = messagesData?.scrollPosition;
      const isFetched = messagesData?.isFetched;
      if (chatId && !isRefetchingMessages) {
        const fetchedQueuedMessages =
          (await getQueuedMessages(chatId, edges, pageInfo)) || [];
        const updatedData = addArray(fetchedQueuedMessages, edges);
        edges = sortByTimestamp(updatedData);
        cachedMessagesClient.writeQuery({
          query: CACHED_MESSAGES_QUERY,
          data: {
            cachedMessages: {
              edges,
              pageInfo,
              scrollPosition,
              isFetched,
            },
          },
          variables: { chatId },
        });
        setScrollToBottom((prev: boolean) => !prev);
      }
      setIsFetchingMessages(false);
      setIsRefetchingMessages(false);
    },
    onError: (error) => {
      setIsFetchingMessages(false);
      setIsRefetchingMessages(false);
      const err = error?.message;
      if (err?.includes('Chat not found')) {
        navigate('/');
      }
    },
  });

  const {
    data: userOnlineStatus,
    loading: userOnlineStatusLoading,
    error: userOnlineStatusError,
    client: userOnlineStatusClient,
    called: userOnlineStatusCalled,
  } = useQuery(USER_ONLINE_STATUS_QUERY, {
    variables: {
      userId: selectedChatDetails?._id,
    },
    skip: !selectedChat || !selectedChatDetails,
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: { chats = [] } = {},
    loading: chatsLoading,
    error: chatsError,
    client: chatsClient,
    called: chatsCalled,
    subscribeToMore: subscribeChatsToMore,
    refetch: refetchChats,
  } = useQuery(CHATS_QUERY, {
    variables: {
      userId: _id,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: async (data) => {
      const chatsData = data?.chats;
      if (chatsData?.length) {
        const res = await MessageQueue.getLastQueuedMessageByData(chatsData);
        if (res?.isUpdated) {
          const updatedChats = res?.data;
          if (updatedChats?.length) {
            const sortedChatsData = sortByLastMessageTimestamp(updatedChats);
            chatsClient.writeQuery({
              query: CHATS_QUERY,
              data: {
                chats: sortedChatsData,
              },
              variables: { userId: _id },
            });
          }
        }
      }
      setIsFetchingChats(false);
      setIsFetchingChats2(false);
    },
    onError: () => {
      setIsFetchingChats(false);
      setIsFetchingChats2(false);
      setIsFetchingFriends(false);
      setIsFetchingFriends2(false);
    },
  });

  const {
    data: { friends = [] } = {},
    loading: friendsLoading,
    error: friendsError,
    client: friendsClient,
    called: friendsCalled,
    subscribeToMore: subscribeFriendsToMore,
    refetch: refetchFriends,
  } = useQuery(FRIENDS_QUERY, {
    variables: {
      userId: _id,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: async (data) => {
      const friendsData = data?.friends;
      if (friendsData?.length) {
        const res = await MessageQueue.getLastQueuedMessageByData(
          friendsData,
          'friend',
          _id,
        );
        if (res?.isUpdated) {
          const updatedFriends = res?.data;
          if (updatedFriends?.length) {
            const dataWithLastMessage = updatedFriends?.filter(
              (el: any) => el?.lastMessage,
            );
            if (dataWithLastMessage?.length) {
              const chatsQuery = await chatsClient.readQuery({
                query: CHATS_QUERY,
                variables: { userId: _id },
              });
              const updatedData = addArray(
                dataWithLastMessage,
                chatsQuery?.chats || [],
              );
              const sortedChatsData = sortByLastMessageTimestamp(updatedData);
              chatsClient.writeQuery({
                query: CHATS_QUERY,
                data: {
                  chats: sortedChatsData,
                },
                variables: { userId: _id },
              });
              const dataWithoutLastMessage = updatedFriends?.filter(
                (el: any) => !el?.lastMessage,
              );
              const sortedFriendsData = sortByLastMessageTimestamp(
                dataWithoutLastMessage,
              );
              friendsClient.writeQuery({
                query: FRIENDS_QUERY,
                data: {
                  friends: sortedFriendsData,
                },
                variables: { userId: _id },
              });
            }
          }
        }
      }
      setIsFetchingFriends(false);
      setIsFetchingFriends2(false);
    },
    onError: () => {
      setIsFetchingChats(false);
      setIsFetchingChats2(false);
      setIsFetchingFriends(false);
      setIsFetchingFriends2(false);
    },
  });

  const [
    friendsSortedQuery,
    {
      data: { friendsSorted = [] } = {},
      loading: friendsSortedLoading,
      error: friendsSortedError,
      client: friendsSortedClient,
    },
  ] = useLazyQuery(FRIENDS_SORTED_QUERY, {
    fetchPolicy: 'network-only',
  });

  const {
    data: {
      pendingRequests: {
        data: pendingRequests = [],
        totalCount: pendingRequestsCount = 0,
      } = {},
    } = {},
    loading: pendingRequestsLoading,
    error: pendingRequestsError,
    client: pendingRequestsClient,
    called: pendingRequestsCalled,
    refetch: refetchPendingRequests,
  } = useQuery(PENDING_REQUESTS_QUERY, {
    variables: {
      userId: _id,
    },
  });

  const {
    data: {
      sentRequests: {
        data: sentRequests = [],
        totalCount: sentRequestsCount = 0,
      } = {},
    } = {},
    loading: sentRequestsLoading,
    error: sentRequestsError,
    client: sentRequestsClient,
    called: sentRequestsCalled,
    refetch: refetchSentRequests,
  } = useQuery(SENT_REQUESTS_QUERY, {
    variables: {
      userId: _id,
    },
  });

  const {
    data: OnMessageAdded,
    loading: OnMessageAddedLoading,
    error: OnMessageAddedError,
  } = useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    onData: async (res) => {
      const OnMessageAddedData = res?.data?.data?.OnMessageAdded;
      const OnMessageAddedMessage = OnMessageAddedData?.message;
      const OnMessageAddedMessageId = OnMessageAddedMessage?._id;
      const OnMessageAddedChatId = OnMessageAddedMessage?.chatId;
      const OnMessageAddedQueueId = OnMessageAddedMessage?.queueId;
      const OnMessageAddedSender = OnMessageAddedMessage?.sender;
      const OnMessageAddedSenderId = OnMessageAddedSender?._id;
      const OnMessageAddedReceivers = OnMessageAddedMessage?.receivers;

      const isSenderExists =
        OnMessageAddedSenderId && OnMessageAddedSenderId === _id;
      const isReceiverExists = OnMessageAddedReceivers?.length
        ? OnMessageAddedReceivers.some(
            (receiver: any) => receiver?._id && receiver?._id === _id,
          )
        : false;

      if (isSenderExists || isReceiverExists) {
        let edges: any[] = [];
        let pageInfo = {
          endCursor: OnMessageAddedMessageId,
          hasPreviousPage: false,
          hasNextPage: false,
        };
        let scrollPosition = 0;
        let isFetched = false;
        let isWrite = false;
        let isWriteChats = false;

        const cachedMessagesQuery = await cachedMessagesClient.readQuery({
          query: CACHED_MESSAGES_QUERY,
          variables: { chatId: OnMessageAddedChatId },
        });

        if (cachedMessagesQuery) {
          const cachedData = cachedMessagesQuery?.cachedMessages;
          edges = cachedData?.edges || [];
          pageInfo = cachedData?.pageInfo?.endCursor
            ? cachedData?.pageInfo
            : pageInfo;
          scrollPosition = cachedData?.scrollPosition;
          isFetched = cachedData?.isFetched;
        }

        if (isSenderExists) {
          const { isFoundAndUpdated, data } = findAndUpdate(
            OnMessageAddedQueueId,
            'queueId',
            edges,
            OnMessageAddedMessage,
          );
          if (isFoundAndUpdated && data?.length) {
            edges = data;
          } else {
            const updatedData = addObject(OnMessageAddedMessage, edges);
            edges = sortByTimestamp(updatedData);
          }
          isWrite = true;
        }

        if (isReceiverExists) {
          const updatedData = addObject(OnMessageAddedMessage, edges);
          edges = sortByTimestamp(updatedData);
          isWrite = true;
          isWriteChats = true;
        }

        if (isWrite) {
          cachedMessagesClient.writeQuery({
            query: CACHED_MESSAGES_QUERY,
            data: {
              cachedMessages: {
                edges,
                pageInfo,
                scrollPosition,
                isFetched,
              },
            },
            variables: { chatId: OnMessageAddedChatId },
          });
        }

        if (isWriteChats) {
          chatsClient.cache.modify({
            fields: {
              [`chats({"input":{"userId":"${_id}"}})`](existingData: any) {
                const data = findAndMoveToTop(
                  OnMessageAddedChatId,
                  '_id',
                  existingData,
                );
                return data;
              },
            },
          });
        }
      }
    },
  });

  const {
    data: OnMessageUpdated,
    loading: OnMessageUpdatedLoading,
    error: OnMessageUpdatedError,
  } = useSubscription(MESSAGE_UPDATED_SUBSCRIPTION, {
    onData: async (res) => {
      const OnMessageUpdatedData = res?.data?.data?.OnMessageUpdated;
      const OnMessageUpdatedMessage = OnMessageUpdatedData?.message;
      const OnMessageUpdatedMessageId = OnMessageUpdatedMessage?._id;
      const OnMessageUpdatedQueueId = OnMessageUpdatedMessage?.queueId;
      const OnMessageUpdatedChatId = OnMessageUpdatedMessage?.chatId;
      const OnMessageUpdatedSender = OnMessageUpdatedMessage?.sender;
      const OnMessageUpdatedSenderId = OnMessageUpdatedSender?._id;
      const OnMessageUpdatedReceivers = OnMessageUpdatedMessage?.receivers;

      const isSenderExists =
        OnMessageUpdatedSenderId && OnMessageUpdatedSenderId === _id;
      const isReceiverExists = OnMessageUpdatedReceivers?.length
        ? OnMessageUpdatedReceivers.some(
            (receiver: any) => receiver?._id && receiver?._id === _id,
          )
        : false;

      if (isSenderExists || isReceiverExists) {
        let edges: any[] = [];
        let pageInfo = {
          endCursor: OnMessageUpdatedMessageId,
          hasPreviousPage: false,
          hasNextPage: false,
        };
        let scrollPosition = 0;
        let isFetched = false;

        const cachedMessagesQuery = await cachedMessagesClient.readQuery({
          query: CACHED_MESSAGES_QUERY,
          variables: { chatId: OnMessageUpdatedChatId },
        });

        if (cachedMessagesQuery) {
          const cachedData = cachedMessagesQuery?.cachedMessages;
          edges = cachedData?.edges || [];
          pageInfo = cachedData?.pageInfo?.endCursor
            ? cachedData?.pageInfo
            : pageInfo;
          scrollPosition = cachedData?.scrollPosition;
          isFetched = cachedData?.isFetched;
        }

        const { isFoundAndUpdated, data } = findAndUpdate(
          OnMessageUpdatedQueueId,
          'queueId',
          edges,
          OnMessageUpdatedMessage,
        );
        if (isFoundAndUpdated && data?.length) {
          edges = data;
        } else {
          const updatedData = addObject(OnMessageUpdatedMessage, edges);
          edges = sortByTimestamp(updatedData);
        }

        cachedMessagesClient.writeQuery({
          query: CACHED_MESSAGES_QUERY,
          data: {
            cachedMessages: {
              edges,
              pageInfo,
              scrollPosition,
              isFetched,
            },
          },
          variables: { chatId: OnMessageUpdatedChatId },
        });

        if (isReceiverExists) {
          if (
            OnMessageUpdatedChatId &&
            chatId &&
            OnMessageUpdatedChatId === chatId &&
            isChatsVisible
          ) {
            markAllMessagesAsRead(OnMessageUpdatedChatId);
          }
        }
      }
    },
  });

  const {
    data: OnChatAdded,
    loading: OnChatAddedLoading,
    error: OnChatAddedError,
  } = useSubscription(CHAT_ADDED_SUBSCRIPTION, {
    onData: (res) => {
      const OnChatAddedData = res?.data?.data?.OnChatAdded;
      const OnChatAddedFriendIds = OnChatAddedData?.friendIds;
      const OnChatAddedChat = OnChatAddedData?.chat;
      const OnChatAddedChatId = OnChatAddedChat?._id;
      const OnChatAddedMembers = OnChatAddedChat?.members;
      const { isPrivateChat: isChatAddedPrivate } =
        getChatType(OnChatAddedChat);

      const { isCurrentMember, isOtherMember } = checkIsMemberExists(
        OnChatAddedMembers,
        'hasAdded',
        _id,
      );

      if (isCurrentMember || isOtherMember) {
        if (OnChatAddedFriendIds?.length) {
          OnChatAddedFriendIds?.forEach((OnChatAddedFriendId: string) => {
            if (isChatAddedPrivate) {
              if (isOtherMember) {
                friendsClient.cache.modify({
                  fields: {
                    [`friends({"input":{"userId":"${_id}"}})`](
                      existingData: any,
                    ) {
                      const data = removeObject(
                        OnChatAddedFriendId,
                        existingData,
                      );
                      return data;
                    },
                  },
                });

                chatsClient.cache.modify({
                  fields: {
                    [`chats({"input":{"userId":"${_id}"}})`](
                      existingData: any,
                    ) {
                      const data = addObject(
                        OnChatAddedChat,
                        existingData,
                        true,
                      );
                      return data;
                    },
                  },
                });

                if (
                  OnChatAddedFriendId &&
                  friendId &&
                  OnChatAddedChatId &&
                  OnChatAddedFriendId === friendId
                ) {
                  setSearchParams(
                    (params) => {
                      params.set('id', OnChatAddedChatId);
                      params.set('type', 'chat');
                      return params;
                    },
                    { replace: true },
                  );
                }
              }
            }
          });
        }
      }
    },
  });

  const {
    data: OnChatUpdated,
    loading: OnChatUpdatedLoading,
    error: OnChatUpdatedError,
  } = useSubscription(CHAT_UPDATED_SUBSCRIPTION, {
    onData: (res) => {
      const OnChatUpdatedData = res?.data?.data?.OnChatUpdated;
      const OnChatUpdatedChat = OnChatUpdatedData?.chat;
      const OnChatUpdatedChatId = OnChatUpdatedChat?._id;
      const OnChatUpdatedMembers = OnChatUpdatedChat?.members;

      const { isCurrentMember, isOtherMember } = checkIsMemberExists(
        OnChatUpdatedMembers,
        'hasAdded',
        _id,
      );

      if (isCurrentMember || isOtherMember) {
        chatsClient.cache.modify({
          fields: {
            [`chats({"input":{"userId":"${_id}"}})`](existingData: any) {
              const { isFoundAndUpdated, data } = findAndUpdate(
                OnChatUpdatedChatId,
                '_id',
                existingData,
                OnChatUpdatedChat,
              );
              if (isFoundAndUpdated && data?.length) {
                return data;
              }
              return existingData;
            },
          },
        });
      }
    },
  });

  const {
    data: OnFriendAdded,
    loading: OnFriendAddedLoading,
    error: OnFriendAddedError,
  } = useSubscription(FRIEND_ADDED_SUBSCRIPTION, {
    onData: (res: any) => {
      const OnFriendAddedData = res?.data?.data?.OnFriendAdded;
      const OnFriendAddedFriend = OnFriendAddedData?.friend;
      const OnFriendAddedMembers = OnFriendAddedFriend?.members;

      const { isCurrentMember, isOtherMember } = checkIsMemberExists(
        OnFriendAddedMembers,
        'hasAdded',
        _id,
      );

      if (isCurrentMember || isOtherMember) {
        friendsClient.cache.modify({
          fields: {
            [`friends({"input":{"userId":"${_id}"}})`](existingData: any) {
              const data = addObject(OnFriendAddedFriend, existingData, true);
              return data;
            },
          },
        });
      }
    },
  });

  const {
    data: OnRequestAdded,
    loading: OnRequestAddedLoading,
    error: OnRequestAddedError,
  } = useSubscription(REQUEST_ADDED_SUBSCRIPTION, {
    onData: (res) => {
      const OnRequestAddedData = res?.data?.data?.OnRequestAdded;
      const OnRequestAddedRequest = OnRequestAddedData?.request;
      const OnRequestAddedMembers = OnRequestAddedRequest?.members;

      const { isCurrentMember, isOtherMember } = checkIsMemberExists(
        OnRequestAddedMembers,
        'hasSent',
        _id,
      );

      if (isCurrentMember) {
        sentRequestsClient.cache.modify({
          fields: {
            [`sentRequests({"input":{"userId":"${_id}"}})`](existingData: any) {
              const data = addRequest(OnRequestAddedRequest, existingData);
              return data;
            },
          },
        });
      }

      if (isOtherMember) {
        pendingRequestsClient.cache.modify({
          fields: {
            [`pendingRequests({"input":{"userId":"${_id}"}})`](
              existingData: any,
            ) {
              const data = addRequest(OnRequestAddedRequest, existingData);
              return data;
            },
          },
        });
      }
    },
  });

  const {
    data: OnRequestUpdated,
    loading: OnRequestUpdatedLoading,
    error: OnRequestUpdatedError,
  } = useSubscription(REQUEST_UPDATED_SUBSCRIPTION, {
    onData: (res) => {
      const OnRequestUpdatedData = res?.data?.data?.OnRequestUpdated;
      const OnRequestUpdatedRequest = OnRequestUpdatedData?.request;
      const OnRequestUpdatedRequestId = OnRequestUpdatedRequest?._id;
      const OnRequestUpdatedMembers = OnRequestUpdatedRequest?.members;

      const { isCurrentMember, isOtherMember } = checkIsMemberExists(
        OnRequestUpdatedMembers,
        'hasSent',
        _id,
      );

      if (isCurrentMember) {
        sentRequestsClient.cache.modify({
          fields: {
            [`sentRequests({"input":{"userId":"${_id}"}})`](existingData: any) {
              const data = removeRequest(
                OnRequestUpdatedRequestId,
                existingData,
              );
              return data;
            },
          },
        });
      }

      if (isOtherMember) {
        pendingRequestsClient.cache.modify({
          fields: {
            [`pendingRequests({"input":{"userId":"${_id}"}})`](
              existingData: any,
            ) {
              const data = removeRequest(
                OnRequestUpdatedRequestId,
                existingData,
              );
              return data;
            },
          },
        });
      }
    },
  });

  const {
    data: OnUserOnlineStatus,
    loading: OnUserOnlineStatusLoading,
    error: OnUserOnlineStatusError,
  } = useSubscription(USER_ONLINE_STATUS_SUBSCRIPTION, {
    onData: (res) => {
      const OnUserOnlineStatusData = res?.data?.data?.OnUserOnlineStatus;
      const OnUserOnlineStatusUserId = OnUserOnlineStatusData?.userId;
      if (OnUserOnlineStatusUserId && OnUserOnlineStatusUserId !== _id) {
        userOnlineStatusClient.writeQuery({
          query: USER_ONLINE_STATUS_QUERY,
          data: {
            userOnlineStatus: OnUserOnlineStatusData,
          },
          variables: { userId: OnUserOnlineStatusUserId },
        });
      }
    },
  });

  const {
    data: OnUserClientUpdated,
    loading: OnUserClientUpdatedLoading,
    error: OnUserClientUpdatedError,
  } = useSubscription(USER_CLIENT_UPDATED_SUBSCRIPTION, {
    onData: async (res) => {
      const OnUserClientUpdatedData = res?.data?.data?.OnUserClientUpdated;
      const OnUserClientUpdatedClient = OnUserClientUpdatedData?.userClient;
      const OnUserClientUpdatedUserId = OnUserClientUpdatedClient?.userId;
      if (OnUserClientUpdatedUserId && OnUserClientUpdatedUserId === _id) {
        userClientClient.writeQuery({
          query: USER_CLIENT_QUERY,
          data: {
            userClient: OnUserClientUpdatedClient,
          },
          variables: { userId: OnUserClientUpdatedUserId },
        });
      }
    },
  });

  const [
    createMessage,
    {
      data: createMessageData,
      loading: createMessageLoading,
      error: createMessageError,
    },
  ] = useMutation(CREATE_MESSAGE_MUTATION);

  const [
    createChat,
    {
      data: createChatData,
      loading: createChatLoading,
      error: createChatError,
    },
  ] = useMutation(CREATE_CHAT_MUTATION);

  const [
    createRequest,
    {
      data: createRequestData,
      loading: createRequestLoading,
      error: createRequestError,
    },
  ] = useMutation(CREATE_REQUEST_MUTATION);

  const [
    updateRequest,
    {
      data: updateRequestData,
      loading: updateRequestLoading,
      error: updateRequestError,
    },
  ] = useMutation(UPDATE_REQUEST_MUTATION);

  const [
    shouldNotifyUser,
    {
      data: shouldNotifyUserData,
      loading: shouldNotifyUserLoading,
      error: shouldNotifyUserError,
    },
  ] = useMutation(SHOULD_NOTIFY_USER_MUTATION);

  useLayoutEffect(() => {
    if (isNetworkError || isFetchingChats2 || isFetchingFriends2) return;
    setToggleChats(!!chats?.length);
    setCurrentChats(chats);
  }, [isNetworkError, chats, isFetchingChats2, isFetchingFriends2]);

  useLayoutEffect(() => {
    if (isNetworkError || isFetchingChats2 || isFetchingFriends2) return;
    setToggleFriends(!!friends?.length);
    setCurrentFriends(friends);
  }, [isNetworkError, friends, isFetchingChats2, isFetchingFriends2]);

  useLayoutEffect(() => {
    const setStates = async () => {
      if (loadingCreateMessage || loadingProcessNextMessage) return;

      if (chatId || friendId) {
        let isFound = false;
        let Chat;
        let ChatDetails;

        if (currentChats?.length) {
          const currentChat = currentChats?.find(
            (chat: any) =>
              chat?._id && (chat?._id === chatId || chat?._id === friendId),
          );
          if (currentChat) {
            isFound = true;
            Chat = currentChat;
            const isGroupChat = Chat?.type === 'group';
            if (isGroupChat) {
              ChatDetails = Chat?.groupDetails;
            } else {
              const { otherMember } = getMember(Chat?.members, _id);
              ChatDetails = otherMember;
            }
          }
        }

        if (!isFound && currentFriends?.length) {
          const currentFriend = currentFriends?.find(
            (friend: any) => friend?._id === friendId,
          );
          if (currentFriend) {
            Chat = currentFriend;
            if (Chat?.hasChats) {
              navigate('/');
              await fetchAll();
            } else {
              const { otherMember } = getMember(Chat?.members, _id);
              ChatDetails = otherMember;
            }
          }
        }

        setSelectedChat(Chat);
        setSelectedChatDetails(ChatDetails);
      }

      if (!chatId && !friendId) {
        setSelectedChat(null);
        setSelectedChatDetails(null);
        setSelectedMessage(null);
      }
    };

    setStates();
  }, [
    loadingCreateMessage,
    loadingProcessNextMessage,
    chatId,
    friendId,
    currentChats,
    currentFriends,
  ]);

  useLayoutEffect(() => {
    if (isChatsVisible && chatId) {
      markAllMessagesAsRead(chatId);
    }
  }, [isListItemClicked, isChatsVisible, chatId]);

  useEffect(() => {
    const messageQueueService = new MessageQueueService(
      friendId,
      createChat,
      createMessage,
      chatsClient,
      cachedMessagesClient,
      setSearchParams,
      setLoadingProcessNextMessage,
    );

    const startQueueProcessing = async () => {
      if (!isWsConnected || loadingCreateMessage || loadingProcessNextMessage)
        return;
      await messageQueueService.processQueue();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        startQueueProcessing();
      }
    };

    startQueueProcessing();

    const eventListeners: {
      target: Window | Document;
      event: string;
      handler: (e?: Event) => void;
    }[] = [
      { target: window, event: 'mousemove', handler: startQueueProcessing },
      { target: window, event: 'keydown', handler: startQueueProcessing },
      { target: window, event: 'click', handler: startQueueProcessing },
      { target: window, event: 'scroll', handler: startQueueProcessing },
      { target: window, event: 'focus', handler: startQueueProcessing },
      { target: window, event: 'online', handler: startQueueProcessing },
      {
        target: document,
        event: 'visibilitychange',
        handler: handleVisibilityChange,
      },
    ];

    eventListeners.forEach(({ target, event, handler }) =>
      target.addEventListener(event, handler),
    );

    return () => {
      eventListeners.forEach(({ target, event, handler }) =>
        target.removeEventListener(event, handler),
      );
    };
  }, [
    friendId,
    isWsConnected,
    loadingCreateMessage,
    loadingProcessNextMessage,
  ]);

  const fetchMessages = async (id: string) => {
    try {
      const res = await refetchMessages({ chatId: id });
      return res;
    } catch (err: any) {
      const errorMessage = err?.message || '';
      if (errorMessage) {
        if (errorMessage?.includes('Chat not found')) {
          navigate('/');
        }
        throw new Error(errorMessage);
      }
    }
  };

  const getQueuedMessages = async (
    id: string,
    edges?: any[],
    pageInfo?: any,
  ) => {
    let startTimestamp = null;
    let endTimestamp = null;
    if (edges?.length) {
      const oldestMessage = edges?.[0];
      startTimestamp = pageInfo?.hasNextPage ? oldestMessage?.timestamp : null;
      const newestMessage = edges?.[edges?.length - 1];
      endTimestamp = pageInfo?.hasPreviousPage
        ? newestMessage?.timestamp
        : null;
    }
    const res = await MessageQueue.getQueuedMessagesById(
      id,
      startTimestamp,
      endTimestamp,
    );
    setIsFetchingMessages(false);
    return res;
  };

  const getChatMessagesWithQueue = async (id: string, key: string) => {
    try {
      let edges: any[] = [];
      let pageInfo = {
        endCursor: '',
        hasPreviousPage: false,
        hasNextPage: false,
      };
      let scrollPosition = 0;
      let isFetched = false;
      let isWrite = false;

      const cachedMessagesQuery = await cachedMessagesClient.readQuery({
        query: CACHED_MESSAGES_QUERY,
        variables: { chatId: id },
      });

      if (cachedMessagesQuery) {
        const cachedData = cachedMessagesQuery?.cachedMessages;
        edges = cachedData?.edges || [];
        pageInfo = cachedData?.pageInfo;
        scrollPosition = cachedData?.scrollPosition;
        isFetched = cachedData?.isFetched;
      }

      if (!cachedMessagesQuery || !isFetched) {
        if (key === 'chat') {
          setIsRefetchingMessages(true);
          const fetchedData = await fetchMessages(id);
          const fetchedMessages = fetchedData?.data?.messages;
          const fetchedMessagesEdges = fetchedMessages?.edges;
          const fetchedMessagesPageInfo = fetchedMessages?.pageInfo;
          const fetchedMessagesScrollPosition = fetchedMessages?.scrollPosition;
          const fetchedMessagesIsFetched = fetchedMessages?.isFetched;
          edges = fetchedMessagesEdges || [];
          pageInfo = fetchedMessagesPageInfo;
          scrollPosition = fetchedMessagesScrollPosition;
          isFetched = fetchedMessagesIsFetched;
          isWrite = true;
        }
      }

      const fetchedQueuedMessages = await getQueuedMessages(
        id,
        edges,
        pageInfo,
      );

      if (fetchedQueuedMessages?.length) {
        const uniqueMessages = uniqueQueuedMessages(
          edges,
          fetchedQueuedMessages,
        );

        if (uniqueMessages?.length) {
          const updatedData = addArray(uniqueMessages, edges);
          edges = sortByTimestamp(updatedData);
          scrollPosition = 0;
          isWrite = true;
        }
      }

      if (isWrite) {
        chatsClient.cache.modify({
          fields: {
            [`chats({"input":{"userId":"${_id}"}})`](existingData: any) {
              const lastMessage = getLastMessage(edges);
              const { isFoundAndUpdated, data } = findAndUpdate(
                id,
                '_id',
                existingData,
                lastMessage,
                'lastMessage',
              );
              if (isFoundAndUpdated && data?.length) {
                const sortedChatsData = sortByLastMessageTimestamp(data);
                return sortedChatsData;
              }
              return existingData;
            },
          },
        });

        cachedMessagesClient.writeQuery({
          query: CACHED_MESSAGES_QUERY,
          data: {
            cachedMessages: {
              edges,
              pageInfo,
              scrollPosition,
              isFetched,
            },
          },
          variables: { chatId: id },
        });
      }

      if (scrollPosition === 0) {
        setScrollToBottom((prev) => !prev);
      } else {
        setScrollToPosition((prev) => !prev);
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const fetchAll = async () => {
    if (isFetchingChats2 || isFetchingFriends2) return;
    if (isNetworkError) {
      setIsFetchingChats(true);
      setIsFetchingFriends(true);
    }
    setIsFetchingChats2(true);
    setIsFetchingFriends2(true);
    try {
      await client.clearStore();
      await refetchUserClient();
      await refetchChats();
      await refetchFriends();
      await Promise.allSettled([
        refetchPendingRequests(),
        refetchSentRequests(),
      ]);
    } catch (err) {
      console.error('Error refetching:', err);
    }
  };

  const markAllMessagesAsRead = async (id: string) => {
    chatsClient.cache.modify({
      fields: {
        [`chats({"input":{"userId":"${_id}"}})`](existingData: any) {
          const {
            isFoundAndUpdated: isFoundAndUpdatedMembers,
            data: membersData,
          } = findAndUpdate(
            _id,
            '_id',
            selectedChat?.members,
            null,
            'unreadMessagesCount',
          );
          if (isFoundAndUpdatedMembers && membersData?.length) {
            const { isFoundAndUpdated, data } = findAndUpdate(
              id,
              '_id',
              existingData,
              membersData,
              'members',
            );
            if (isFoundAndUpdated && data?.length) {
              return data;
            }
            return existingData;
          }
          return existingData;
        },
      },
    });

    socket?.emit('markMessagesAsRead', {
      chatId: id,
      userId: _id,
    });
  };

  const closeAllDrawers = () => {
    toggleDrawer(setIsMenuDrawerOpen);
    toggleDrawer(setIsNewChatDrawerOpen);
    toggleDrawer(setIsMessageDrawerOpen);
  };

  const handleClickChat = async (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    chat: any,
    chatDetails: any,
  ) => {
    await clickChat(
      chat,
      chatDetails,
      setIsListItemClicked,
      setSelectedChat,
      setSelectedChatDetails,
      getChatMessagesWithQueue,
      navigate,
      prevPathname,
      fetchAll,
    );
    closeAllDrawers();
  };

  return (
    <ChatsAndFriendsContext.Provider
      value={{
        // query
        // userClient
        userClient,
        userClientLoading,
        userClientError,
        userClientClient,
        refetchUserClient,
        // messages
        messages,
        messagesPageInfo,
        messagesScrollPosition,
        messagesIsFetched,
        messagesLoading,
        messagesError,
        messagesCalled,
        subscribeMessagesToMore,
        fetchMoreMessages,
        refetchMessages,
        cachedMessagesClient,
        // userOnlineStatus
        userOnlineStatus,
        userOnlineStatusLoading,
        userOnlineStatusError,
        userOnlineStatusClient,
        userOnlineStatusCalled,
        // chats
        chats,
        chatsLoading,
        chatsError,
        chatsClient,
        chatsCalled,
        subscribeChatsToMore,
        refetchChats,
        // friends
        friends,
        friendsLoading,
        friendsError,
        friendsClient,
        friendsCalled,
        subscribeFriendsToMore,
        refetchFriends,
        // friendsSorted
        friendsSortedQuery,
        friendsSorted,
        friendsSortedLoading,
        friendsSortedError,
        friendsSortedClient,
        // pendingRequests
        pendingRequests,
        pendingRequestsCount,
        pendingRequestsLoading,
        pendingRequestsError,
        pendingRequestsClient,
        pendingRequestsCalled,
        refetchPendingRequests,
        // sentRequests
        sentRequests,
        sentRequestsCount,
        sentRequestsLoading,
        sentRequestsError,
        sentRequestsClient,
        sentRequestsCalled,
        refetchSentRequests,

        // subscription
        // OnMessageAdded
        OnMessageAdded,
        OnMessageAddedLoading,
        OnMessageAddedError,
        // OnMessageUpdated
        OnMessageUpdated,
        OnMessageUpdatedLoading,
        OnMessageUpdatedError,
        // OnChatAdded
        OnChatAdded,
        OnChatAddedLoading,
        OnChatAddedError,
        // OnChatUpdated
        OnChatUpdated,
        OnChatUpdatedLoading,
        OnChatUpdatedError,
        // OnFriendAdded
        OnFriendAdded,
        OnFriendAddedLoading,
        OnFriendAddedError,
        // OnRequestAdded
        OnRequestAdded,
        OnRequestAddedLoading,
        OnRequestAddedError,
        // OnRequestUpdated
        OnRequestUpdated,
        OnRequestUpdatedLoading,
        OnRequestUpdatedError,
        // OnUserOnlineStatus
        OnUserOnlineStatus,
        OnUserOnlineStatusLoading,
        OnUserOnlineStatusError,
        // OnUserClientUpdated
        OnUserClientUpdated,
        OnUserClientUpdatedLoading,
        OnUserClientUpdatedError,

        // mutation
        // createMessage
        createMessage,
        createMessageData,
        createMessageLoading,
        createMessageError,
        // createChat
        createChat,
        createChatData,
        createChatLoading,
        createChatError,
        // createRequest
        createRequest,
        createRequestData,
        createRequestLoading,
        createRequestError,
        // updateRequest
        updateRequest,
        updateRequestData,
        updateRequestLoading,
        updateRequestError,
        // shouldNotifyUser
        shouldNotifyUser,
        shouldNotifyUserData,
        shouldNotifyUserLoading,
        shouldNotifyUserError,

        // state
        // isHomeButtonClicked
        isHomeButtonClicked,
        setIsHomeButtonClicked,
        // isListItemClicked
        isListItemClicked,
        setIsListItemClicked,
        // selectedChat
        selectedChat,
        setSelectedChat,
        // selectedChatDetails
        selectedChatDetails,
        setSelectedChatDetails,
        // loadingCreateMessage
        loadingCreateMessage,
        setLoadingCreateMessage,
        // loadingProcessNextMessage
        loadingProcessNextMessage,
        setLoadingProcessNextMessage,
        // scrollToBottom
        scrollToBottom,
        setScrollToBottom,
        // scrollToPosition
        scrollToPosition,
        setScrollToPosition,
        // isRefetchingMessages
        isRefetchingMessages,
        setIsRefetchingMessages,
        // isFetchingMessage
        isFetchingMessages,
        setIsFetchingMessages,
        // isFetchingChats
        isFetchingChats,
        setIsFetchingChats,
        // isFetchingFriends
        isFetchingFriends,
        setIsFetchingFriends,
        // isFetchingChats2
        isFetchingChats2,
        setIsFetchingChats2,
        // isFetchingFriends2
        isFetchingFriends2,
        setIsFetchingFriends2,
        // currentChats
        currentChats,
        setCurrentChats,
        // currentFriends
        currentFriends,
        setCurrentFriends,
        // toggleChats
        toggleChats,
        setToggleChats,
        // toggleFriends
        toggleFriends,
        setToggleFriends,
        // isChatsVisible
        isChatsVisible,
        setIsChatsVisible,
        // isMenuDrawerOpen
        isMenuDrawerOpen,
        setIsMenuDrawerOpen,
        // isNewChatDrawerOpen
        isNewChatDrawerOpen,
        setIsNewChatDrawerOpen,
        // isMessageDrawerOpen
        isMessageDrawerOpen,
        setIsMessageDrawerOpen,
        // selectedMessage
        selectedMessage,
        setSelectedMessage,

        // function
        fetchMessages,
        getQueuedMessages,
        getChatMessagesWithQueue,
        fetchAll,
        markAllMessagesAsRead,
        closeAllDrawers,
        handleClickChat,
      }}
    >
      {children}
    </ChatsAndFriendsContext.Provider>
  );
};
