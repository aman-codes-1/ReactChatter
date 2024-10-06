import { MessageData } from '../contexts/Messages/IMessage';

export class MessageQueueService {
  private isSending: boolean = false;
  private intervalId: any = null;
  private createChat: any;
  private createMessage: any;

  constructor(createChatMutation?: any, createMessageMutation?: any) {
    this.createChat = createChatMutation || null;
    this.createMessage = createMessageMutation || null;
  }

  start() {
    if (!this.isSending) {
      this.isSending = true;
      this.processQueue();
      this.intervalId = setInterval(this.processQueue.bind(this), 5000);
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isSending = false;
    }
  }

  openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('messageQueueDatabase', 1);

      if (request) {
        request.onupgradeneeded = (event: any) => {
          const db = event?.target?.result;
          if (!db.objectStoreNames.contains('messageQueueStore')) {
            const objectStore = db.createObjectStore('messageQueueStore', {
              keyPath: 'id',
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
            objectStore.createIndex(
              'friendId_timestamp',
              ['friendId', 'timestamp'],
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
  }

  async addMessageToQueue(messageData: MessageData) {
    const db: any = await this.openDatabase();

    if (db) {
      return new Promise<MessageData | null>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readwrite');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            if (!messageData?.id) {
              messageData.id = crypto.randomUUID();
            }

            const request = objectStore?.add?.(messageData);

            if (request) {
              request.onsuccess = (event: any) => {
                const id = event?.target?.result;
                if (id) {
                  messageData.id = id;
                  resolve(messageData);
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
  }

  async updateMessageToQueue<T>(id: string, obj: Partial<T>) {
    const db: any = await this.openDatabase();

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
                  for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      messageData[key] = obj[key];
                    }
                  }
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
  }

  async deleteMessageFromQueue(id: string) {
    const db: any = await this.openDatabase();

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
  }

  async getQueuedMessageById(id: number | null) {
    const db: any = await this.openDatabase();

    if (db) {
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
    }
  }

  async getQueuedMessagesById(
    id: string,
    key: string,
    limit: number,
    offset: number,
  ) {
    const db: any = await this.openDatabase();

    if (db) {
      return new Promise<any>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readonly');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const index = objectStore?.index?.(`${key}_timestamp`);

            if (index) {
              const lowerBound = [id, -Infinity]; //
              const upperBound = [id, Infinity]; //
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
    }
  }

  async getNextQueuedMessage(offset: number) {
    const db: any = await this.openDatabase();

    if (db) {
      return new Promise<any | null>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readonly');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const index = objectStore.index('timestamp');

            if (index) {
              const request = index?.openCursor?.();

              if (request) {
                let count = 0;

                request.onsuccess = (event: any) => {
                  const cursor = event?.target?.result;

                  if (!cursor) {
                    resolve(null);
                    return;
                  }

                  if (offset === 1 && count === 0) {
                    resolve(null);
                    return;
                  }

                  if (count === offset) {
                    const message = cursor?.value;
                    resolve({ message, cursor });
                  } else {
                    count++;
                    cursor?.continue?.();
                  }
                };

                request.onerror = () => {
                  reject('Error fetching message by offset');
                };
              }
            }
          }
        }
      });
    }
  }

  async processQueue() {
    const removeCursorFromQueueAndRestart = async (cursor: any) => {
      await cursor?.delete?.();
      return processNextMessage(0);
    };

    const removeFromQueueAndRestart = async (id: string) => {
      await this.deleteMessageFromQueue(id);
      return processNextMessage(0);
    };

    const shouldRetryAndProcessNext = async (
      id: string,
      retryCount: number,
      isRetry: boolean,
      offset: number,
    ) => {
      if (retryCount < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return processNextMessage(retryCount + 1, offset);
      }

      if (!isRetry) {
        await this.updateMessageToQueue(id, { isRetry: true });
      }

      return processNextMessage(0, offset + 1);
    };

    const createChatAndUpdateToQueue = async (
      id: string,
      friendId: string,
      selectedMember: any,
      retryCount: number,
      senderId: string,
      isRetry: boolean,
      offset: number,
    ) => {
      const createdChat = await this.createChat?.({
        variables: {
          userId: senderId,
          friendId,
          queueId: id,
          type: 'private',
          friendUserId: selectedMember?._id,
        },
      });

      const createdChatData = createdChat?.data?.createChat;
      const createdChatId = createdChatData?._id;
      if (!createdChatId)
        await shouldRetryAndProcessNext(id, retryCount, isRetry, offset);

      await this.updateMessageToQueue(id, {
        chatId: createdChatId,
      });

      return createdChatId;
    };

    const createMessageAndRemoveFromQueue = async (
      id: string,
      chatId: string,
      rest: any,
      retryCount: number,
      senderId: any,
      isRetry: boolean,
      offset: number,
    ) => {
      const createdMessage = await this.createMessage?.({
        variables: {
          ...rest,
          chatId,
          senderId,
          queueId: id,
        },
      });

      const createdMessageData = createdMessage?.data?.createMessage;
      const createdMessageId = createdMessageData?._id;
      if (!createdMessageId)
        await shouldRetryAndProcessNext(id, retryCount, isRetry, offset);
    };

    const getNextMessageForProcessing = async (offset: number): Promise<any> =>
      await this.getNextQueuedMessage(offset);

    const processNextMessage = async (
      retryCount = 0,
      offset = 0,
    ): Promise<void> => {
      const { message, cursor } =
        (await getNextMessageForProcessing(offset)) || {};

      if (!message) return;

      const { id, sender, chatId, friendId, selectedMember, ...rest } =
        message || {};

      if (!id) await removeCursorFromQueueAndRestart(cursor);

      const senderId = sender?._id;
      const isRetry = sender?.sentStatus?.isRetry || false;

      let chatIdToUse = chatId || '';

      try {
        if (!chatIdToUse && friendId) {
          chatIdToUse = await createChatAndUpdateToQueue(
            id,
            friendId,
            selectedMember,
            retryCount,
            senderId,
            isRetry,
            offset,
          );
        }

        if (chatIdToUse) {
          await createMessageAndRemoveFromQueue(
            id,
            chatIdToUse,
            rest,
            retryCount,
            senderId,
            isRetry,
            offset,
          );

          await removeFromQueueAndRestart(id);
        }

        await shouldRetryAndProcessNext(id, retryCount, isRetry, offset);
      } catch (error: any) {
        const errorMessage = error?.message || '';
        const isDuplicateRecordFound = errorMessage?.includes?.('Duplicate');
        const isChatNotFoundError = errorMessage?.includes?.('Chat not found');

        if (isDuplicateRecordFound || isChatNotFoundError) {
          await removeFromQueueAndRestart(id);
        }

        await shouldRetryAndProcessNext(id, retryCount, isRetry, offset);
      }
    };

    await processNextMessage();
  }
}
