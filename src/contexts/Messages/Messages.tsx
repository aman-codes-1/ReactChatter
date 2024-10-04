import { createContext, useContext, useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import {
  MESSAGES_QUERY,
  MESSAGE_QUEUED_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  // MESSAGE_UPDATED_SUBSCRIPTION,
} from './gql';
import { addQueuedMessagesToLastGroup, groupMessages } from '../../helpers';
import { useAuth } from '../../hooks';
import { MessageQueueService } from '../../services';
import { ChatsAndFriendsContext } from '..';

export const MessagesContext = createContext<any>({});

export const MessagesProvider = ({ children }: any) => {
  const MessageQueue = new MessageQueueService();
  const [loadingChatMessages, setLoadingChatMessages] = useState(true);
  const [messageGroups, setMessageGroups] = useState<any[]>([]);

  const { auth: { _id = '' } = {} } = useAuth();
  const { createChat, selectedMember } = useContext(ChatsAndFriendsContext);

  const [
    messagesQuery,
    {
      client: messagesClient,
      refetch: refetchMessages,
      data: { messages = [] } = {},
      loading: loadingMessages,
      error: errorMessages,
    },
  ] = useLazyQuery(MESSAGES_QUERY);

  const [
    messageQueuedQuery,
    {
      client: messageQueuedClient,
      data: messageQueued,
      loading: loadingMessageQueued,
      error: errorMessageQueued,
    },
  ] = useLazyQuery(MESSAGE_QUEUED_QUERY, {
    fetchPolicy: 'network-only',
  });

  const { loading: loadingOnMessageAdded, error: errorOnMessageAdded } =
    useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
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

  // const { loading: loadingOnMessagesAdded, error: errorOnMessagesAdded } =
  //   useSubscription(MESSAGES_ADDED_SUBSCRIPTION, {
  //     onData: async (res) => {
  //       await client?.clearStore();
  //       const OnMessagesAdded = res?.data?.data?.OnMessagesAdded;
  //       const OnMessagesAddedUserId = OnMessagesAdded?.userId;
  //       const OnMessagesAddedChatId = OnMessagesAdded?.chatId;
  //       const OnMessagesAddedData = OnMessagesAdded?.data;
  //       if (OnMessagesAddedUserId === _id && OnMessagesAddedChatId === chatId) {
  //         messagesWithQueue(OnMessagesAddedData);
  //       }
  //     },
  //   });

  const [
    createMessage,
    { loading: loadingCreateMessage, error: errorCreateMessage },
  ] = useMutation(CREATE_MESSAGE_MUTATION);

  const [
    updateMessage,
    { loading: loadingUpdateMessage, error: errorUpdateMessage },
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
  }, [_id, selectedMember]);

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

  const getChatMessagesWithQueue = async (id: string, setLoading?: any) => {
    setLoading?.(true);

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
    } finally {
      setLoading?.(false);
    }
  };

  const getFriendMessagesWithQueue = async (id: string, setLoading?: any) => {
    setLoading?.(true);

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
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <MessagesContext.Provider
      value={{
        // messages
        messagesQuery,
        messages,
        loadingMessages,
        errorMessages,
        refetchMessages,
        messagesClient,
        // messageQueued
        messageQueuedQuery,
        messageQueued,
        loadingMessageQueued,
        errorMessageQueued,
        messageQueuedClient,
        // OnMessageAdded
        loadingOnMessageAdded,
        errorOnMessageAdded,
        // createMessage
        createMessage,
        loadingCreateMessage,
        errorCreateMessage,
        // updateMessage
        updateMessage,
        loadingUpdateMessage,
        errorUpdateMessage,
        // loadingChatMessages
        loadingChatMessages,
        setLoadingChatMessages,
        // messageGroups
        messageGroups,
        setMessageGroups,
        // getMessages
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
