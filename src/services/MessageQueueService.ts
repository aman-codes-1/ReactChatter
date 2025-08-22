import { MessageData } from '../contexts';
import {
  addUpdateChat,
  deleteFriendsCachedMessages,
  deleteKeyValuePairs,
  getFriendId,
  getMember,
  renderMessage,
} from '../helpers';

export class MessageQueueService {
  private friendId: string;
  private createChat: any;
  private createMessage: any;
  private chatsClient: any;
  private cachedMessagesClient: any;
  private setSearchParams: any;
  private setLoadingProcessNextMessage: any;
  private chatIdToUse: string;
  private friendIdToUse: any;
  private isUpdated: boolean;

  constructor(
    friendId?: string,
    createChat?: any,
    createMessage?: any,
    chatsClient?: any,
    cachedMessagesClient?: any,
    setSearchParams?: any,
    setLoadingProcessNextMessage?: any,
  ) {
    this.friendId = friendId || '';
    this.createChat = createChat || null;
    this.createMessage = createMessage || null;
    this.chatsClient = chatsClient || null;
    this.cachedMessagesClient = cachedMessagesClient || null;
    this.setSearchParams = setSearchParams || null;
    this.setLoadingProcessNextMessage = setLoadingProcessNextMessage || null;
    this.chatIdToUse = '';
    this.friendIdToUse = '';
    this.isUpdated = false;
  }

  openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('messageQueueDatabase', 1);

      if (request) {
        request.onupgradeneeded = (event: any) => {
          const db = event?.target?.result;
          if (!db.objectStoreNames.contains('messageQueueStore')) {
            const objectStore = db.createObjectStore('messageQueueStore', {
              keyPath: 'queueId',
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
  }

  async addMessageToQueue(messageData: MessageData) {
    const db: any = await this.openDatabase();

    if (db) {
      return new Promise<MessageData>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readwrite');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const messageDataCopy = { ...messageData };
            if (!messageDataCopy?.queueId) {
              messageDataCopy.queueId = crypto.randomUUID();
            }

            const request = objectStore?.add?.(messageData);

            if (request) {
              request.onsuccess = (event: any) => {
                const queueId = event?.target?.result;
                messageDataCopy.queueId = queueId || '';
                resolve(messageDataCopy);
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

  async updateMessageToQueue(queueId: string, obj: any, keysToDelete?: any[]) {
    const db: any = await this.openDatabase();

    if (db) {
      return new Promise<MessageData | null>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readwrite');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const request = objectStore?.get?.(queueId);

            if (request) {
              request.onsuccess = (event: any) => {
                const messageData = event?.target?.result;
                if (messageData) {
                  let messageDataCopy = { ...messageData };
                  messageDataCopy = keysToDelete
                    ? deleteKeyValuePairs(messageDataCopy, keysToDelete)
                    : messageDataCopy;

                  Object.keys(obj || {}).forEach((key) => {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                      messageDataCopy[key] = obj[key];
                    }
                  });

                  const updateRequest = objectStore?.put?.(messageDataCopy);
                  if (updateRequest) {
                    updateRequest.onsuccess = () => {
                      resolve(messageDataCopy);
                    };

                    updateRequest.onerror = () => {
                      reject('Error updating message');
                    };
                  }
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

  async deleteMessageFromQueue(queueId: string) {
    const db: any = await this.openDatabase();

    if (db) {
      return new Promise<boolean>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readwrite');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const deleteRequest = objectStore?.delete?.(queueId);

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

  async getQueuedMessageById(queueId: number | null) {
    const db: any = await this.openDatabase();

    if (db) {
      return new Promise<MessageData | null>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readonly');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const request = objectStore?.get?.(queueId);

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
                reject('Error fetching queued message');
              };
            }
          }
        }
      });
    }
  }

  async getQueuedMessagesById(
    id: string,
    startTimestamp?: number,
    endTimestamp?: number,
  ) {
    const db: any = await this.openDatabase();

    if (db) {
      return new Promise<any>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readonly');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const index = objectStore?.index?.('chatId_timestamp');

            if (index) {
              const lowerBound = [id, startTimestamp ?? -Infinity];
              const upperBound = [id, endTimestamp ?? Infinity];
              const range = IDBKeyRange.bound(lowerBound, upperBound);

              const request = index?.openCursor?.(range, 'next');

              if (request) {
                const messages: any[] = [];

                request.onsuccess = (event: any) => {
                  const cursor = event?.target?.result;

                  if (!cursor) {
                    resolve(messages);
                    return;
                  }

                  messages?.push?.(cursor?.value);
                  cursor?.continue?.();
                };

                request.onerror = () => {
                  reject('Error fetching queued messages');
                };
              }
            }
          }
        }
      });
    }
  }

  async getLastQueuedMessageByData(data: any[], key?: string, _id?: string) {
    const db: any = await this.openDatabase();

    if (db) {
      return new Promise<any>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readonly');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const index = objectStore?.index?.('chatId_timestamp');
            const resultMap = new Map();
            let isUpdated = false;

            if (index) {
              const promises = data?.map((item) => {
                let id = item?._id;
                if (key === 'friend') {
                  const { otherMember } = getMember(item?.members, _id || '');
                  id = `${id}-${otherMember?._id}`;
                }
                const startTimestamp = item?.lastMessage?.timestamp;
                return new Promise<void>((resolveItem, rejectItem) => {
                  const lowerBound = [id, startTimestamp ?? -Infinity];
                  const upperBound = [id, Infinity];
                  const range = IDBKeyRange.bound(lowerBound, upperBound);

                  const request = index?.openCursor?.(range, 'prev');

                  if (request) {
                    request.onsuccess = (event: any) => {
                      const cursor = event?.target?.result;
                      if (cursor) {
                        resultMap?.set(item?._id, cursor?.value);
                        isUpdated = true;
                      }
                      resolveItem();
                    };

                    request.onerror = (event: any) => {
                      rejectItem(event?.target?.error);
                    };
                  }
                });
              });

              Promise.all(promises)
                .then(() => {
                  resolve({
                    isUpdated,
                    data: data?.map((item) => ({
                      ...item,
                      lastMessage:
                        resultMap?.get(item?._id) || item?.lastMessage,
                    })),
                  });
                })
                .catch((error) => reject(error));
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
            const index = objectStore?.index?.('timestamp');

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

                  const message = cursor?.value;
                  const isRetry =
                    message?.sender?.retryStatus?.isRetry === true;

                  if (!isRetry) {
                    if (count === offset) {
                      resolve({ message, cursor });
                      return;
                    }
                    count++;
                  }

                  cursor.continue();
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

  async bulkUpdateChatIdCursor(oldChatId: string, newChatId: string) {
    const db: any = await this.openDatabase();

    if (db) {
      return new Promise<void>((resolve, reject) => {
        const transaction = db?.transaction?.('messageQueueStore', 'readwrite');

        if (transaction) {
          const objectStore = transaction?.objectStore?.('messageQueueStore');

          if (objectStore) {
            const index = objectStore?.index?.('chatId');

            if (index) {
              const request = index?.openCursor?.(
                IDBKeyRange?.only?.(oldChatId),
              );

              if (request) {
                let updatedCount = 0;

                request.onsuccess = (event: any) => {
                  const cursor = event?.target?.result;
                  if (cursor) {
                    const record = cursor?.value;
                    record.chatId = newChatId;
                    cursor.update(record);
                    updatedCount++;
                    cursor?.continue?.();
                  }
                };

                transaction.oncomplete = () => resolve();
                transaction.onerror = () => reject(transaction?.error);
                request.onerror = () => reject('Error updating bulk records');
              }
            }
          }
        }
      });
    }
  }

  async removeCursorFromQueueAndRestart(cursor: any) {
    await cursor?.delete?.();
    this.setLoadingProcessNextMessage(false);
    return this.processNextMessage();
  }

  async removeFromQueueAndRestart(queueId: string) {
    await this.deleteMessageFromQueue(queueId);
    this.setLoadingProcessNextMessage(false);
    return this.processNextMessage();
  }

  async shouldRetryAndProcessNext(
    queueId: string,
    isRetry: boolean,
    sender: any,
    offset: number,
  ) {
    if (!isRetry) {
      await this.updateMessageToQueue(queueId, {
        sender: {
          ...sender,
          retryStatus: { isRetry: true, timestamp: Date.now() },
        },
      });
    }

    this.setLoadingProcessNextMessage(false);
    return this.processNextMessage(offset + 1);
  }

  async getNextMessageForProcessing(offset: number): Promise<any> {
    const data = await this.getNextQueuedMessage(offset);
    return data;
  }

  async processNextMessage(offset = 0): Promise<void> {
    const { message, cursor } =
      (await this.getNextMessageForProcessing(offset)) || {};
    if (!message) return;
    this.setLoadingProcessNextMessage(true);

    let queuedMessage = message;
    const { queueId, sender, chatId } = queuedMessage || {};

    if (!queueId) await this.removeCursorFromQueueAndRestart(cursor);

    const userId = sender?._id;
    const isRetry = sender?.retryStatus?.isRetry || false;
    const timestamp = Date.now();
    this.chatIdToUse = chatId || '';
    this.isUpdated = false;

    const { friendId, friendUserId } = getFriendId(this.chatIdToUse);
    this.friendIdToUse = friendId || '';

    try {
      if (this.friendIdToUse && friendUserId) {
        const newChat = await this.createChat?.({
          variables: {
            userId,
            type: 'private',
            friendIds: [this.friendIdToUse],
            friendUserIds: [friendUserId],
          },
        });

        const createdChatData = newChat?.data?.createChat;
        const createdChatIsAlreadyCreated = createdChatData?.isAlreadyCreated;
        const createdChat = createdChatData?.chat;
        const createdChatId = createdChat?._id;
        const createdChatFriends = createdChat?.friends;
        const createdChatFriendId = createdChatFriends?.[0]?._id;

        if (!createdChatId || !createdChatFriendId) {
          await this.shouldRetryAndProcessNext(
            queueId,
            isRetry,
            sender,
            offset,
          );
        }

        await renderMessage(
          this.cachedMessagesClient,
          queuedMessage,
          createdChatId,
        );

        deleteFriendsCachedMessages(
          this.cachedMessagesClient,
          this.chatIdToUse,
        );

        await this.bulkUpdateChatIdCursor(this.chatIdToUse, createdChatId);

        this.chatIdToUse = createdChatId;
        this.friendIdToUse = createdChatFriendId;

        const chatData = {
          ...createdChat,
          lastMessage: queuedMessage,
        };

        if (createdChatIsAlreadyCreated) {
          addUpdateChat(
            this.chatsClient,
            userId,
            this.chatIdToUse,
            '_id',
            chatData,
          );
        } else {
          addUpdateChat(
            this.chatsClient,
            userId,
            this.friendIdToUse,
            '_id',
            chatData,
          );
        }

        const newData = {
          chatId: this.chatIdToUse,
        };

        const updatedQueuedMessage = await this.updateMessageToQueue(
          queueId,
          newData,
        ).catch((err) => {
          console.error('Error updating to queue:', err);
          return null;
        });

        if (updatedQueuedMessage) {
          queuedMessage = updatedQueuedMessage;
          this.isUpdated = true;
        }

        if (!this.isUpdated) {
          queuedMessage = {
            ...queuedMessage,
            ...newData,
          };
        }

        if (
          this.friendId &&
          this.friendIdToUse &&
          this.chatIdToUse &&
          this.friendId === this.friendIdToUse
        ) {
          this.setSearchParams?.(
            (params: any) => {
              params.set('id', this.chatIdToUse);
              params.set('type', 'chat');
              return params;
            },
            { replace: true },
          );
        }
      }

      if (this.chatIdToUse) {
        const queuedMessageMessage = queuedMessage?.message;
        const queuedMessageSender = queuedMessage?.sender;
        const queuedMessageQueuedStatus = queuedMessageSender?.queuedStatus;
        const queuedMessageQueuedStatusIsQueued =
          queuedMessageQueuedStatus?.isQueued || true;
        const queuedMessageQueuedStatusTimestamp =
          queuedMessageQueuedStatus?.timestamp || timestamp;

        const newMessage = await this.createMessage?.({
          variables: {
            chatId: this.chatIdToUse,
            userId,
            queueId,
            isQueued: queuedMessageQueuedStatusIsQueued,
            queuedTimestamp: queuedMessageQueuedStatusTimestamp,
            isSent: true,
            sentTimestamp: Date.now(),
            message: queuedMessageMessage,
          },
        });

        const createdMessageData = newMessage?.data?.createMessage;
        const createdMessageId = createdMessageData?._id;
        const createdMessageQueueId = createdMessageData?.queueId;

        if (!createdMessageId) {
          await this.shouldRetryAndProcessNext(
            queueId,
            isRetry,
            sender,
            offset,
          );
        }

        if (createdMessageQueueId) {
          await this.removeFromQueueAndRestart(createdMessageQueueId);
        }
      }

      this.chatIdToUse = '';
      this.friendIdToUse = '';
      this.isUpdated = false;

      await this.shouldRetryAndProcessNext(queueId, isRetry, sender, offset);
    } catch (err: any) {
      const errorMessage = err?.message;
      if (errorMessage) {
        const isDuplicateRecordFound = errorMessage?.includes?.('Duplicate');
        const isChatNotFoundError = errorMessage?.includes?.('Chat not found');
        if (isDuplicateRecordFound || isChatNotFoundError) {
          await this.removeFromQueueAndRestart(queueId);
        }
      }

      await this.shouldRetryAndProcessNext(queueId, isRetry, sender, offset);
    } finally {
      this.setLoadingProcessNextMessage(false);
    }
  }

  async processQueue() {
    this.setLoadingProcessNextMessage(false);
    await this.processNextMessage();
  }
}
