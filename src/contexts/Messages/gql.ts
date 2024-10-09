import { DocumentNode } from 'graphql';
import { gql } from '../../__generated__/gql';

const MESSAGE_QUEUED_QUERY = gql(/* GraphQL */ `
  query messageQueued($queueId: String!) {
    messageQueued(input: { queueId: $queueId }) {
      _id
    }
  }
`) as DocumentNode;

const MESSAGES_QUERY = gql(/* GraphQL */ `
  query messages($chatId: String!) {
    messages(input: { chatId: $chatId }, limit: 25, skip: 0) {
      _id
      chatId
      queueId
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
    $queueId: String
    $message: String!
    $timestamp: Float!
  ) {
    createMessage(
      input: {
        chatId: $chatId
        senderId: $senderId
        queueId: $queueId
        message: $message
        timestamp: $timestamp
      }
    ) {
      _id
      queueId
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
      queueId
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
        queueId
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
        queueId
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
  MESSAGE_QUEUED_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  MESSAGE_UPDATED_SUBSCRIPTION,
};
