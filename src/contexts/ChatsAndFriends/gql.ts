import { DocumentNode } from 'graphql';
import { gql } from '../../__generated__/gql';

const CACHED_MESSAGES_QUERY = gql(/* GraphQL */ `
  query cachedMessages($chatId: String!) {
    cachedMessages(input: { chatId: $chatId }) {
      edges {
        _id
        chatId
        queueId
        message
        sender {
          _id
          name
          picture
          email
          email_verified
          given_name
          family_name
          retryStatus {
            isRetry
            timestamp
          }
          queuedStatus {
            isQueued
            timestamp
          }
          sentStatus {
            isSent
            timestamp
          }
        }
        receivers {
          _id
          name
          picture
          email
          email_verified
          given_name
          family_name
          deliveredStatus {
            isDelivered
            timestamp
          }
          readStatus {
            isRead
            timestamp
          }
        }
        timestamp
      }
      pageInfo {
        endCursor
        hasPreviousPage
        hasNextPage
      }
      scrollPosition
      isFetched
    }
  }
`) as DocumentNode;

const MESSAGES_QUERY = gql(/* GraphQL */ `
  query messages($chatId: String!, $limit: Int, $after: ID) {
    messages(input: { chatId: $chatId }, limit: $limit, after: $after) {
      edges {
        _id
        chatId
        queueId
        message
        sender {
          _id
          name
          picture
          email
          email_verified
          given_name
          family_name
          retryStatus {
            isRetry
            timestamp
          }
          queuedStatus {
            isQueued
            timestamp
          }
          sentStatus {
            isSent
            timestamp
          }
        }
        receivers {
          _id
          name
          picture
          email
          email_verified
          given_name
          family_name
          deliveredStatus {
            isDelivered
            timestamp
          }
          readStatus {
            isRead
            timestamp
          }
        }
        timestamp
      }
      pageInfo {
        endCursor
        hasPreviousPage
        hasNextPage
      }
      scrollPosition
      isFetched
    }
  }
`) as DocumentNode;

const CREATE_MESSAGE_MUTATION = gql(/* GraphQL */ `
  mutation createMessage(
    $chatId: String!
    $userId: String!
    $queueId: String!
    $isQueued: Boolean!
    $queuedTimestamp: Float!
    $isSent: Boolean!
    $sentTimestamp: Float!
    $message: String!
  ) {
    createMessage(
      input: {
        chatId: $chatId
        userId: $userId
        queueId: $queueId
        isQueued: $isQueued
        queuedTimestamp: $queuedTimestamp
        isSent: $isSent
        sentTimestamp: $sentTimestamp
        message: $message
      }
    ) {
      _id
      queueId
    }
  }
`) as DocumentNode;

const MESSAGE_ADDED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnMessageAdded {
    OnMessageAdded {
      message {
        _id
        chatId
        queueId
        message
        sender {
          _id
          name
          picture
          email
          email_verified
          given_name
          family_name
          retryStatus {
            isRetry
            timestamp
          }
          queuedStatus {
            isQueued
            timestamp
          }
          sentStatus {
            isSent
            timestamp
          }
        }
        receivers {
          _id
          name
          picture
          email
          email_verified
          given_name
          family_name
          deliveredStatus {
            isDelivered
            timestamp
          }
          readStatus {
            isRead
            timestamp
          }
        }
        timestamp
      }
    }
  }
`) as DocumentNode;

const MESSAGE_UPDATED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnMessageUpdated {
    OnMessageUpdated {
      message {
        _id
        chatId
        queueId
        message
        sender {
          _id
          name
          picture
          email
          email_verified
          given_name
          family_name
          retryStatus {
            isRetry
            timestamp
          }
          queuedStatus {
            isQueued
            timestamp
          }
          sentStatus {
            isSent
            timestamp
          }
        }
        receivers {
          _id
          name
          picture
          email
          email_verified
          given_name
          family_name
          deliveredStatus {
            isDelivered
            timestamp
          }
          readStatus {
            isRead
            timestamp
          }
        }
        timestamp
      }
    }
  }
`) as DocumentNode;

const CHATS_QUERY = gql(/* GraphQL */ `
  query chats($userId: String!, $limit: Int, $after: ID) {
    chats(input: { userId: $userId }, limit: $limit, after: $after) {
      _id
      type
      members {
        _id
        hasAdded
        name
        picture
        email
        email_verified
        given_name
        family_name
        unreadMessagesCount
      }
      lastMessage {
        message
        sender {
          _id
          retryStatus {
            isRetry
            timestamp
          }
          queuedStatus {
            isQueued
            timestamp
          }
          sentStatus {
            isSent
            timestamp
          }
        }
        receivers {
          _id
          deliveredStatus {
            isDelivered
            timestamp
          }
          readStatus {
            isRead
            timestamp
          }
        }
        timestamp
      }
      createdAt
    }
  }
`) as DocumentNode;

const CREATE_CHAT_MUTATION = gql(/* GraphQL */ `
  mutation createChat(
    $userId: String!
    $type: String!
    $friendIds: [String!]!
    $friendUserIds: [String!]!
  ) {
    createChat(
      input: {
        userId: $userId
        type: $type
        friendIds: $friendIds
        friendUserIds: $friendUserIds
      }
    ) {
      isAlreadyCreated
      chat {
        _id
        type
        members {
          _id
          hasAdded
          name
          picture
          email
          email_verified
          given_name
          family_name
          unreadMessagesCount
        }
        friends {
          _id
        }
        createdAt
      }
    }
  }
`) as DocumentNode;

const CHAT_ADDED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnChatAdded {
    OnChatAdded {
      friendIds
      chat {
        _id
        type
        members {
          _id
          hasAdded
          name
          picture
          email
          email_verified
          given_name
          family_name
          unreadMessagesCount
        }
        lastMessage {
          message
          sender {
            _id
            retryStatus {
              isRetry
              timestamp
            }
            queuedStatus {
              isQueued
              timestamp
            }
            sentStatus {
              isSent
              timestamp
            }
          }
          receivers {
            _id
            deliveredStatus {
              isDelivered
              timestamp
            }
            readStatus {
              isRead
              timestamp
            }
          }
          timestamp
        }
        createdAt
      }
    }
  }
`) as DocumentNode;

const CHAT_UPDATED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnChatUpdated {
    OnChatUpdated {
      chat {
        _id
        type
        members {
          _id
          hasAdded
          name
          picture
          email
          email_verified
          given_name
          family_name
          unreadMessagesCount
        }
        lastMessage {
          message
          sender {
            _id
            retryStatus {
              isRetry
              timestamp
            }
            queuedStatus {
              isQueued
              timestamp
            }
            sentStatus {
              isSent
              timestamp
            }
          }
          receivers {
            _id
            deliveredStatus {
              isDelivered
              timestamp
            }
            readStatus {
              isRead
              timestamp
            }
          }
          timestamp
        }
        createdAt
      }
    }
  }
`) as DocumentNode;

const FRIENDS_QUERY = gql(/* GraphQL */ `
  query friends($userId: String!, $limit: Int, $after: ID) {
    friends(input: { userId: $userId }, limit: $limit, after: $after) {
      _id
      type
      members {
        _id
        hasAdded
        name
        picture
        email
        email_verified
        given_name
        family_name
        unreadMessagesCount
      }
      lastMessage {
        message
        sender {
          _id
          retryStatus {
            isRetry
            timestamp
          }
          queuedStatus {
            isQueued
            timestamp
          }
          sentStatus {
            isSent
            timestamp
          }
        }
        receivers {
          _id
          deliveredStatus {
            isDelivered
            timestamp
          }
          readStatus {
            isRead
            timestamp
          }
        }
        timestamp
      }
      hasChats
      createdAt
    }
  }
`) as DocumentNode;

const FRIENDS_SORTED_QUERY = gql(/* GraphQL */ `
  query friendsSorted($userId: String!, $limit: Int, $after: ID) {
    friendsSorted(input: { userId: $userId }, limit: $limit, after: $after) {
      _id
      type
      members {
        _id
        hasAdded
        name
        picture
        email
        email_verified
        given_name
        family_name
        unreadMessagesCount
      }
      lastMessage {
        message
        sender {
          _id
          retryStatus {
            isRetry
            timestamp
          }
          queuedStatus {
            isQueued
            timestamp
          }
          sentStatus {
            isSent
            timestamp
          }
        }
        receivers {
          _id
          deliveredStatus {
            isDelivered
            timestamp
          }
          readStatus {
            isRead
            timestamp
          }
        }
        timestamp
      }
      hasChats
      createdAt
    }
  }
`) as DocumentNode;

const FRIEND_ADDED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnFriendAdded {
    OnFriendAdded {
      friend {
        _id
        type
        members {
          _id
          hasAdded
          name
          picture
          email
          email_verified
          given_name
          family_name
          unreadMessagesCount
        }
        lastMessage {
          message
          sender {
            _id
            retryStatus {
              isRetry
              timestamp
            }
            queuedStatus {
              isQueued
              timestamp
            }
            sentStatus {
              isSent
              timestamp
            }
          }
          receivers {
            _id
            deliveredStatus {
              isDelivered
              timestamp
            }
            readStatus {
              isRead
              timestamp
            }
          }
          timestamp
        }
        hasChats
        createdAt
      }
    }
  }
`) as DocumentNode;

const PENDING_REQUESTS_QUERY = gql(/* GraphQL */ `
  query pendingRequests($userId: String!, $limit: Int, $after: ID) {
    pendingRequests(input: { userId: $userId }, limit: $limit, after: $after) {
      data {
        _id
        members {
          _id
          hasSent
          name
          picture
          email
          email_verified
          given_name
          family_name
        }
        createdAt
      }
      totalCount
    }
  }
`) as DocumentNode;

const SENT_REQUESTS_QUERY = gql(/* GraphQL */ `
  query sentRequests($userId: String!, $limit: Int, $after: ID) {
    sentRequests(input: { userId: $userId }, limit: $limit, after: $after) {
      data {
        _id
        members {
          _id
          hasSent
          name
          picture
          email
          email_verified
          given_name
          family_name
        }
        createdAt
      }
      totalCount
    }
  }
`) as DocumentNode;

const CREATE_REQUEST_MUTATION = gql(/* GraphQL */ `
  mutation createRequest($userId: String!, $sendToEmail: String!) {
    createRequest(input: { userId: $userId, sendToEmail: $sendToEmail }) {
      _id
    }
  }
`) as DocumentNode;

const UPDATE_REQUEST_MUTATION = gql(/* GraphQL */ `
  mutation updateRequest(
    $userId: String!
    $requestId: String!
    $status: String!
  ) {
    updateRequest(
      input: { userId: $userId, requestId: $requestId, status: $status }
    ) {
      _id
    }
  }
`) as DocumentNode;

const REQUEST_ADDED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnRequestAdded {
    OnRequestAdded {
      request {
        _id
        members {
          _id
          hasSent
          name
          picture
          email
          email_verified
          given_name
          family_name
        }
        createdAt
      }
    }
  }
`) as DocumentNode;

const REQUEST_UPDATED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnRequestUpdated {
    OnRequestUpdated {
      request {
        _id
        members {
          _id
          hasSent
          name
          picture
          email
          email_verified
          given_name
          family_name
        }
        createdAt
      }
    }
  }
`) as DocumentNode;

const SESSIONS_QUERY = gql(/* GraphQL */ `
  query userSessions($userId: String!) {
    userSessions(input: { userId: $userId }) {
      _id
      userId
      lastActive
      deviceDetails
      expires
      lastActive
    }
  }
`) as DocumentNode;

const SESSION_UPDATED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnSessionUpdated($sessionID: String!) {
    OnSessionUpdated(input: { sessionID: $sessionID }) {
      session {
        _id
        userId
        lastActive
        deviceDetails
        expires
        lastActive
      }
    }
  }
`) as DocumentNode;

const USER_ONLINE_STATUS_QUERY = gql(/* GraphQL */ `
  query userOnlineStatus($userId: String!) {
    userOnlineStatus(input: { userId: $userId }) {
      userId
      onlineStatus {
        isOnline
        lastSeen
      }
    }
  }
`) as DocumentNode;

const USER_ONLINE_STATUS_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnUserOnlineStatus {
    OnUserOnlineStatus {
      userId
      onlineStatus {
        isOnline
        lastSeen
      }
    }
  }
`) as DocumentNode;

export {
  // messages
  CACHED_MESSAGES_QUERY,
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  MESSAGE_UPDATED_SUBSCRIPTION,

  // chats
  CHATS_QUERY,
  CREATE_CHAT_MUTATION,
  CHAT_ADDED_SUBSCRIPTION,
  CHAT_UPDATED_SUBSCRIPTION,

  // friends
  FRIENDS_QUERY,
  FRIENDS_SORTED_QUERY,
  FRIEND_ADDED_SUBSCRIPTION,

  // requests
  PENDING_REQUESTS_QUERY,
  SENT_REQUESTS_QUERY,
  CREATE_REQUEST_MUTATION,
  UPDATE_REQUEST_MUTATION,
  REQUEST_ADDED_SUBSCRIPTION,
  REQUEST_UPDATED_SUBSCRIPTION,

  // sessions
  SESSIONS_QUERY,
  SESSION_UPDATED_SUBSCRIPTION,

  // userOnlineStatus
  USER_ONLINE_STATUS_QUERY,
  USER_ONLINE_STATUS_SUBSCRIPTION,
};
