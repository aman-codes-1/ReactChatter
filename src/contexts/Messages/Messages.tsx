import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import {
  MESSAGES_QUERY,
  MESSAGE_QUEUED_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  MESSAGE_UPDATED_SUBSCRIPTION,
} from './gql';
import { addQueuedMessagesToLastGroup, groupMessages } from '../../helpers';
import { useAuth } from '../../hooks';
import { MessageQueueService } from '../../services';
import { ChatsAndFriendsContext } from '..';

export const MessagesContext = createContext<any>({});

export const MessagesProvider = ({ children }: any) => {
  const MessageQueue = new MessageQueueService();
  const { pathname } = useLocation();
  const [messageGroups, setMessageGroups] = useState<any[]>([]);

  const { auth: { _id = '' } = {} } = useAuth();
  const { createChat, createChatLoading, isListItemClicked, selectedMember } =
    useContext(ChatsAndFriendsContext);

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
    },
  ] = useLazyQuery(MESSAGES_QUERY);

  const {
    data: OnMessageAddedData,
    loading: OnMessageAddedLoading,
    error: OnMessageAddedError,
  } = useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    // variables: {
    //   isDelivered: true,
    // },
    onData: () => {
      // const OnMessageAdded = res?.data?.data?.OnMessageAdded;
      // const OnMessagesAddedUserId = OnMessagesAdded?.userId;
      // const OnMessageAddedChatId = OnMessageAdded?.chatId;
      // const OnMessageAddedData = OnMessageAdded?.data;
      // const OnMessageAddedMessageId = OnMessageAdded?._id;
      // if (
      //   OnMessagesAddedUserId === _id &&
      //   OnMessageAddedChatId !== chatId
      // ) {
      //   updateMessage({
      //     variables: {
      //       messageId: OnMessageAddedChatId,
      //       receivedStatus: 'unread',
      //     },
      //   });
      // }
    },
  });

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
    const processMessages = async () => {
      const messageQueueService = new MessageQueueService(
        messageQueuedQuery,
        createChat,
        createMessage,
        selectedMember,
        {
          _id,
        },
      );
      await messageQueueService.processQueue();
    };

    processMessages();
  }, [
    _id,
    selectedMember,
    isListItemClicked,
    createChatLoading,
    createMessageLoading,
    pathname,
  ]);

  const fetchMessages = async (id: string) => {
    const res = await messagesQuery({
      variables: { chatId: id },
      fetchPolicy: 'network-only',
    });

    if (res?.error?.message) {
      throw new Error(res?.error?.message);
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
    if (!msgs?.length) return;

    try {
      const queuedMessages = await getQueuedMessages(id, 'chatId');

      const combinedMessages = queuedMessages?.length
        ? msgs.concat(queuedMessages)
        : msgs;

      if (combinedMessages?.length) {
        const messageGroupsData = groupMessages(combinedMessages, _id);
        setMessageGroups(messageGroupsData);
      }
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };

  const getChatMessagesWithQueue = async (id: string) => {
    try {
      const cachedData = await messagesClient?.readQuery({
        query: MESSAGES_QUERY,
        variables: { chatId: id },
      });

      const messages =
        cachedData && cachedData?.messages
          ? cachedData?.messages
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
        // messageQueued
        messageQueuedQuery,
        messageQueued,
        messageQueuedLoading,
        messageQueuedError,
        messageQueuedClient,
        messageQueuedCalled,
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
