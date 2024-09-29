import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import {
  MESSAGES_QUERY,
  MESSAGE_QUEUED_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  // MESSAGE_UPDATED_SUBSCRIPTION,
} from './gql';
import { groupMessages } from '../../helpers';
import { useAuth } from '../../hooks';
import { MessageQueueService } from '../../services';
import { ChatsAndFriendsContext } from '..';

export const MessagesContext = createContext<any>({});

export const MessagesProvider = ({ children }: any) => {
  const MessageQueue = new MessageQueueService();
  const [searchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const [loadingCached, setLoadingCached] = useState(false);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [messageGroups, setMessageGroups] = useState<any[]>([]);
  const [messageQueue, setMessageQueue] = useState<any[]>([]);

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

  const [
    createMessage,
    { loading: loadingCreateMessage, error: errorCreateMessage },
  ] = useMutation(CREATE_MESSAGE_MUTATION);

  const [
    updateMessage,
    { loading: loadingUpdateMessage, error: errorUpdateMessage },
  ] = useMutation(UPDATE_MESSAGE_MUTATION);

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

  useLayoutEffect(() => {
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
  }, []);

  const getQueuedMessages = async (
    id: string,
    emptyMsgs?: boolean,
    setLoading?: any,
  ) => {
    setLoading?.(true);
    try {
      const queuedMessages = await MessageQueue.getQueuedMessagesByChatId(
        id,
        25,
        0,
      );
      if (emptyMsgs) {
        setMessageGroups([]);
      }
      setMessageQueue(queuedMessages);
    } catch (error) {
      console.error('Error getting queued messages:', error);
      if (emptyMsgs) {
        setMessageGroups([]);
      }
    } finally {
      setLoading?.(false);
    }
  };

  const getMessages = async (id: string, msgs: any[]) => {
    try {
      await getQueuedMessages(id);
    } catch (error) {
      console.error('Error getting queued messages:', error);
    }

    if (msgs && msgs?.length) {
      const messageGroupsData = groupMessages(msgs, _id);
      setMessageGroups(messageGroupsData);
    }
  };

  const getCachedMessages = async (id: string, setLoading: any) => {
    setLoading?.(true);
    try {
      const cachedData = await messagesClient?.readQuery({
        query: MESSAGES_QUERY,
        variables: { chatId: id },
      });

      if (!cachedData) {
        const res = await messagesQuery({
          variables: {
            chatId: id,
          },
          fetchPolicy: 'network-only',
        });

        await getMessages(id, res?.data?.messages);
      } else {
        await getMessages(id, cachedData?.messages);
      }
    } catch (error) {
      console.error('Error getting cached messages:', error);
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
        // createMessage
        createMessage,
        loadingCreateMessage,
        errorCreateMessage,
        // updateMessage
        updateMessage,
        loadingUpdateMessage,
        errorUpdateMessage,
        // OnMessageAdded
        loadingOnMessageAdded,
        errorOnMessageAdded,
        // loadingCached
        loadingCached,
        setLoadingCached,
        // loadingQueue
        loadingQueue,
        setLoadingQueue,
        // messageGroups
        messageGroups,
        setMessageGroups,
        // messageQueue
        messageQueue,
        setMessageQueue,
        // getMessages
        getQueuedMessages,
        getCachedMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
