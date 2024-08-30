import { DocumentNode } from 'graphql';
import { gql } from '../../__generated__/gql';

const CHAT_QUERY = gql(/* GraphQL */ `
  query chat($chatId: String!) {
    chat(input: { chatId: $chatId }) {
      _id
      type
      members {
        _id
        hasAdded
        memberDetails {
          name
          email
          email_verified
          picture
          given_name
          family_name
        }
      }
    }
  }
`) as DocumentNode;

const CHATS_QUERY = gql(/* GraphQL */ `
  query chats($userId: String!) {
    chats(input: { userId: $userId }, limit: 25, skip: 0) {
      _id
      type
      members {
        _id
        hasAdded
        memberDetails {
          name
          email
          email_verified
          picture
          given_name
          family_name
        }
      }
    }
  }
`) as DocumentNode;

const CREATE_CHAT_MUTATION = gql(/* GraphQL */ `
  mutation createChat(
    $userId: String!
    $friendId: String!
    $type: String!
    $friendUserId: String!
  ) {
    createChat(
      input: {
        userId: $userId
        friendId: $friendId
        type: $type
        friendUserId: $friendUserId
      }
    ) {
      _id
    }
  }
`) as DocumentNode;

const CHAT_ADDED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnChatAdded {
    OnChatAdded {
      friendId
      chat {
        _id
        type
        members {
          _id
          hasAdded
          memberDetails {
            name
            email
            email_verified
            picture
            given_name
            family_name
          }
        }
      }
    }
  }
`) as DocumentNode;

const CHAT_UPDATED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnChatUpdated {
    OnChatUpdated {
      friendId
      chat {
        _id
        type
        members {
          _id
          hasAdded
          memberDetails {
            name
            email
            email_verified
            picture
            given_name
            family_name
          }
        }
      }
    }
  }
`) as DocumentNode;

const FRIENDS_QUERY = gql(/* GraphQL */ `
  query friends($userId: String!) {
    friends(input: { userId: $userId }, limit: 25, skip: 0) {
      _id
      isFriend
      members {
        _id
        hasAdded
        memberDetails {
          name
          email
          email_verified
          picture
          given_name
          family_name
        }
      }
    }
  }
`) as DocumentNode;

const OTHER_FRIENDS_QUERY = gql(/* GraphQL */ `
  query otherFriends($userId: String!) {
    otherFriends(input: { userId: $userId }, limit: 25, skip: 0) {
      _id
      isFriend
      members {
        _id
        hasAdded
        memberDetails {
          name
          email
          email_verified
          picture
          given_name
          family_name
        }
      }
    }
  }
`) as DocumentNode;

const FRIEND_ADDED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnFriendAdded {
    OnFriendAdded {
      friend {
        _id
        isFriend
        members {
          _id
          hasAdded
          memberDetails {
            name
            email
            email_verified
            picture
            given_name
            family_name
          }
        }
      }
    }
  }
`) as DocumentNode;

const PENDING_REQUESTS_QUERY = gql(/* GraphQL */ `
  query pendingRequests($userId: String!) {
    pendingRequests(input: { userId: $userId }, limit: 25, skip: 0) {
      data {
        _id
        members {
          _id
          hasSent
          memberDetails {
            _id
            name
            email
            email_verified
            picture
            given_name
            family_name
          }
        }
      }
      totalCount
    }
  }
`) as DocumentNode;

const SENT_REQUESTS_QUERY = gql(/* GraphQL */ `
  query sentRequests($userId: String!) {
    sentRequests(input: { userId: $userId }, limit: 25, skip: 0) {
      data {
        _id
        members {
          _id
          hasSent
          memberDetails {
            _id
            name
            email
            email_verified
            picture
            given_name
            family_name
          }
        }
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
  mutation updateRequest($requestId: String!, $status: String!) {
    updateRequest(input: { requestId: $requestId, status: $status }) {
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
          memberDetails {
            _id
            name
            email
            email_verified
            picture
            given_name
            family_name
          }
        }
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
          memberDetails {
            _id
            name
            email
            email_verified
            picture
            given_name
            family_name
          }
        }
      }
    }
  }
`) as DocumentNode;

export {
  CHAT_QUERY,
  CHATS_QUERY,
  CREATE_CHAT_MUTATION,
  CHAT_ADDED_SUBSCRIPTION,
  CHAT_UPDATED_SUBSCRIPTION,
  FRIENDS_QUERY,
  OTHER_FRIENDS_QUERY,
  FRIEND_ADDED_SUBSCRIPTION,
  PENDING_REQUESTS_QUERY,
  SENT_REQUESTS_QUERY,
  CREATE_REQUEST_MUTATION,
  UPDATE_REQUEST_MUTATION,
  REQUEST_ADDED_SUBSCRIPTION,
  REQUEST_UPDATED_SUBSCRIPTION,
};
