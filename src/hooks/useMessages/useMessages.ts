import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { useAuth } from '..';
import {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  // MESSAGE_UPDATED_SUBSCRIPTION,
} from './gql';

// const messagesData = {
//   messages: [
//     {
//       _id: '66620c58d54c69d87cd90a9b',
//       chatId: '6661c6fec5d00b962634723f',
//       message: 'me 1',
//       sender: {
//         _id: '6638fc68b1c5fbdb37b6cdbf',
//         sentStatus: {
//           isSent: true,
//           timestamp: 1717701720498,
//         },
//         senderDetails: {},
//       },
//       otherMembers: [
//         {
//           _id: '66575d714b8681323e597231',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//         {
//           _id: '663a576d0adc9be47e830aa5',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//       ],
//     },
//     {
//       _id: '66620c63d54c69d87cd90aa5',
//       chatId: '6661c6fec5d00b962634723f',
//       message: 'me 2',
//       sender: {
//         _id: '6638fc68b1c5fbdb37b6cdbf',
//         sentStatus: {
//           isSent: true,
//           timestamp: 1717701731521,
//         },
//         senderDetails: {},
//       },
//       otherMembers: [
//         {
//           _id: '66575d714b8681323e597231',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//         {
//           _id: '663a576d0adc9be47e830aa5',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//       ],
//     },
//     {
//       _id: '66620c8bd54c69d87cd90abd',
//       chatId: '6661c6fec5d00b962634723f',
//       message: '2nd person 1',
//       sender: {
//         _id: '66575d714b8681323e597231',
//         sentStatus: {
//           isSent: true,
//           timestamp: 1717701770511,
//         },
//         senderDetails: {},
//       },
//       otherMembers: [
//         {
//           _id: '6638fc68b1c5fbdb37b6cdbf',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//         {
//           _id: '663a576d0adc9be47e830aa5',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//       ],
//     },
//     {
//       _id: '66620c8bd54c69d87cd90abd',
//       chatId: '6661c6fec5d00b962634723f',
//       message: '2nd person 2',
//       sender: {
//         _id: '66575d714b8681323e597231',
//         sentStatus: {
//           isSent: true,
//           timestamp: 1717701770511,
//         },
//         senderDetails: {},
//       },
//       otherMembers: [
//         {
//           _id: '6638fc68b1c5fbdb37b6cdbf',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//         {
//           _id: '663a576d0adc9be47e830aa5',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//       ],
//     },
//     {
//       _id: '66620c8bd54c69d87cd90abd',
//       chatId: '6661c6fec5d00b962634723f',
//       message: '2nd person 3',
//       sender: {
//         _id: '66575d714b8681323e597231',
//         sentStatus: {
//           isSent: true,
//           timestamp: 1717701770511,
//         },
//         senderDetails: {},
//       },
//       otherMembers: [
//         {
//           _id: '6638fc68b1c5fbdb37b6cdbf',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//         {
//           _id: '663a576d0adc9be47e830aa5',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//       ],
//     },
//     {
//       _id: '666210b97d7fba51c6e174b9',
//       chatId: '6661c6fec5d00b962634723f',
//       message: '3rd person',
//       sender: {
//         _id: '663a576d0adc9be47e830aa5',
//         sentStatus: {
//           isSent: true,
//           timestamp: 1717701770511,
//         },
//       },
//       otherMembers: [
//         {
//           _id: '66575d714b8681323e597231',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//         {
//           _id: '6638fc68b1c5fbdb37b6cdbf',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//       ],
//     },
//     {
//       _id: '66620c63d54c69d87cd90aa5',
//       chatId: '6661c6fec5d00b962634723f',
//       message: 'me 3',
//       sender: {
//         _id: '6638fc68b1c5fbdb37b6cdbf',
//         sentStatus: {
//           isSent: true,
//           timestamp: 1717701731521,
//         },
//         senderDetails: {},
//       },
//       otherMembers: [
//         {
//           _id: '66575d714b8681323e597231',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//         {
//           _id: '663a576d0adc9be47e830aa5',
//           deliveredStatus: null,
//           readStatus: null,
//         },
//       ],
//     },
//   ],
// };

const groupMessages = (msgs: any, _id: string) => {
  if (!msgs && !msgs?.length) return [];
  const groupedMessages = msgs
    ?.reduce((acc: any, message: any) => {
      const lastGroup = acc && acc?.length ? acc?.[acc.length - 1] : null;
      const isSameSender = lastGroup
        ? lastGroup?.[0]?.sender?._id === message?.sender?._id
        : false;
      if (isSameSender) {
        lastGroup.push(message);
      } else {
        acc.push([message]);
      }
      return acc;
    }, [])
    .map((msgGroups: any) => ({
      side: msgGroups?.[0]?.sender?._id === _id ? 'right' : 'left',
      data: msgGroups,
    }));
  return groupedMessages;
};

export const useMessages = (
  chatId: string | null,
  setMessagesQueue: Dispatch<SetStateAction<string[]>>,
) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageGroups, setMessageGroups] = useState<any[]>([]);
  const { auth: { _id = '' } = {} } = useAuth();

  const messagesWithQueue = (msgs: any) => {
    setMessagesQueue((prev: any[]) => {
      if (prev?.length && msgs?.length) {
        const queue = prev?.filter(
          (el: any) =>
            !msgs?.some(
              (el2: any) =>
                el?.timestamp === el2?.sender?.sentStatus?.timestamp,
            ),
        );
        return queue;
      }
      return prev;
    });
    setMessages(msgs);
    const messageGroupsData = groupMessages(msgs, _id);
    setMessageGroups(messageGroupsData);
  };

  const {
    client,
    refetch: refetchMessages,
    data: messagesData,
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

  return {
    createMessage,
    updateMessage,
    client,
    messagesData,
    loadingMessages,
    loadingCreateMessage,
    loadingUpdateMessage,
    loadingOnMessageAdded,
    errorMessages,
    errorCreateMessage,
    errorUpdateMessage,
    errorOnMessageAdded,
    messages,
    setMessages,
    messageGroups,
    setMessageGroups,
    groupMessages,
    messagesWithQueue,
    refetchMessages,
  };
};
