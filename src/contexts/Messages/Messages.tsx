import { createContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  // MESSAGE_UPDATED_SUBSCRIPTION,
} from './gql';
import { groupMessages } from '../../helpers';
import { useAuth } from '../../hooks';
import { MessageData } from './IMessage';

export const MessagesContext = createContext<any>({});

export const MessagesProvider = ({ children }: any) => {
  const [searchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const { auth: { _id = '' } = {} } = useAuth();
  const [loadingCached, setLoadingCached] = useState(false);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [messageGroups, setMessageGroups] = useState<any[]>([]);
  const [messageQueue, setMessageQueue] = useState<any[]>([]);

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

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('messageQueueDatabase', 1);

      if (request) {
        request.onupgradeneeded = (event: any) => {
          const db = event?.target?.result;
          if (!db.objectStoreNames.contains('messageQueueStore')) {
            const objectStore = db.createObjectStore('messageQueueStore', {
              keyPath: 'id',
              autoIncrement: true,
            });
            objectStore.createIndex('chatId', 'chatId', { unique: false });
            objectStore.createIndex('timestamp', 'timestamp', {
              unique: false,
            });
            objectStore.createIndex(
              'chatId_timestamp',
              ['chatId', 'timestamp'],
              { unique: false },
            );
          }
        };

        request.onsuccess = (event: any) => {
          resolve(event?.target?.result);
        };

        request.onerror = (event: any) => {
          reject(`Error opening database: ${event?.target?.errorCode}`);
        };
      }
    });
  };

  const addMessageToQueue = async (messageData: MessageData) => {
    const db: any = await openDatabase();

    if (db) {
      return new Promise<number | null>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readwrite');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const request = objectStore?.add?.(messageData);

            if (request) {
              request.onsuccess = (event: any) => {
                const id = event?.target?.result;
                if (id) {
                  resolve(id);
                } else {
                  resolve(null);
                }
              };

              request.onerror = () => {
                reject('Error retrieving chat');
              };
            }
          }
        }
      });
    }
  };

  const updateMessageToQueue = async (id: number, newChatId: string) => {
    const db: any = await openDatabase();

    if (db) {
      return new Promise<boolean>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readwrite');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const request = objectStore?.get?.(id);

            if (request) {
              request.onsuccess = (event: any) => {
                const messageData = event?.target?.result;
                if (messageData) {
                  messageData.chatId = newChatId;
                  const updateRequest = objectStore?.put?.(messageData);
                  if (updateRequest) {
                    updateRequest.onsuccess = () => {
                      resolve(true);
                    };

                    updateRequest.onerror = () => {
                      reject('Error updating message');
                    };
                  }
                } else {
                  resolve(false);
                }
              };

              request.onerror = () => {
                reject('Error retrieving chat');
              };
            }
          }
        }
      });
    }
  };

  const deleteMessageFromQueue = async (id: number) => {
    const db: any = await openDatabase();

    if (db) {
      return new Promise<boolean>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readwrite');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const deleteRequest = objectStore?.delete?.(id);

            if (deleteRequest) {
              deleteRequest.onsuccess = () => {
                resolve(true);
              };

              deleteRequest.onerror = () => {
                reject('Error deleting message');
              };
            }
          }
        }
      });
    }
  };

  const getQueuedMessageById = async (id: number | null) => {
    const db: any = await openDatabase();

    return new Promise<MessageData | null>((resolve, reject) => {
      const transaction = db?.transaction?.('messageQueueStore', 'readonly');

      if (transaction) {
        const objectStore = transaction?.objectStore?.('messageQueueStore');

        if (objectStore) {
          const request = objectStore?.get?.(id);

          if (request) {
            request.onsuccess = (event: any) => {
              const message = event?.target?.result;

              if (message) {
                resolve(message);
              } else {
                resolve(null);
              }
            };

            request.onerror = () => {
              reject('Error fetching message by ID');
            };
          }
        }
      }
    });
  };

  const getQueuedMessagesByChatId = async (
    chatId: string,
    limit: number,
    offset: number,
  ) => {
    const db: any = await openDatabase();

    return new Promise<any[]>((resolve, reject) => {
      const transaction = db?.transaction?.('messageQueueStore', 'readonly');

      if (transaction) {
        const objectStore = transaction?.objectStore?.('messageQueueStore');

        if (objectStore) {
          const index = objectStore?.index?.('chatId_timestamp');

          if (index) {
            const lowerBound = [chatId, -Infinity]; //
            const upperBound = [chatId, Infinity]; //
            const range = IDBKeyRange.bound(lowerBound, upperBound);

            const request = index?.openCursor?.(range, 'next');

            if (request) {
              const messages: any[] = [];
              let count = 0;

              request.onsuccess = (event: any) => {
                const cursor = event?.target?.result;

                if (!cursor) {
                  resolve(messages);
                  return;
                }

                if (count >= offset && messages?.length < limit) {
                  messages?.push?.(cursor?.value);
                }

                count++;

                if (messages?.length < limit) {
                  cursor?.continue?.();
                } else {
                  resolve(messages);
                }
              };

              request.onerror = () => {
                reject('Error fetching paginated messages');
              };
            }
          }
        }
      }
    });
  };

  const getQueuedMessages = async (
    id: string,
    emptyMsgs?: boolean,
    setLoading?: any,
  ) => {
    setLoading?.(true);
    try {
      const queuedMessages = await getQueuedMessagesByChatId(id, 25, 0);
      if (emptyMsgs) {
        setMessageGroups([]);
      }
      setMessageQueue(queuedMessages);
    } catch (error) {
      console.error('Error getting queued messages:', error);
      if (emptyMsgs) {
        setMessageGroups([]);
      }
      setMessageQueue([]);
    } finally {
      setLoading?.(false);
    }
  };

  const getMessages = async (id: string, msgs: any[]) => {
    try {
      await getQueuedMessages(id);
    } catch (error) {
      console.error('Error getting queued messages:', error);
      setMessageQueue([]);
    }

    if (msgs && msgs?.length) {
      const messageGroupsData = groupMessages(msgs, _id);
      console.log('hereeee');
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
      setMessageGroups([]);
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
        // messageQueueIndexedDb
        openDatabase,
        addMessageToQueue,
        updateMessageToQueue,
        deleteMessageFromQueue,
        getQueuedMessageById,
        getQueuedMessagesByChatId,
        getQueuedMessages,
        getCachedMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
