import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import {
  MESSAGES_QUERY,
  MESSAGE_QUEUED_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  MESSAGE_UPDATED_SUBSCRIPTION,
} from './gql';
import { addQueuedMessagesToLastGroup, groupMessages } from '../../helpers';
import { useAuth } from '../../hooks';
import { MessageQueueService } from '../../services';
import { ChatsAndFriendsContext } from '..';

export const MessagesContext = createContext<any>({});

export const MessagesProvider = ({ children }: any) => {
  const MessageQueue = new MessageQueueService();
  const navigate = useNavigate();
  const [loadingChatMessages, setLoadingChatMessages] = useState(true);
  const [loadingCreateMessage, setLoadingCreateMessage] = useState(false);
  const [loadingProcessNextMessage, setLoadingProcessNextMessage] =
    useState(false);
  const [messageGroups, setMessageGroups] = useState<any[]>([]);
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
      data: { messages = [] } = {},
      loading: messagesLoading,
      error: messagesError,
      client: messagesClient,
      called: messagesCalled,
      subscribeToMore: subscribeMessagesToMore,
    },
  ] = useLazyQuery(MESSAGES_QUERY);

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
      fetchPolicy: 'network-only',
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

  const getCombinedMessages = async (id: string, msgs: any[] = []) => {
    if (!msgs?.length) {
      setMessageGroups([]);
      return;
    }

    try {
      const queuedMessages = await getQueuedMessages(id, 'chatId');

      const combinedMessages = queuedMessages?.length
        ? msgs?.concat?.(queuedMessages)
        : msgs;

      if (combinedMessages?.length) {
        const messageGroupsData = groupMessages(combinedMessages, _id);
        setMessageGroups(messageGroupsData);
      } else {
        setMessageGroups([]);
      }
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };

  const getChatMessagesWithQueue = async (id: string) => {
    try {
      const cachedMessages = await messagesClient?.readQuery({
        query: MESSAGES_QUERY,
        variables: { chatId: id },
      });

      const messages =
        cachedMessages && cachedMessages?.messages
          ? cachedMessages?.messages
          : await fetchMessages(id);

      await getCombinedMessages(id, messages);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const getFriendMessagesWithQueue = async (id: string) => {
    try {
      const queuedMessages = await getQueuedMessages(id, 'friendId', true);

      if (queuedMessages?.length) {
        setMessageGroups((prev: any) => {
          const newGroups = addQueuedMessagesToLastGroup(prev, queuedMessages);
          return newGroups;
        });
      }
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
        messagesLoading,
        messagesError,
        messagesClient,
        messagesCalled,
        subscribeMessagesToMore,
        // messageQueued
        messageQueuedQuery,
        messageQueued,
        messageQueuedLoading,
        messageQueuedError,
        messageQueuedClient,
        messageQueuedCalled,
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
        messageGroups,
        setMessageGroups,
        // getMessages
        fetchMessages,
        getQueuedMessages,
        getCombinedMessages,
        getChatMessagesWithQueue,
        getFriendMessagesWithQueue,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
