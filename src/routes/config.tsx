import { Navigate } from 'react-router-dom';
import { SuspenseWrapper } from '../components';
import {
  AddFriend,
  ChatMessages,
  FriendRequests,
  Home,
  Login,
  RecentChats,
  SentRequests,
} from '../pages';
import { MessagesProvider } from '../contexts';

export const routesConfig = () => [
  {
    type: 'default',
    path: '*',
    Element: () => <Navigate replace to="/" />,
  },
  {
    type: 'public',
    path: '/',
    Element: () => (
      <SuspenseWrapper path="pages" compName="Home" fallback={<Home />} />
    ),
  },
  {
    type: 'public',
    path: '/login',
    Element: () => (
      <SuspenseWrapper path="pages" compName="Login" fallback={<Login />} />
    ),
  },
  {
    type: 'private',
    path: '/',
    Element: () => (
      <SuspenseWrapper
        path="pages"
        compName="RecentChats"
        fallback={<RecentChats />}
      />
    ),
  },
  {
    type: 'private',
    path: '/chat',
    Element: () => (
      <MessagesProvider>
        <SuspenseWrapper
          path="pages"
          compName="ChatMessages"
          fallback={<ChatMessages />}
        />
      </MessagesProvider>
    ),
  },
  {
    type: 'private',
    path: '/addFriend',
    Element: () => (
      <SuspenseWrapper
        path="pages"
        compName="AddFriend"
        fallback={<AddFriend />}
      />
    ),
  },
  {
    type: 'private',
    path: '/friendRequests',
    Element: () => (
      <SuspenseWrapper
        path="pages"
        compName="FriendRequests"
        fallback={<FriendRequests />}
      />
    ),
  },
  {
    type: 'private',
    path: '/sentRequests',
    Element: () => (
      <SuspenseWrapper
        path="pages"
        compName="SentRequests"
        fallback={<SentRequests />}
      />
    ),
  },
];
