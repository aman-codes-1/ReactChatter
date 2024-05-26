import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { GraphQLError } from 'graphql/error/GraphQLError';
import { googleLogout } from '@react-oauth/google';
import { Authentication } from '../../libs';

export const createApolloClient = (
  auth: any,
  setAuth: any,
  navigate: any,
  socket: any,
) => {
  const authentication = new Authentication();

  const uri =
    process.env.NODE_ENV === 'development'
      ? `http://${process.env.REACT_APP_CLIENT_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/graphql`
      : `${process.env.REACT_APP_SERVER_URI}/graphql`;

  const subscriptionUri =
    process.env.NODE_ENV === 'development'
      ? `ws://${process.env.REACT_APP_CLIENT_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/graphql`
      : `${process.env.REACT_APP_GRAPHQL_URI}/graphql`;

  const wsLink = new WebSocketLink(
    new SubscriptionClient(subscriptionUri, {
      reconnect: true,
      connectionParams: {
        withCredentials: true,
      },
    }),
  );

  const httpLink = new HttpLink({
    uri,
    credentials: 'include',
  });

  const errorLink: ApolloLink = onError(
    ({ graphQLErrors, networkError }: ErrorResponse) => {
      if (graphQLErrors) {
        graphQLErrors.map(
          async ({ message, locations, path, extensions }: GraphQLError) => {
            if (extensions?.code === 'UNAUTHENTICATED') {
              try {
                googleLogout();
                await authentication.logout();
              } catch (err: any) {
                //
              } finally {
                localStorage.removeItem('isAuthenticated');
                setAuth(undefined);
                navigate('/', { replace: true });
                if (socket) {
                  socket.disconnect();
                }
              }
            }
          },
        );
      }

      if (networkError) {
        //
      }
    },
  );

  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: 20000,
      jitter: true,
    },
    attempts: {
      max: 3,
      retryIf: (error: any) => !!error,
    },
  });

  const opsLink: ApolloLink = from([errorLink, retryLink, httpLink]);

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

  return { client, auth };
};