import { DocumentNode } from 'graphql';
import { gql } from '../../__generated__/gql';

const MESSAGES_QUERY = gql(/* GraphQL */ `
  query messages($chatId: String!) {
    messages(input: { chatId: $chatId }, limit: 25, skip: 0) {
      _id
      chatId
      message
      sender {
        _id
        sentStatus {
          isSent
          timestamp
        }
      }
      otherMembers {
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
    }
  }
`) as DocumentNode;

const CREATE_MESSAGE_MUTATION = gql(/* GraphQL */ `
  mutation createMessage(
    $chatId: String!
    $senderId: String!
    $localId: Float
    $message: String!
    $timestamp: Float!
  ) {
    createMessage(
      input: {
        chatId: $chatId
        senderId: $senderId
        localId: $localId
        message: $message
        timestamp: $timestamp
      }
    ) {
      _id
      localId
    }
  }
`) as DocumentNode;

const UPDATE_MESSAGE_MUTATION = gql(/* GraphQL */ `
  mutation updateMessage(
    $chatId: String!
    $message: String!
    $senderId: String!
    $timestamp: Float!
  ) {
    updateMessage(
      input: {
        chatId: $chatId
        message: $message
        senderId: $senderId
        timestamp: $timestamp
      }
    ) {
      _id
    }
  }
`) as DocumentNode;

const MESSAGE_ADDED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnMessageAdded {
    OnMessageAdded {
      chatId
      message {
        _id
        chatId
        message
        sender {
          _id
          sentStatus {
            isSent
            timestamp
          }
        }
        otherMembers {
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
      }
    }
  }
`) as DocumentNode;

const MESSAGE_UPDATED_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription OnMessageUpdated {
    OnMessageUpdated {
      chatId
      message {
        _id
        chatId
        message
        sender {
          _id
          sentStatus {
            isSent
            timestamp
          }
        }
        otherMembers {
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
      }
    }
  }
`) as DocumentNode;

export {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  MESSAGE_UPDATED_SUBSCRIPTION,
};
