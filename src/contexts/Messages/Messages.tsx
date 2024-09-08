import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  // MESSAGE_UPDATED_SUBSCRIPTION,
} from './gql';

export const MessagesContext = createContext<any>({});

export const MessagesProvider = ({ children }: any) => {
  const [searchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const [messageGroups, setMessageGroups] = useState<any[]>([]);
  const [messageQueue, setMessageQueue] = useState<any[]>([]);
  const [loadingCached, setLoadingCached] = useState(false);

  const {
    client: messagesClient,
    refetch: refetchMessages,
    data: { messages = [] } = {},
    loading: loadingMessages,
    error: errorMessages,
  } = useQuery(MESSAGES_QUERY, {
    variables: {
      chatId,
    },
    skip: !chatId,
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

  return (
    <MessagesContext.Provider
      value={{
        // messages
        messages,
        loadingMessages,
        errorMessages,
        refetchMessages,
        messagesClient,
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
        // state
        loadingCached,
        setLoadingCached,
        messageGroups,
        setMessageGroups,
        messageQueue,
        setMessageQueue,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
