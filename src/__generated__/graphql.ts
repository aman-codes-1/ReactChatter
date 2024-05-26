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
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

/** ChatObject */
export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['String']['output'];
  members: Array<ChatMember>;
  type: Scalars['String']['output'];
};

/** ChatDataObject */
export type ChatData = {
  __typename?: 'ChatData';
  chat: Chat;
  friendId: Scalars['String']['output'];
};

/** ChatInput */
export type ChatInput = {
  chatId: Scalars['String']['input'];
};

/** ChatMemberObject */
export type ChatMember = {
  __typename?: 'ChatMember';
  _id: Scalars['String']['output'];
  hasAdded: Scalars['Boolean']['output'];
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  memberDetails?: Maybe<ChatMemberDetails>;
};

/** ChatMemberDetailsObject */
export type ChatMemberDetails = {
  __typename?: 'ChatMemberDetails';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  email_verified: Scalars['Boolean']['output'];
  family_name: Scalars['String']['output'];
  given_name: Scalars['String']['output'];
  name: Scalars['String']['output'];
  picture: Scalars['String']['output'];
};

/** ChatsInput */
export type ChatsInput = {
  userId: Scalars['String']['input'];
};

/** CreateChatInput */
export type CreateChatInput = {
  friendId: Scalars['String']['input'];
  friendUserId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

/** CreateMessageInput */
export type CreateMessageInput = {
  chatId: Scalars['String']['input'];
  message: Scalars['String']['input'];
  otherMembers: Array<OtherMemberInput>;
  sender: SenderInput;
  userId: Scalars['String']['input'];
};

/** CreateRequestInput */
export type CreateRequestInput = {
  sendToEmail: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type DeliveredStatusInput = {
  isDelivered: Scalars['Boolean']['input'];
  timestamp: Scalars['Float']['input'];
};

export type DeliveredStatusObject = {
  __typename?: 'DeliveredStatusObject';
  isDelivered: Scalars['Boolean']['output'];
  timestamp: Scalars['Float']['output'];
};

/** FriendObject */
export type Friend = {
  __typename?: 'Friend';
  _id: Scalars['String']['output'];
  isFriend: Scalars['Boolean']['output'];
  members: Array<FriendMember>;
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
  hasAdded: Scalars['Boolean']['output'];
  memberDetails?: Maybe<FriendMemberDetails>;
};

/** FriendMemberDetailsObject */
export type FriendMemberDetails = {
  __typename?: 'FriendMemberDetails';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  email_verified: Scalars['Boolean']['output'];
  family_name: Scalars['String']['output'];
  given_name: Scalars['String']['output'];
  name: Scalars['String']['output'];
  picture: Scalars['String']['output'];
};

/** FriendsInput */
export type FriendsInput = {
  userId: Scalars['String']['input'];
};

/** MessageData */
export type MessageData = {
  __typename?: 'MessageData';
  chatId: Scalars['String']['output'];
  data: MessageObject;
  userId: Scalars['String']['output'];
};

/** MessageInput */
export type MessageInput = {
  chatId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MessageObject = {
  __typename?: 'MessageObject';
  _id: Scalars['String']['output'];
  chatId: Scalars['String']['output'];
  message: Scalars['String']['output'];
  otherMembers: Array<OtherMemberObject>;
  sender: SenderObject;
};

/** MessagesDataObject */
export type MessagesData = {
  __typename?: 'MessagesData';
  chatId: Scalars['String']['output'];
  data: Array<MessageObject>;
  userId: Scalars['String']['output'];
};

/** MessagesInput */
export type MessagesInput = {
  chatId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: Chat;
  createMessage: MessageData;
  createRequest: Request;
  removeChat: Scalars['Boolean']['output'];
  removeFriend: Scalars['Boolean']['output'];
  removeMessage: Scalars['Boolean']['output'];
  removeRequest: Scalars['Boolean']['output'];
  updateChat: Chat;
  updateMessage: MessageData;
  updateRequest: Request;
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};


export type MutationCreateRequestArgs = {
  input: CreateRequestInput;
};


export type MutationRemoveChatArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveFriendArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveMessageArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRequestArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateChatArgs = {
  input: CreateChatInput;
};


export type MutationUpdateMessageArgs = {
  input: CreateMessageInput;
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};


export type MutationUpdateRequestArgs = {
  input: UpdateRequestInput;
};

export type OtherMemberInput = {
  _id: Scalars['String']['input'];
  deliveredStatus?: InputMaybe<DeliveredStatusInput>;
  readStatus?: InputMaybe<ReadStatusInput>;
};

export type OtherMemberObject = {
  __typename?: 'OtherMemberObject';
  _id: Scalars['String']['output'];
  deliveredStatus?: Maybe<DeliveredStatusObject>;
  readStatus?: Maybe<ReadStatusObject>;
};

/** PaginatedRequestObject */
export type PaginatedRequest = {
  __typename?: 'PaginatedRequest';
  data: Array<Request>;
  totalCount: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  chat: Chat;
  chats: Array<Chat>;
  friend: Friend;
  friends: Array<Friend>;
  message: MessageData;
  messages: MessagesData;
  otherFriends: Array<Friend>;
  pendingRequest: Request;
  pendingRequests: PaginatedRequest;
  sentRequests: PaginatedRequest;
};


export type QueryChatArgs = {
  input: ChatInput;
};


export type QueryChatsArgs = {
  input: ChatsInput;
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};


export type QueryFriendArgs = {
  input: FriendInput;
};


export type QueryFriendsArgs = {
  input: FriendsInput;
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};


export type QueryMessageArgs = {
  input: MessageInput;
};


export type QueryMessagesArgs = {
  input: MessagesInput;
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};


export type QueryOtherFriendsArgs = {
  input: FriendsInput;
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};


export type QueryPendingRequestArgs = {
  input: RequestInput;
};


export type QueryPendingRequestsArgs = {
  input: RequestsInput;
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};


export type QuerySentRequestsArgs = {
  input: RequestsInput;
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};

export type ReadStatusInput = {
  isRead: Scalars['Boolean']['input'];
  timestamp: Scalars['Float']['input'];
};

export type ReadStatusObject = {
  __typename?: 'ReadStatusObject';
  isRead: Scalars['Boolean']['output'];
  timestamp: Scalars['Float']['output'];
};

/** RequestObject */
export type Request = {
  __typename?: 'Request';
  _id: Scalars['String']['output'];
  members: Array<RequestMember>;
  status: Scalars['String']['output'];
};

/** RequestDataObject */
export type RequestData = {
  __typename?: 'RequestData';
  request: Request;
};

/** RequestInput */
export type RequestInput = {
  requestId: Scalars['String']['input'];
};

/** RequestMemberObject */
export type RequestMember = {
  __typename?: 'RequestMember';
  _id: Scalars['String']['output'];
  hasSent: Scalars['Boolean']['output'];
  memberDetails?: Maybe<RequestMemberDetails>;
};

/** RequestMemberDetailsObject */
export type RequestMemberDetails = {
  __typename?: 'RequestMemberDetails';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  email_verified: Scalars['Boolean']['output'];
  family_name: Scalars['String']['output'];
  given_name: Scalars['String']['output'];
  name: Scalars['String']['output'];
  picture: Scalars['String']['output'];
};

/** RequestsInput */
export type RequestsInput = {
  userId: Scalars['String']['input'];
};

export type SenderInput = {
  _id: Scalars['String']['input'];
  sentStatus: SentStatusInput;
};

export type SenderObject = {
  __typename?: 'SenderObject';
  _id: Scalars['String']['output'];
  sentStatus: SentStatusObject;
};

export type SentStatusInput = {
  isSent: Scalars['Boolean']['input'];
  timestamp: Scalars['Float']['input'];
};

export type SentStatusObject = {
  __typename?: 'SentStatusObject';
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
  OnMessagesAdded: MessagesData;
  OnMessagesUpdated: MessagesData;
  OnRequestAdded: RequestData;
  OnRequestUpdated: RequestData;
};

/** UpdateRequestInput */
export type UpdateRequestInput = {
  requestId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type ChatsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type ChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', _id: string, type: string, members: Array<{ __typename?: 'ChatMember', _id: string, hasAdded: boolean, memberDetails?: { __typename?: 'ChatMemberDetails', name: string, email: string, email_verified: boolean, picture: string, given_name: string, family_name: string } | null }> }> };

export type CreateChatMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  friendId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  friendUserId: Scalars['String']['input'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', _id: string } };

export type OnChatAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnChatAddedSubscription = { __typename?: 'Subscription', OnChatAdded: { __typename?: 'ChatData', friendId: string, chat: { __typename?: 'Chat', _id: string, type: string, members: Array<{ __typename?: 'ChatMember', _id: string, hasAdded: boolean, memberDetails?: { __typename?: 'ChatMemberDetails', name: string, email: string, email_verified: boolean, picture: string, given_name: string, family_name: string } | null }> } } };

export type OnChatUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnChatUpdatedSubscription = { __typename?: 'Subscription', OnChatUpdated: { __typename?: 'ChatData', friendId: string, chat: { __typename?: 'Chat', _id: string, type: string, members: Array<{ __typename?: 'ChatMember', _id: string, hasAdded: boolean, memberDetails?: { __typename?: 'ChatMemberDetails', name: string, email: string, email_verified: boolean, picture: string, given_name: string, family_name: string } | null }> } } };

export type FriendsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FriendsQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Friend', _id: string, isFriend: boolean, members: Array<{ __typename?: 'FriendMember', _id: string, hasAdded: boolean, memberDetails?: { __typename?: 'FriendMemberDetails', name: string, email: string, email_verified: boolean, picture: string, given_name: string, family_name: string } | null }> }> };

export type OtherFriendsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type OtherFriendsQuery = { __typename?: 'Query', otherFriends: Array<{ __typename?: 'Friend', _id: string, isFriend: boolean, members: Array<{ __typename?: 'FriendMember', _id: string, hasAdded: boolean, memberDetails?: { __typename?: 'FriendMemberDetails', name: string, email: string, email_verified: boolean, picture: string, given_name: string, family_name: string } | null }> }> };

export type OnFriendAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnFriendAddedSubscription = { __typename?: 'Subscription', OnFriendAdded: { __typename?: 'FriendData', friend: { __typename?: 'Friend', _id: string, isFriend: boolean, members: Array<{ __typename?: 'FriendMember', _id: string, hasAdded: boolean, memberDetails?: { __typename?: 'FriendMemberDetails', name: string, email: string, email_verified: boolean, picture: string, given_name: string, family_name: string } | null }> } } };

export type PendingRequestsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type PendingRequestsQuery = { __typename?: 'Query', pendingRequests: { __typename?: 'PaginatedRequest', totalCount: number, data: Array<{ __typename?: 'Request', _id: string, members: Array<{ __typename?: 'RequestMember', _id: string, hasSent: boolean, memberDetails?: { __typename?: 'RequestMemberDetails', _id: string, name: string, email: string, email_verified: boolean, picture: string, given_name: string, family_name: string } | null }> }> } };

export type SentRequestsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type SentRequestsQuery = { __typename?: 'Query', sentRequests: { __typename?: 'PaginatedRequest', totalCount: number, data: Array<{ __typename?: 'Request', _id: string, members: Array<{ __typename?: 'RequestMember', _id: string, hasSent: boolean, memberDetails?: { __typename?: 'RequestMemberDetails', _id: string, name: string, email: string, email_verified: boolean, picture: string, given_name: string, family_name: string } | null }> }> } };

export type CreateRequestMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  sendToEmail: Scalars['String']['input'];
}>;


export type CreateRequestMutation = { __typename?: 'Mutation', createRequest: { __typename?: 'Request', _id: string } };

export type UpdateRequestMutationVariables = Exact<{
  requestId: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateRequestMutation = { __typename?: 'Mutation', updateRequest: { __typename?: 'Request', _id: string } };

export type OnRequestAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnRequestAddedSubscription = { __typename?: 'Subscription', OnRequestAdded: { __typename?: 'RequestData', request: { __typename?: 'Request', _id: string, members: Array<{ __typename?: 'RequestMember', _id: string, hasSent: boolean, memberDetails?: { __typename?: 'RequestMemberDetails', _id: string, name: string, email: string, email_verified: boolean, picture: string, given_name: string, family_name: string } | null }> } } };

export type OnRequestUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnRequestUpdatedSubscription = { __typename?: 'Subscription', OnRequestUpdated: { __typename?: 'RequestData', request: { __typename?: 'Request', _id: string, members: Array<{ __typename?: 'RequestMember', _id: string, hasSent: boolean, memberDetails?: { __typename?: 'RequestMemberDetails', _id: string, name: string, email: string, email_verified: boolean, picture: string, given_name: string, family_name: string } | null }> } } };

export type MessagesQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  chatId: Scalars['String']['input'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessagesData', chatId: string, data: Array<{ __typename?: 'MessageObject', _id: string, chatId: string, message: string, otherMembers: Array<{ __typename?: 'OtherMemberObject', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatusObject', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatusObject', isRead: boolean, timestamp: number } | null }>, sender: { __typename?: 'SenderObject', _id: string, sentStatus: { __typename?: 'SentStatusObject', isSent: boolean, timestamp: number } } }> } };

export type OnMessageAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessageAddedSubscription = { __typename?: 'Subscription', OnMessageAdded: { __typename?: 'MessageData', chatId: string, data: { __typename?: 'MessageObject', _id: string, chatId: string, message: string, otherMembers: Array<{ __typename?: 'OtherMemberObject', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatusObject', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatusObject', isRead: boolean, timestamp: number } | null }>, sender: { __typename?: 'SenderObject', _id: string, sentStatus: { __typename?: 'SentStatusObject', isSent: boolean, timestamp: number } } } } };

export type OnMessagesAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessagesAddedSubscription = { __typename?: 'Subscription', OnMessagesAdded: { __typename?: 'MessagesData', chatId: string, data: Array<{ __typename?: 'MessageObject', _id: string, chatId: string, message: string, otherMembers: Array<{ __typename?: 'OtherMemberObject', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatusObject', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatusObject', isRead: boolean, timestamp: number } | null }>, sender: { __typename?: 'SenderObject', _id: string, sentStatus: { __typename?: 'SentStatusObject', isSent: boolean, timestamp: number } } }> } };

export type OnMessageUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessageUpdatedSubscription = { __typename?: 'Subscription', OnMessageUpdated: { __typename?: 'MessageData', chatId: string, data: { __typename?: 'MessageObject', _id: string, chatId: string, message: string, otherMembers: Array<{ __typename?: 'OtherMemberObject', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatusObject', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatusObject', isRead: boolean, timestamp: number } | null }>, sender: { __typename?: 'SenderObject', _id: string, sentStatus: { __typename?: 'SentStatusObject', isSent: boolean, timestamp: number } } } } };

export type OnMessagesUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessagesUpdatedSubscription = { __typename?: 'Subscription', OnMessagesUpdated: { __typename?: 'MessagesData', chatId: string, data: Array<{ __typename?: 'MessageObject', _id: string, chatId: string, message: string, otherMembers: Array<{ __typename?: 'OtherMemberObject', _id: string, deliveredStatus?: { __typename?: 'DeliveredStatusObject', isDelivered: boolean, timestamp: number } | null, readStatus?: { __typename?: 'ReadStatusObject', isRead: boolean, timestamp: number } | null }>, sender: { __typename?: 'SenderObject', _id: string, sentStatus: { __typename?: 'SentStatusObject', isSent: boolean, timestamp: number } } }> } };


export const ChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"chats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"25"}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"memberDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChatsQuery, ChatsQueryVariables>;
export const CreateChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"friendUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendUserId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateChatMutation, CreateChatMutationVariables>;
export const OnChatAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnChatAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnChatAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendId"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"memberDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnChatAddedSubscription, OnChatAddedSubscriptionVariables>;
export const OnChatUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnChatUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnChatUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendId"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"memberDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnChatUpdatedSubscription, OnChatUpdatedSubscriptionVariables>;
export const FriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"friends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"25"}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"isFriend"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"memberDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FriendsQuery, FriendsQueryVariables>;
export const OtherFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"otherFriends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"otherFriends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"25"}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"isFriend"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"memberDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OtherFriendsQuery, OtherFriendsQueryVariables>;
export const OnFriendAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnFriendAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnFriendAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"isFriend"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasAdded"}},{"kind":"Field","name":{"kind":"Name","value":"memberDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnFriendAddedSubscription, OnFriendAddedSubscriptionVariables>;
export const PendingRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pendingRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pendingRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"25"}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasSent"}},{"kind":"Field","name":{"kind":"Name","value":"memberDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<PendingRequestsQuery, PendingRequestsQueryVariables>;
export const SentRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sentRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sentRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"25"}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasSent"}},{"kind":"Field","name":{"kind":"Name","value":"memberDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<SentRequestsQuery, SentRequestsQueryVariables>;
export const CreateRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendToEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sendToEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendToEmail"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateRequestMutation, CreateRequestMutationVariables>;
export const UpdateRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"requestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateRequestMutation, UpdateRequestMutationVariables>;
export const OnRequestAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnRequestAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnRequestAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"request"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasSent"}},{"kind":"Field","name":{"kind":"Name","value":"memberDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnRequestAddedSubscription, OnRequestAddedSubscriptionVariables>;
export const OnRequestUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnRequestUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnRequestUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"request"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"hasSent"}},{"kind":"Field","name":{"kind":"Name","value":"memberDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnRequestUpdatedSubscription, OnRequestUpdatedSubscriptionVariables>;
export const MessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"messages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"25"}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"otherMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MessagesQuery, MessagesQueryVariables>;
export const OnMessageAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessageAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnMessageAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"otherMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnMessageAddedSubscription, OnMessageAddedSubscriptionVariables>;
export const OnMessagesAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessagesAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnMessagesAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"otherMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnMessagesAddedSubscription, OnMessagesAddedSubscriptionVariables>;
export const OnMessageUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessageUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnMessageUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"otherMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnMessageUpdatedSubscription, OnMessageUpdatedSubscriptionVariables>;
export const OnMessagesUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessagesUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnMessagesUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"otherMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"sentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSent"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnMessagesUpdatedSubscription, OnMessagesUpdatedSubscriptionVariables>;