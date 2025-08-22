/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Any scalar type */
  Any: { input: any; output: any; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

/** AuthTokensObject */
export type AuthTokens = {
  __typename?: 'AuthTokens';
  access_token: Scalars['String']['output'];
  expires_in: Scalars['Int']['output'];
  expiry_date: Scalars['Float']['output'];
  id_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  scope: Scalars['String']['output'];
  token_type: Scalars['String']['output'];
};

/** ChatObject */
export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  friends: Array<ChatFriendMember>;
  isActive: Scalars['Boolean']['output'];
  lastMessage?: Maybe<Message>;
  members: Array<ChatMember>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** ChatDataObject */
export type ChatData = {
  __typename?: 'ChatData';
  chat: Chat;
  friendIds?: Maybe<Array<Scalars['String']['output']>>;
};

/** ChatFriendMemberObject */
export type ChatFriendMember = {
  __typename?: 'ChatFriendMember';
  _id: Scalars['String']['output'];
};

/** ChatInput */
export type ChatInput = {
  chatId: Scalars['String']['input'];
};

/** ChatMemberObject */
export type ChatMember = {
  __typename?: 'ChatMember';
  _id: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  email_verified?: Maybe<Scalars['String']['output']>;
  family_name?: Maybe<Scalars['String']['output']>;
  given_name?: Maybe<Scalars['String']['output']>;
  hasAdded: Scalars['Boolean']['output'];
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  unreadMessagesCount?: Maybe<Scalars['Int']['output']>;
};

/** ChatsInput */
export type ChatsInput = {
  userId: Scalars['String']['input'];
};

/** ClientObject */
export type Client = {
  __typename?: 'Client';
  _id: Scalars['String']['output'];
  lastActive?: Maybe<Scalars['Date']['output']>;
  sessionID: Scalars['String']['output'];
};

/** CreateChatDataObject */
export type CreateChatData = {
  __typename?: 'CreateChatData';
  chat: Chat;
  isAlreadyCreated: Scalars['Boolean']['output'];
};

/** CreateChatInput */
export type CreateChatInput = {
  friendIds: Array<Scalars['String']['input']>;
  friendUserIds: Array<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

/** CreateMessageInput */
export type CreateMessageInput = {
  chatId: Scalars['String']['input'];
  isQueued: Scalars['Boolean']['input'];
  isSent: Scalars['Boolean']['input'];
  message: Scalars['String']['input'];
  queueId: Scalars['String']['input'];
  queuedTimestamp: Scalars['Float']['input'];
  sentTimestamp: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};

/** CreateRequestInput */
export type CreateRequestInput = {
  sendToEmail: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

/** DeliveredStatusObject */
export type DeliveredStatus = {
  __typename?: 'DeliveredStatus';
  isDelivered: Scalars['Boolean']['output'];
  timestamp: Scalars['Float']['output'];
};

/** FriendObject */
export type Friend = {
  __typename?: 'Friend';
  _id: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  hasChats?: Maybe<Scalars['Boolean']['output']>;
  isActive: Scalars['Boolean']['output'];
  lastMessage?: Maybe<Message>;
  members: Array<FriendMember>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

/** FriendDataObject */
export type FriendData = {
  __typename?: 'FriendData';
  friend: Friend;
};

/** FriendInput */
export type FriendInput = {
  friendId: Scalars['String']['input'];
};

/** FriendMemberObject */
export type FriendMember = {
  __typename?: 'FriendMember';
  _id: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  email_verified?: Maybe<Scalars['String']['output']>;
  family_name?: Maybe<Scalars['String']['output']>;
  given_name?: Maybe<Scalars['String']['output']>;
  hasAdded: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  unreadMessagesCount?: Maybe<Scalars['Int']['output']>;
};

/** FriendsInput */
export type FriendsInput = {
  userId: Scalars['String']['input'];
};

/** MarkNotificationsReadInput */
export type MarkNotificationsReadInput = {
  userId: Scalars['String']['input'];
  value: Scalars['Boolean']['input'];
};

/** MarkReadObject */
export type MarkRead = {
  __typename?: 'MarkRead';
  acknowledged: Scalars['Boolean']['output'];
  matchedCount: Scalars['Float']['output'];
  modifiedCount: Scalars['Float']['output'];
  upsertedCount: Scalars['Float']['output'];
  upsertedId?: Maybe<Scalars['String']['output']>;
};

/** MarkReadInput */
export type MarkReadInput = {
  chatId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

/** MessageObject */
export type Message = {
  __typename?: 'Message';
  _id: Scalars['String']['output'];
  chatId: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  queueId: Scalars['String']['output'];
  receivers: Array<Receiver>;
  sender: Sender;
  timestamp: Scalars['Float']['output'];
};

/** MessageDataObject */
export type MessageData = {
  __typename?: 'MessageData';
  message: Message;
};

/** MessageInput */
export type MessageInput = {
  messageId: Scalars['String']['input'];
};

/** MessagesDataObject */
export type MessagesData = {
  __typename?: 'MessagesData';
  edges: Array<Message>;
  isFetched?: Maybe<Scalars['Boolean']['output']>;
  pageInfo: PageInfo;
  scrollPosition: Scalars['Int']['output'];
};

/** MessagesInput */
export type MessagesInput = {
  chatId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: CreateChatData;
  createMessage: Message;
  createRequest: Request;
  markAllAsRead: MarkRead;
  shouldNotifyUser: UserClient;
  updateRequest: Request;
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateRequestArgs = {
  input: CreateRequestInput;
};


export type MutationMarkAllAsReadArgs = {
  input: MarkReadInput;
};


export type MutationShouldNotifyUserArgs = {
  input: MarkNotificationsReadInput;
};


export type MutationUpdateRequestArgs = {
  input: UpdateRequestInput;
};

/** OnlineStatusObject */
export type OnlineStatus = {
  __typename?: 'OnlineStatus';
  isOnline: Scalars['Boolean']['output'];
  lastSeen: Scalars['Date']['output'];
};

/** PageInfoObject */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  allFriends: Array<Friend>;
  cachedMessages: MessagesData;
  chat: Chat;
  chats: Array<Chat>;
  friend: Friend;
  friends: Array<Friend>;
  friendsSorted: Array<Friend>;
  message: Message;
  messages: MessagesData;
  pendingRequests: RequestsData;
  sentRequests: RequestsData;
  user: User;
  userClient: UserClient;
  userOnlineStatus: UserOnlineStatus;
  userSession: UserSession;
  userSessions: Array<UserSession>;
  userSessionsActive: Array<UserSession>;
  userSessionsInactive: Array<UserSession>;
};


export type QueryAllFriendsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  input: FriendsInput;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCachedMessagesArgs = {
  input: MessagesInput;
};


export type QueryChatArgs = {
  input: ChatInput;
};


export type QueryChatsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  input: ChatsInput;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFriendArgs = {
  input: FriendInput;
};


export type QueryFriendsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  input: FriendsInput;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFriendsSortedArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  input: FriendsInput;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMessageArgs = {
  input: MessageInput;
};


export type QueryMessagesArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  input: MessagesInput;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPendingRequestsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  input: RequestsInput;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySentRequestsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  input: RequestsInput;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  input: UserInput;
};


export type QueryUserClientArgs = {
  input: UserClientInput;
};


export type QueryUserOnlineStatusArgs = {
  input: UserClientInput;
};


export type QueryUserSessionArgs = {
  input: UserSessionInput;
};


export type QueryUserSessionsArgs = {
  input: UserSessionsInput;
};


export type QueryUserSessionsActiveArgs = {
  input: UserSessionsInput;
};


export type QueryUserSessionsInactiveArgs = {
  input: UserSessionsInput;
};

/** QueuedStatusObject */
export type QueuedStatus = {
  __typename?: 'QueuedStatus';
  isQueued: Scalars['Boolean']['output'];
  timestamp: Scalars['Float']['output'];
};

/** ReadStatusObject */
export type ReadStatus = {
  __typename?: 'ReadStatus';
  isRead: Scalars['Boolean']['output'];
  timestamp: Scalars['Float']['output'];
};

/** ReceiverObject */
export type Receiver = {
  __typename?: 'Receiver';
  _id: Scalars['String']['output'];
  deliveredStatus?: Maybe<DeliveredStatus>;
  email?: Maybe<Scalars['String']['output']>;
  email_verified?: Maybe<Scalars['String']['output']>;
  family_name?: Maybe<Scalars['String']['output']>;
  given_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  readStatus?: Maybe<ReadStatus>;
};

/** RequestObject */
export type Request = {
  __typename?: 'Request';
  _id: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  members: Array<RequestMember>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** RequestDataObject */
export type RequestData = {
  __typename?: 'RequestData';
  request: Request;
};

/** RequestMemberObject */
export type RequestMember = {
  __typename?: 'RequestMember';
  _id: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  email_verified?: Maybe<Scalars['String']['output']>;
  family_name?: Maybe<Scalars['String']['output']>;
  given_name?: Maybe<Scalars['String']['output']>;
  hasSent: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
};

/** RequestsDataObject */
export type RequestsData = {
  __typename?: 'RequestsData';
  data: Array<Request>;
  totalCount: Scalars['Float']['output'];
};

/** RequestsInput */
export type RequestsInput = {
  userId: Scalars['String']['input'];
};

/** RetryStatusObject */
export type RetryStatus = {
  __typename?: 'RetryStatus';
  isRetry: Scalars['Boolean']['output'];
  timestamp: Scalars['Float']['output'];
};

/** SenderObject */
export type Sender = {
  __typename?: 'Sender';
  _id: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  email_verified?: Maybe<Scalars['String']['output']>;
  family_name?: Maybe<Scalars['String']['output']>;
  given_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  queuedStatus: QueuedStatus;
  retryStatus?: Maybe<RetryStatus>;
  sentStatus: SentStatus;
};

/** SentStatusObject */
export type SentStatus = {
  __typename?: 'SentStatus';
  isSent: Scalars['Boolean']['output'];
  timestamp: Scalars['Float']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  OnChatAdded: ChatData;
  OnChatUpdated: ChatData;
  OnFriendAdded: FriendData;
  OnMessageAdded: MessageData;
  OnMessageUpdated: MessageData;
  OnRequestAdded: RequestData;
  OnRequestUpdated: RequestData;
  OnSessionUpdated: UserSessionData;
  OnUserClientUpdated: UserClientData;
  OnUserOnlineStatus: UserOnlineStatus;
};


export type SubscriptionOnSessionUpdatedArgs = {
  input: UserSessionInput;
};

/** UpdateRequestInput */
export type UpdateRequestInput = {
  requestId: Scalars['String']['input'];
  status: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

/** UserObject */
export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  email_verified?: Maybe<Scalars['String']['output']>;
  family_name?: Maybe<Scalars['String']['output']>;
  given_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
};

/** UserClientObject */
export type UserClient = {
  __typename?: 'UserClient';
  _id: Scalars['String']['output'];
  clients?: Maybe<Array<Client>>;
  hasNotifications?: Maybe<Scalars['Boolean']['output']>;
  lastActive?: Maybe<Scalars['Date']['output']>;
  userId: Scalars['String']['output'];
};

/** UserClientDataObject */
export type UserClientData = {
  __typename?: 'UserClientData';
  userClient: UserClient;
};

/** UserClientInput */
export type UserClientInput = {
  userId: Scalars['String']['input'];
};

/** UserInput */
export type UserInput = {
  userId: Scalars['String']['input'];
};

/** UserOnlineStatusObject */
export type UserOnlineStatus = {
  __typename?: 'UserOnlineStatus';
  onlineStatus: OnlineStatus;
  userId: Scalars['String']['output'];
};

/** UserSessionObject */
export type UserSession = {
  __typename?: 'UserSession';
  _id: Scalars['String']['output'];
  authTokens?: Maybe<AuthTokens>;
  clients?: Maybe<Array<Client>>;
  deviceDetails?: Maybe<Scalars['Any']['output']>;
  expires?: Maybe<Scalars['Date']['output']>;
  lastActive?: Maybe<Scalars['Date']['output']>;
  lastModified?: Maybe<Scalars['Date']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

/** UserSessionDataObject */
export type UserSessionData = {
  __typename?: 'UserSessionData';
  session: UserSession;
};

/** UserSessionInput */
export type UserSessionInput = {
  sessionID: Scalars['String']['input'];
};

/** UserSessionsInput */
export type UserSessionsInput = {
  userId: Scalars['String']['input'];
};

export type CachedMessagesQueryVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type CachedMessagesQuery = { __typename?: 'Query', cachedMessages: { __typename?: 'MessagesData', scrollPosition: number, isFetched?: boolean | null, edges: Array<{ __typename?: 'Message', _id: string, chatId: string, queueId: string, message: string, timestamp: number, sender: { __typename?: 'Sender', _id: string, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, retryStatus?: { __typename?: 'RetryStatus', isRetry: boolean, timestamp: number } | null, queuedStatus: { __typename?: 'QueuedStatus', isQueued: boolean, timestamp: number }, sentStatus: { __typename?: 'SentStatus', isSent: boolean, timestamp: number } }, receivers: Array<{ __typename?: 'Receiver', _id: string, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, deliveredStatus?: { __typename?: 'DeliveredStatus', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatus', isRead: boolean, timestamp: number } | null }> }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasPreviousPage: boolean, hasNextPage: boolean } } };

export type MessagesQueryVariables = Exact<{
  chatId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type MessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessagesData', scrollPosition: number, isFetched?: boolean | null, edges: Array<{ __typename?: 'Message', _id: string, chatId: string, queueId: string, message: string, timestamp: number, sender: { __typename?: 'Sender', _id: string, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, retryStatus?: { __typename?: 'RetryStatus', isRetry: boolean, timestamp: number } | null, queuedStatus: { __typename?: 'QueuedStatus', isQueued: boolean, timestamp: number }, sentStatus: { __typename?: 'SentStatus', isSent: boolean, timestamp: number } }, receivers: Array<{ __typename?: 'Receiver', _id: string, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, deliveredStatus?: { __typename?: 'DeliveredStatus', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatus', isRead: boolean, timestamp: number } | null }> }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasPreviousPage: boolean, hasNextPage: boolean } } };

export type CreateMessageMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  queueId: Scalars['String']['input'];
  isQueued: Scalars['Boolean']['input'];
  queuedTimestamp: Scalars['Float']['input'];
  isSent: Scalars['Boolean']['input'];
  sentTimestamp: Scalars['Float']['input'];
  message: Scalars['String']['input'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', _id: string, queueId: string } };

export type OnMessageAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessageAddedSubscription = { __typename?: 'Subscription', OnMessageAdded: { __typename?: 'MessageData', message: { __typename?: 'Message', _id: string, chatId: string, queueId: string, message: string, timestamp: number, sender: { __typename?: 'Sender', _id: string, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, retryStatus?: { __typename?: 'RetryStatus', isRetry: boolean, timestamp: number } | null, queuedStatus: { __typename?: 'QueuedStatus', isQueued: boolean, timestamp: number }, sentStatus: { __typename?: 'SentStatus', isSent: boolean, timestamp: number } }, receivers: Array<{ __typename?: 'Receiver', _id: string, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, deliveredStatus?: { __typename?: 'DeliveredStatus', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatus', isRead: boolean, timestamp: number } | null }> } } };

export type OnMessageUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessageUpdatedSubscription = { __typename?: 'Subscription', OnMessageUpdated: { __typename?: 'MessageData', message: { __typename?: 'Message', _id: string, chatId: string, queueId: string, message: string, timestamp: number, sender: { __typename?: 'Sender', _id: string, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, retryStatus?: { __typename?: 'RetryStatus', isRetry: boolean, timestamp: number } | null, queuedStatus: { __typename?: 'QueuedStatus', isQueued: boolean, timestamp: number }, sentStatus: { __typename?: 'SentStatus', isSent: boolean, timestamp: number } }, receivers: Array<{ __typename?: 'Receiver', _id: string, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, deliveredStatus?: { __typename?: 'DeliveredStatus', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatus', isRead: boolean, timestamp: number } | null }> } } };

export type ChatsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', _id: string, type: string, createdAt: any, members: Array<{ __typename?: 'ChatMember', _id: string, hasAdded: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, unreadMessagesCount?: number | null }>, lastMessage?: { __typename?: 'Message', message: string, timestamp: number, sender: { __typename?: 'Sender', _id: string, retryStatus?: { __typename?: 'RetryStatus', isRetry: boolean, timestamp: number } | null, queuedStatus: { __typename?: 'QueuedStatus', isQueued: boolean, timestamp: number }, sentStatus: { __typename?: 'SentStatus', isSent: boolean, timestamp: number } }, receivers: Array<{ __typename?: 'Receiver', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatus', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatus', isRead: boolean, timestamp: number } | null }> } | null }> };

export type CreateChatMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  friendIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  friendUserIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'CreateChatData', isAlreadyCreated: boolean, chat: { __typename?: 'Chat', _id: string, type: string, createdAt: any, members: Array<{ __typename?: 'ChatMember', _id: string, hasAdded: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, unreadMessagesCount?: number | null }>, friends: Array<{ __typename?: 'ChatFriendMember', _id: string }> } } };

export type OnChatAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnChatAddedSubscription = { __typename?: 'Subscription', OnChatAdded: { __typename?: 'ChatData', friendIds?: Array<string> | null, chat: { __typename?: 'Chat', _id: string, type: string, createdAt: any, members: Array<{ __typename?: 'ChatMember', _id: string, hasAdded: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, unreadMessagesCount?: number | null }>, lastMessage?: { __typename?: 'Message', message: string, timestamp: number, sender: { __typename?: 'Sender', _id: string, retryStatus?: { __typename?: 'RetryStatus', isRetry: boolean, timestamp: number } | null, queuedStatus: { __typename?: 'QueuedStatus', isQueued: boolean, timestamp: number }, sentStatus: { __typename?: 'SentStatus', isSent: boolean, timestamp: number } }, receivers: Array<{ __typename?: 'Receiver', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatus', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatus', isRead: boolean, timestamp: number } | null }> } | null } } };

export type OnChatUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnChatUpdatedSubscription = { __typename?: 'Subscription', OnChatUpdated: { __typename?: 'ChatData', chat: { __typename?: 'Chat', _id: string, type: string, createdAt: any, members: Array<{ __typename?: 'ChatMember', _id: string, hasAdded: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, unreadMessagesCount?: number | null }>, lastMessage?: { __typename?: 'Message', message: string, timestamp: number, sender: { __typename?: 'Sender', _id: string, retryStatus?: { __typename?: 'RetryStatus', isRetry: boolean, timestamp: number } | null, queuedStatus: { __typename?: 'QueuedStatus', isQueued: boolean, timestamp: number }, sentStatus: { __typename?: 'SentStatus', isSent: boolean, timestamp: number } }, receivers: Array<{ __typename?: 'Receiver', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatus', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatus', isRead: boolean, timestamp: number } | null }> } | null } } };

export type FriendsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type FriendsQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Friend', _id: string, type?: string | null, hasChats?: boolean | null, createdAt: any, members: Array<{ __typename?: 'FriendMember', _id: string, hasAdded: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, unreadMessagesCount?: number | null }>, lastMessage?: { __typename?: 'Message', message: string, timestamp: number, sender: { __typename?: 'Sender', _id: string, retryStatus?: { __typename?: 'RetryStatus', isRetry: boolean, timestamp: number } | null, queuedStatus: { __typename?: 'QueuedStatus', isQueued: boolean, timestamp: number }, sentStatus: { __typename?: 'SentStatus', isSent: boolean, timestamp: number } }, receivers: Array<{ __typename?: 'Receiver', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatus', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatus', isRead: boolean, timestamp: number } | null }> } | null }> };

export type FriendsSortedQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type FriendsSortedQuery = { __typename?: 'Query', friendsSorted: Array<{ __typename?: 'Friend', _id: string, type?: string | null, hasChats?: boolean | null, createdAt: any, members: Array<{ __typename?: 'FriendMember', _id: string, hasAdded: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, unreadMessagesCount?: number | null }>, lastMessage?: { __typename?: 'Message', message: string, timestamp: number, sender: { __typename?: 'Sender', _id: string, retryStatus?: { __typename?: 'RetryStatus', isRetry: boolean, timestamp: number } | null, queuedStatus: { __typename?: 'QueuedStatus', isQueued: boolean, timestamp: number }, sentStatus: { __typename?: 'SentStatus', isSent: boolean, timestamp: number } }, receivers: Array<{ __typename?: 'Receiver', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatus', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatus', isRead: boolean, timestamp: number } | null }> } | null }> };

export type OnFriendAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnFriendAddedSubscription = { __typename?: 'Subscription', OnFriendAdded: { __typename?: 'FriendData', friend: { __typename?: 'Friend', _id: string, type?: string | null, hasChats?: boolean | null, createdAt: any, members: Array<{ __typename?: 'FriendMember', _id: string, hasAdded: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null, unreadMessagesCount?: number | null }>, lastMessage?: { __typename?: 'Message', message: string, timestamp: number, sender: { __typename?: 'Sender', _id: string, retryStatus?: { __typename?: 'RetryStatus', isRetry: boolean, timestamp: number } | null, queuedStatus: { __typename?: 'QueuedStatus', isQueued: boolean, timestamp: number }, sentStatus: { __typename?: 'SentStatus', isSent: boolean, timestamp: number } }, receivers: Array<{ __typename?: 'Receiver', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatus', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatus', isRead: boolean, timestamp: number } | null }> } | null } } };

export type PendingRequestsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type PendingRequestsQuery = { __typename?: 'Query', pendingRequests: { __typename?: 'RequestsData', totalCount: number, data: Array<{ __typename?: 'Request', _id: string, createdAt: any, members: Array<{ __typename?: 'RequestMember', _id: string, hasSent: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null }> }> } };

export type SentRequestsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SentRequestsQuery = { __typename?: 'Query', sentRequests: { __typename?: 'RequestsData', totalCount: number, data: Array<{ __typename?: 'Request', _id: string, createdAt: any, members: Array<{ __typename?: 'RequestMember', _id: string, hasSent: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null }> }> } };

export type CreateRequestMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  sendToEmail: Scalars['String']['input'];
}>;


export type CreateRequestMutation = { __typename?: 'Mutation', createRequest: { __typename?: 'Request', _id: string } };

export type UpdateRequestMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  requestId: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateRequestMutation = { __typename?: 'Mutation', updateRequest: { __typename?: 'Request', _id: string } };

export type OnRequestAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnRequestAddedSubscription = { __typename?: 'Subscription', OnRequestAdded: { __typename?: 'RequestData', request: { __typename?: 'Request', _id: string, createdAt: any, members: Array<{ __typename?: 'RequestMember', _id: string, hasSent: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null }> } } };

export type OnRequestUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnRequestUpdatedSubscription = { __typename?: 'Subscription', OnRequestUpdated: { __typename?: 'RequestData', request: { __typename?: 'Request', _id: string, createdAt: any, members: Array<{ __typename?: 'RequestMember', _id: string, hasSent: boolean, name?: string | null, picture?: string | null, email?: string | null, email_verified?: string | null, given_name?: string | null, family_name?: string | null }> } } };

export type UserSessionsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserSessionsQuery = { __typename?: 'Query', userSessions: Array<{ __typename?: 'UserSession', _id: string, userId: string, lastActive?: any | null, deviceDetails?: any | null, expires?: any | null }> };

export type OnSessionUpdatedSubscriptionVariables = Exact<{
  sessionID: Scalars['String']['input'];
}>;


export type OnSessionUpdatedSubscription = { __typename?: 'Subscription', OnSessionUpdated: { __typename?: 'UserSessionData', session: { __typename?: 'UserSession', _id: string, userId: string, lastActive?: any | null, deviceDetails?: any | null, expires?: any | null } } };

export type UserOnlineStatusQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserOnlineStatusQuery = { __typename?: 'Query', userOnlineStatus: { __typename?: 'UserOnlineStatus', userId: string, onlineStatus: { __typename?: 'OnlineStatus', isOnline: boolean, lastSeen: any } } };

export type OnUserOnlineStatusSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnUserOnlineStatusSubscription = { __typename?: 'Subscription', OnUserOnlineStatus: { __typename?: 'UserOnlineStatus', userId: string, onlineStatus: { __typename?: 'OnlineStatus', isOnline: boolean, lastSeen: any } } };

export type UserClientQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserClientQuery = { __typename?: 'Query', userClient: { __typename?: 'UserClient', userId: string, hasNotifications?: boolean | null } };

export type OnUserClientUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnUserClientUpdatedSubscription = { __typename?: 'Subscription', OnUserClientUpdated: { __typename?: 'UserClientData', userClient: { __typename?: 'UserClient', userId: string, hasNotifications?: boolean | null } } };

export type ShouldNotifyUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  value: Scalars['Boolean']['input'];
}>;


export type ShouldNotifyUserMutation = { __typename?: 'Mutation', shouldNotifyUser: { __typename?: 'UserClient', _id: string } };


export const CachedMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"cachedMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cachedMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"queueId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"retryStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRetry"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queuedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isQueued"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scrollPosition"}},{"kind":"Field","name":{"kind":"Name","value":"isFetched"}}]}}]}}]} as unknown as DocumentNode<CachedMessagesQuery, CachedMessagesQueryVariables>;
export const MessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"messages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"queueId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"retryStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRetry"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queuedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isQueued"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scrollPosition"}},{"kind":"Field","name":{"kind":"Name","value":"isFetched"}}]}}]}}]} as unknown as DocumentNode<MessagesQuery, MessagesQueryVariables>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isQueued"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queuedTimestamp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isSent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sentTimestamp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"queueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isQueued"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isQueued"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"queuedTimestamp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queuedTimestamp"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isSent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isSent"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sentTimestamp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sentTimestamp"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"queueId"}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const OnMessageAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessageAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnMessageAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"queueId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"retryStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRetry"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queuedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isQueued"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<OnMessageAddedSubscription, OnMessageAddedSubscriptionVariables>;
export const OnMessageUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessageUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnMessageUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"queueId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"retryStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRetry"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queuedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isQueued"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<OnMessageUpdatedSubscription, OnMessageUpdatedSubscriptionVariables>;
export const ChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"chats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessagesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"retryStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRetry"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queuedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isQueued"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ChatsQuery, ChatsQueryVariables>;
export const CreateChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendUserIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"friendIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"friendUserIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendUserIds"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isAlreadyCreated"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessagesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"friends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<CreateChatMutation, CreateChatMutationVariables>;
export const OnChatAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnChatAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnChatAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendIds"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessagesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"retryStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRetry"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queuedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isQueued"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<OnChatAddedSubscription, OnChatAddedSubscriptionVariables>;
export const OnChatUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnChatUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnChatUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessagesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"retryStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRetry"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queuedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isQueued"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<OnChatUpdatedSubscription, OnChatUpdatedSubscriptionVariables>;
export const FriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"friends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessagesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"retryStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRetry"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queuedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isQueued"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasChats"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FriendsQuery, FriendsQueryVariables>;
export const FriendsSortedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"friendsSorted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendsSorted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessagesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"retryStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRetry"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queuedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isQueued"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasChats"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FriendsSortedQuery, FriendsSortedQueryVariables>;
export const OnFriendAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnFriendAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnFriendAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessagesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"retryStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRetry"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queuedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isQueued"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasChats"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<OnFriendAddedSubscription, OnFriendAddedSubscriptionVariables>;
export const PendingRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pendingRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pendingRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasSent"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<PendingRequestsQuery, PendingRequestsQueryVariables>;
export const SentRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sentRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sentRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasSent"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<SentRequestsQuery, SentRequestsQueryVariables>;
export const CreateRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendToEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sendToEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendToEmail"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateRequestMutation, CreateRequestMutationVariables>;
export const UpdateRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"requestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateRequestMutation, UpdateRequestMutationVariables>;
export const OnRequestAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnRequestAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnRequestAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"request"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasSent"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<OnRequestAddedSubscription, OnRequestAddedSubscriptionVariables>;
export const OnRequestUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnRequestUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnRequestUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"request"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasSent"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<OnRequestUpdatedSubscription, OnRequestUpdatedSubscriptionVariables>;
export const UserSessionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userSessions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"lastActive"}},{"kind":"Field","name":{"kind":"Name","value":"deviceDetails"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"lastActive"}}]}}]}}]} as unknown as DocumentNode<UserSessionsQuery, UserSessionsQueryVariables>;
export const OnSessionUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnSessionUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnSessionUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"lastActive"}},{"kind":"Field","name":{"kind":"Name","value":"deviceDetails"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"lastActive"}}]}}]}}]}}]} as unknown as DocumentNode<OnSessionUpdatedSubscription, OnSessionUpdatedSubscriptionVariables>;
export const UserOnlineStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userOnlineStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userOnlineStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"onlineStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isOnline"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}}]}}]}}]}}]} as unknown as DocumentNode<UserOnlineStatusQuery, UserOnlineStatusQueryVariables>;
export const OnUserOnlineStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnUserOnlineStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnUserOnlineStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"onlineStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isOnline"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}}]}}]}}]}}]} as unknown as DocumentNode<OnUserOnlineStatusSubscription, OnUserOnlineStatusSubscriptionVariables>;
export const UserClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"hasNotifications"}}]}}]}}]} as unknown as DocumentNode<UserClientQuery, UserClientQueryVariables>;
export const OnUserClientUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnUserClientUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnUserClientUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userClient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"hasNotifications"}}]}}]}}]}}]} as unknown as DocumentNode<OnUserClientUpdatedSubscription, OnUserClientUpdatedSubscriptionVariables>;
export const ShouldNotifyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"shouldNotifyUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shouldNotifyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<ShouldNotifyUserMutation, ShouldNotifyUserMutationVariables>;