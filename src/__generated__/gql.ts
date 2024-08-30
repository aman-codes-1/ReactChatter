/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query chat($chatId: String!) {\n    chat(input: { chatId: $chatId }) {\n      _id\n      type\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n": types.ChatDocument,
    "\n  query chats($userId: String!) {\n    chats(input: { userId: $userId }, limit: 25, skip: 0) {\n      _id\n      type\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n": types.ChatsDocument,
    "\n  mutation createChat(\n    $userId: String!\n    $friendId: String!\n    $type: String!\n    $friendUserId: String!\n  ) {\n    createChat(\n      input: {\n        userId: $userId\n        friendId: $friendId\n        type: $type\n        friendUserId: $friendUserId\n      }\n    ) {\n      _id\n    }\n  }\n": types.CreateChatDocument,
    "\n  subscription OnChatAdded {\n    OnChatAdded {\n      friendId\n      chat {\n        _id\n        type\n        members {\n          _id\n          hasAdded\n          memberDetails {\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n": types.OnChatAddedDocument,
    "\n  subscription OnChatUpdated {\n    OnChatUpdated {\n      friendId\n      chat {\n        _id\n        type\n        members {\n          _id\n          hasAdded\n          memberDetails {\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n": types.OnChatUpdatedDocument,
    "\n  query friends($userId: String!) {\n    friends(input: { userId: $userId }, limit: 25, skip: 0) {\n      _id\n      isFriend\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n": types.FriendsDocument,
    "\n  query otherFriends($userId: String!) {\n    otherFriends(input: { userId: $userId }, limit: 25, skip: 0) {\n      _id\n      isFriend\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n": types.OtherFriendsDocument,
    "\n  subscription OnFriendAdded {\n    OnFriendAdded {\n      friend {\n        _id\n        isFriend\n        members {\n          _id\n          hasAdded\n          memberDetails {\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n": types.OnFriendAddedDocument,
    "\n  query pendingRequests($userId: String!) {\n    pendingRequests(input: { userId: $userId }, limit: 25, skip: 0) {\n      data {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n      totalCount\n    }\n  }\n": types.PendingRequestsDocument,
    "\n  query sentRequests($userId: String!) {\n    sentRequests(input: { userId: $userId }, limit: 25, skip: 0) {\n      data {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n      totalCount\n    }\n  }\n": types.SentRequestsDocument,
    "\n  mutation createRequest($userId: String!, $sendToEmail: String!) {\n    createRequest(input: { userId: $userId, sendToEmail: $sendToEmail }) {\n      _id\n    }\n  }\n": types.CreateRequestDocument,
    "\n  mutation updateRequest($requestId: String!, $status: String!) {\n    updateRequest(input: { requestId: $requestId, status: $status }) {\n      _id\n    }\n  }\n": types.UpdateRequestDocument,
    "\n  subscription OnRequestAdded {\n    OnRequestAdded {\n      request {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n": types.OnRequestAddedDocument,
    "\n  subscription OnRequestUpdated {\n    OnRequestUpdated {\n      request {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n": types.OnRequestUpdatedDocument,
    "\n  query messages($chatId: String!) {\n    messages(input: { chatId: $chatId }, limit: 25, skip: 0) {\n      _id\n      chatId\n      message\n      sender {\n        _id\n        sentStatus {\n          isSent\n          timestamp\n        }\n      }\n      otherMembers {\n        _id\n        deliveredStatus {\n          isDelivered\n          timestamp\n        }\n        readStatus {\n          isRead\n          timestamp\n        }\n      }\n    }\n  }\n": types.MessagesDocument,
    "\n  mutation createMessage(\n    $chatId: String!\n    $message: String!\n    $senderId: String!\n    $timestamp: Float!\n  ) {\n    createMessage(\n      input: {\n        chatId: $chatId\n        message: $message\n        senderId: $senderId\n        timestamp: $timestamp\n      }\n    ) {\n      _id\n    }\n  }\n": types.CreateMessageDocument,
    "\n  mutation updateMessage(\n    $chatId: String!\n    $message: String!\n    $senderId: String!\n    $timestamp: Float!\n  ) {\n    updateMessage(\n      input: {\n        chatId: $chatId\n        message: $message\n        senderId: $senderId\n        timestamp: $timestamp\n      }\n    ) {\n      _id\n    }\n  }\n": types.UpdateMessageDocument,
    "\n  subscription OnMessageAdded {\n    OnMessageAdded {\n      chatId\n      message {\n        _id\n        chatId\n        message\n        sender {\n          _id\n          sentStatus {\n            isSent\n            timestamp\n          }\n        }\n        otherMembers {\n          _id\n          deliveredStatus {\n            isDelivered\n            timestamp\n          }\n          readStatus {\n            isRead\n            timestamp\n          }\n        }\n      }\n    }\n  }\n": types.OnMessageAddedDocument,
    "\n  subscription OnMessageUpdated {\n    OnMessageUpdated {\n      chatId\n      message {\n        _id\n        chatId\n        message\n        sender {\n          _id\n          sentStatus {\n            isSent\n            timestamp\n          }\n        }\n        otherMembers {\n          _id\n          deliveredStatus {\n            isDelivered\n            timestamp\n          }\n          readStatus {\n            isRead\n            timestamp\n          }\n        }\n      }\n    }\n  }\n": types.OnMessageUpdatedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query chat($chatId: String!) {\n    chat(input: { chatId: $chatId }) {\n      _id\n      type\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query chat($chatId: String!) {\n    chat(input: { chatId: $chatId }) {\n      _id\n      type\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query chats($userId: String!) {\n    chats(input: { userId: $userId }, limit: 25, skip: 0) {\n      _id\n      type\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query chats($userId: String!) {\n    chats(input: { userId: $userId }, limit: 25, skip: 0) {\n      _id\n      type\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createChat(\n    $userId: String!\n    $friendId: String!\n    $type: String!\n    $friendUserId: String!\n  ) {\n    createChat(\n      input: {\n        userId: $userId\n        friendId: $friendId\n        type: $type\n        friendUserId: $friendUserId\n      }\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createChat(\n    $userId: String!\n    $friendId: String!\n    $type: String!\n    $friendUserId: String!\n  ) {\n    createChat(\n      input: {\n        userId: $userId\n        friendId: $friendId\n        type: $type\n        friendUserId: $friendUserId\n      }\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnChatAdded {\n    OnChatAdded {\n      friendId\n      chat {\n        _id\n        type\n        members {\n          _id\n          hasAdded\n          memberDetails {\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnChatAdded {\n    OnChatAdded {\n      friendId\n      chat {\n        _id\n        type\n        members {\n          _id\n          hasAdded\n          memberDetails {\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnChatUpdated {\n    OnChatUpdated {\n      friendId\n      chat {\n        _id\n        type\n        members {\n          _id\n          hasAdded\n          memberDetails {\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnChatUpdated {\n    OnChatUpdated {\n      friendId\n      chat {\n        _id\n        type\n        members {\n          _id\n          hasAdded\n          memberDetails {\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query friends($userId: String!) {\n    friends(input: { userId: $userId }, limit: 25, skip: 0) {\n      _id\n      isFriend\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query friends($userId: String!) {\n    friends(input: { userId: $userId }, limit: 25, skip: 0) {\n      _id\n      isFriend\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query otherFriends($userId: String!) {\n    otherFriends(input: { userId: $userId }, limit: 25, skip: 0) {\n      _id\n      isFriend\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query otherFriends($userId: String!) {\n    otherFriends(input: { userId: $userId }, limit: 25, skip: 0) {\n      _id\n      isFriend\n      members {\n        _id\n        hasAdded\n        memberDetails {\n          name\n          email\n          email_verified\n          picture\n          given_name\n          family_name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnFriendAdded {\n    OnFriendAdded {\n      friend {\n        _id\n        isFriend\n        members {\n          _id\n          hasAdded\n          memberDetails {\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnFriendAdded {\n    OnFriendAdded {\n      friend {\n        _id\n        isFriend\n        members {\n          _id\n          hasAdded\n          memberDetails {\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query pendingRequests($userId: String!) {\n    pendingRequests(input: { userId: $userId }, limit: 25, skip: 0) {\n      data {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query pendingRequests($userId: String!) {\n    pendingRequests(input: { userId: $userId }, limit: 25, skip: 0) {\n      data {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query sentRequests($userId: String!) {\n    sentRequests(input: { userId: $userId }, limit: 25, skip: 0) {\n      data {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query sentRequests($userId: String!) {\n    sentRequests(input: { userId: $userId }, limit: 25, skip: 0) {\n      data {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createRequest($userId: String!, $sendToEmail: String!) {\n    createRequest(input: { userId: $userId, sendToEmail: $sendToEmail }) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createRequest($userId: String!, $sendToEmail: String!) {\n    createRequest(input: { userId: $userId, sendToEmail: $sendToEmail }) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateRequest($requestId: String!, $status: String!) {\n    updateRequest(input: { requestId: $requestId, status: $status }) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateRequest($requestId: String!, $status: String!) {\n    updateRequest(input: { requestId: $requestId, status: $status }) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnRequestAdded {\n    OnRequestAdded {\n      request {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnRequestAdded {\n    OnRequestAdded {\n      request {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnRequestUpdated {\n    OnRequestUpdated {\n      request {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnRequestUpdated {\n    OnRequestUpdated {\n      request {\n        _id\n        members {\n          _id\n          hasSent\n          memberDetails {\n            _id\n            name\n            email\n            email_verified\n            picture\n            given_name\n            family_name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query messages($chatId: String!) {\n    messages(input: { chatId: $chatId }, limit: 25, skip: 0) {\n      _id\n      chatId\n      message\n      sender {\n        _id\n        sentStatus {\n          isSent\n          timestamp\n        }\n      }\n      otherMembers {\n        _id\n        deliveredStatus {\n          isDelivered\n          timestamp\n        }\n        readStatus {\n          isRead\n          timestamp\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query messages($chatId: String!) {\n    messages(input: { chatId: $chatId }, limit: 25, skip: 0) {\n      _id\n      chatId\n      message\n      sender {\n        _id\n        sentStatus {\n          isSent\n          timestamp\n        }\n      }\n      otherMembers {\n        _id\n        deliveredStatus {\n          isDelivered\n          timestamp\n        }\n        readStatus {\n          isRead\n          timestamp\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createMessage(\n    $chatId: String!\n    $message: String!\n    $senderId: String!\n    $timestamp: Float!\n  ) {\n    createMessage(\n      input: {\n        chatId: $chatId\n        message: $message\n        senderId: $senderId\n        timestamp: $timestamp\n      }\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createMessage(\n    $chatId: String!\n    $message: String!\n    $senderId: String!\n    $timestamp: Float!\n  ) {\n    createMessage(\n      input: {\n        chatId: $chatId\n        message: $message\n        senderId: $senderId\n        timestamp: $timestamp\n      }\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateMessage(\n    $chatId: String!\n    $message: String!\n    $senderId: String!\n    $timestamp: Float!\n  ) {\n    updateMessage(\n      input: {\n        chatId: $chatId\n        message: $message\n        senderId: $senderId\n        timestamp: $timestamp\n      }\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateMessage(\n    $chatId: String!\n    $message: String!\n    $senderId: String!\n    $timestamp: Float!\n  ) {\n    updateMessage(\n      input: {\n        chatId: $chatId\n        message: $message\n        senderId: $senderId\n        timestamp: $timestamp\n      }\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnMessageAdded {\n    OnMessageAdded {\n      chatId\n      message {\n        _id\n        chatId\n        message\n        sender {\n          _id\n          sentStatus {\n            isSent\n            timestamp\n          }\n        }\n        otherMembers {\n          _id\n          deliveredStatus {\n            isDelivered\n            timestamp\n          }\n          readStatus {\n            isRead\n            timestamp\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnMessageAdded {\n    OnMessageAdded {\n      chatId\n      message {\n        _id\n        chatId\n        message\n        sender {\n          _id\n          sentStatus {\n            isSent\n            timestamp\n          }\n        }\n        otherMembers {\n          _id\n          deliveredStatus {\n            isDelivered\n            timestamp\n          }\n          readStatus {\n            isRead\n            timestamp\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnMessageUpdated {\n    OnMessageUpdated {\n      chatId\n      message {\n        _id\n        chatId\n        message\n        sender {\n          _id\n          sentStatus {\n            isSent\n            timestamp\n          }\n        }\n        otherMembers {\n          _id\n          deliveredStatus {\n            isDelivered\n            timestamp\n          }\n          readStatus {\n            isRead\n            timestamp\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnMessageUpdated {\n    OnMessageUpdated {\n      chatId\n      message {\n        _id\n        chatId\n        message\n        sender {\n          _id\n          sentStatus {\n            isSent\n            timestamp\n          }\n        }\n        otherMembers {\n          _id\n          deliveredStatus {\n            isDelivered\n            timestamp\n          }\n          readStatus {\n            isRead\n            timestamp\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;