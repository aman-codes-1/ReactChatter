import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client';
import {
  MESSAGES_QUERY,
  MESSAGE_QUEUED_QUERY,
  MESSAGE_GROUPS_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  MESSAGE_UPDATED_SUBSCRIPTION,
} from './gql';
import { groupMessages, mergeByDateLabel } from '../../helpers';
import { useAuth } from '../../hooks';
import { MessageQueueService } from '../../services';
import { ChatsAndFriendsContext } from '..';

export const MessagesContext = createContext<any>({});

export const MessagesProvider = ({ children }: any) => {
  const MessageQueue = new MessageQueueService();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const friendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const [loadingChatMessages, setLoadingChatMessages] = useState(true);
  const [loadingCreateMessage, setLoadingCreateMessage] = useState(false);
  const [loadingProcessNextMessage, setLoadingProcessNextMessage] =
    useState(false);
  const [messageGroupsState, setMessageGroups] = useState<any[]>([]);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const { auth: { _id = '' } = {} } = useAuth();
  const { createChat } = useContext(ChatsAndFriendsContext);

  const [
    messageQueuedQuery,
    {
      data: messageQueued,
      loading: messageQueuedLoading,
      error: messageQueuedError,
      client: messageQueuedClient,
      called: messageQueuedCalled,
    },
  ] = useLazyQuery(MESSAGE_QUEUED_QUERY, {
    fetchPolicy: 'network-only',
  });

  const [
    messagesQuery,
    {
      data: { messages: { edges: messages = [], pageInfo = {} } = {} } = {},
      loading: messagesLoading,
      error: messagesError,
      client: messagesClient,
      called: messagesCalled,
      subscribeToMore: subscribeMessagesToMore,
      fetchMore: fetchMoreMessages,
    },
  ] = useLazyQuery(MESSAGES_QUERY, {
    fetchPolicy: 'no-cache',
  });

  const {
    data: {
      messageGroups: {
        data: messageGroups = [],
        pageInfo: messagesPageInfo = {},
      } = {},
    } = {},
    loading: messageGroupsLoading,
    error: messageGroupsError,
    client: messageGroupsClient,
    called: messageGroupsCalled,
  } = useQuery(MESSAGE_GROUPS_QUERY, {
    fetchPolicy: 'cache-only',
    variables: { chatId },
    skip: !chatId || !!friendId,
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: OnMessageAddedData,
    loading: OnMessageAddedLoading,
    error: OnMessageAddedError,
  } = useSubscription(MESSAGE_ADDED_SUBSCRIPTION);

  const {
    data: OnMessageUpdatedData,
    loading: OnMessageUpdatedLoading,
    error: OnMessageUpdatedError,
  } = useSubscription(MESSAGE_UPDATED_SUBSCRIPTION);

  const [
    createMessage,
    {
      data: createMessageData,
      loading: createMessageLoading,
      error: createMessageError,
    },
  ] = useMutation(CREATE_MESSAGE_MUTATION);

  const [
    updateMessage,
    {
      data: updateMessageData,
      loading: updateMessageLoading,
      error: updateMessageError,
    },
  ] = useMutation(UPDATE_MESSAGE_MUTATION);

  useEffect(() => {
    const messageQueueService = new MessageQueueService(
      createChat,
      createMessage,
      setMessageGroups,
      setLoadingProcessNextMessage,
    );

    const startQueueProcessing = async () => {
      if (loadingCreateMessage || loadingProcessNextMessage) return;
      await messageQueueService.processQueue();
    };

    startQueueProcessing();

    const handleNetworkChange = () => {
      if (navigator.onLine) {
        startQueueProcessing();
      }
    };

    const events = [
      { name: 'online', handler: handleNetworkChange },
      { name: 'visibilitychange', handler: startQueueProcessing },
      { name: 'blur', handler: startQueueProcessing },
      { name: 'focus', handler: startQueueProcessing },
      { name: 'click', handler: startQueueProcessing },
      { name: 'scroll', handler: startQueueProcessing },
    ];

    events.forEach(({ name, handler }) => {
      if (name === 'visibilitychange') {
        document.addEventListener(name, handler);
      } else {
        window.addEventListener(name, handler);
      }
    });

    return () => {
      events.forEach(({ name, handler }) => {
        if (name === 'visibilitychange') {
          document.removeEventListener(name, handler);
        } else {
          window.removeEventListener(name, handler);
        }
      });
    };
  }, [loadingCreateMessage, loadingProcessNextMessage]);

  const fetchMessages = async (id: string) => {
    const res = await messagesQuery({
      variables: { chatId: id },
    });

    const error = res?.error?.message;

    if (error) {
      if (error?.includes('Chat not found')) {
        navigate('/');
      }

      throw new Error(error);
    }

    return res?.data?.messages || [];
  };

  const getQueuedMessages = async (
    id: string,
    key: string,
    emptyMsgs?: boolean,
  ) => {
    try {
      const queuedMessages = await MessageQueue.getQueuedMessagesById(
        id,
        key,
        25,
        0,
      );

      if (emptyMsgs) {
        setMessageGroups([]);
      }

      return queuedMessages;
    } catch (error: any) {
      if (emptyMsgs) {
        setMessageGroups([]);
      }

      throw new Error(error?.message);
    }
  };

  const chunkArray = (array: any[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, size + i));
    }
    return result;
  };

  const getCombinedMessages = async (id: string, key: string, msgs?: any[]) => {
    try {
      const queuedMessages = await getQueuedMessages(id, key, !msgs);

      let combinedMessages = [];

      if (msgs?.length && queuedMessages?.length) {
        combinedMessages = [...msgs, ...queuedMessages];
      } else if (queuedMessages?.length) {
        combinedMessages = queuedMessages;
      } else if (msgs?.length) {
        combinedMessages = msgs;
      } else {
        combinedMessages = [];
      }

      if (combinedMessages?.length) {
        const chunkedMessages = chunkArray(combinedMessages, 25);

        for (const chunk of chunkedMessages) {
          const groupedMessages = groupMessages(chunk, _id);
          setMessageGroups((prevGroups) =>
            mergeByDateLabel(prevGroups, groupedMessages),
          );
        }

        if (key === 'chatId' && msgs) {
          const groupedMessages = groupMessages(msgs, _id);
          messageGroupsClient.writeQuery({
            query: MESSAGE_GROUPS_QUERY,
            data: {
              messageGroups: groupedMessages,
            },
            variables: { chatId: id },
          });
        }
      }
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };

  const getChatMessagesWithQueue = async (id: string, key: string) => {
    try {
      // const cachedMessages = await messagesClient.readQuery({
      //   query: MESSAGES_QUERY,
      //   variables: { chatId: id },
      // });

      // console.log(cachedMessages);

      const cachedMessageGroups = await messageGroupsClient.readQuery({
        query: MESSAGE_GROUPS_QUERY,
        variables: { chatId: id },
      });

      if (!cachedMessageGroups) {
        const fetchedMessages = await fetchMessages(id);

        if (fetchedMessages?.edges?.length) {
          const groupedMessages = groupMessages(fetchedMessages?.edges, _id);
          messageGroupsClient.writeQuery({
            query: MESSAGE_GROUPS_QUERY,
            data: {
              messageGroups: {
                data: groupedMessages,
                pageInfo: fetchedMessages?.pageInfo,
              },
            },
            variables: { chatId: id },
          });
        }
      }

      setScrollToBottom((prev) => !prev);

      // await getCombinedMessages(id, key, fetchedMessages);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <MessagesContext.Provider
      value={{
        // messages
        messagesQuery,
        messages,
        pageInfo,
        messagesLoading,
        messagesError,
        messagesClient,
        messagesCalled,
        subscribeMessagesToMore,
        fetchMoreMessages,
        // messageQueued
        messageQueuedQuery,
        messageQueued,
        messageQueuedLoading,
        messageQueuedError,
        messageQueuedClient,
        messageQueuedCalled,
        // messageGroups
        messageGroups,
        messagesPageInfo,
        messageGroupsLoading,
        messageGroupsError,
        messageGroupsClient,
        messageGroupsCalled,
        // OnMessageAdded
        OnMessageAddedData,
        OnMessageAddedLoading,
        OnMessageAddedError,
        // OnMessageUpdated
        OnMessageUpdatedData,
        OnMessageUpdatedLoading,
        OnMessageUpdatedError,
        // createMessage
        createMessage,
        createMessageData,
        createMessageLoading,
        createMessageError,
        // updateMessage
        updateMessage,
        updateMessageData,
        updateMessageLoading,
        updateMessageError,
        // loadingChatMessages
        loadingChatMessages,
        setLoadingChatMessages,
        // loadingCreateMessage
        loadingCreateMessage,
        setLoadingCreateMessage,
        // messageGroups
        messageGroupsState,
        setMessageGroups,
        // scrollToBottom
        scrollToBottom,
        setScrollToBottom,
        // getMessages
        fetchMessages,
        getQueuedMessages,
        getCombinedMessages,
        getChatMessagesWithQueue,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
