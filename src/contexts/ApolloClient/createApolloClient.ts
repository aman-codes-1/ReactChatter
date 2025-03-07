import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';

export const createApolloClient = (
  callLogout: (includeFromState?: boolean) => Promise<void>,
  setIsWsConnecting: any,
  setIsWsConnected: any,
  setIsWsError: any,
  setIsNetworkError: any,
) => {
  const uri = `${process.env.REACT_APP_PROXY_URI}/graphql`;

  const subscriptionUri = `${uri?.replace?.('http', 'ws')}`;

  const wsLink = new GraphQLWsLink(
    createClient({
      url: subscriptionUri,
      connectionParams: {
        withCredentials: true,
      },
      shouldRetry: (errOrCloseEvent: any) => errOrCloseEvent?.type !== 'error',
      retryAttempts: 10,
      retryWait: async (attempt) => {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      },
      on: {
        connecting: () => {
          setIsWsConnecting(true);
          setIsWsConnected(false);
          setIsWsError(false);
        },
        connected: () => {
          setIsWsConnected(true);
          setIsWsConnecting(false);
          setIsWsError(false);
        },
        // closed: () => {
        //   setIsWsConnected(false);
        // },
        error: () => {
          setIsWsError(true);
          setIsWsConnecting(false);
          setIsWsConnected(false);
        },
      },
    }),
  );

  const httpLink = new HttpLink({
    uri,
    credentials: 'include',
  });

  let hasLoggedOut = false;

  const errorLink: ApolloLink = onError(
    ({ graphQLErrors, networkError }: ErrorResponse) => {
      if (networkError) {
        setIsNetworkError(true);
      } else {
        setIsNetworkError(false);
      }

      if (graphQLErrors) {
        graphQLErrors?.map(async ({ extensions }) => {
          if (extensions?.code === 'UNAUTHENTICATED' && !hasLoggedOut) {
            hasLoggedOut = true;
            await callLogout(true);
          }
        });
      }
    },
  );

  const responseLogger = new ApolloLink((operation, forward) =>
    forward(operation).map((result) => {
      setIsNetworkError(false);
      return result;
    }),
  );

  const opsLink: ApolloLink = from([responseLogger, errorLink, httpLink]);

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    opsLink,
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });

  return client;
};
