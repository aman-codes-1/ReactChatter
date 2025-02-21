import { Navigate } from 'react-router-dom';
import { SuspenseWrapper } from '../components';
import {
  AddFriend,
  Chats,
  Dashboard,
  FriendRequests,
  Home,
  SentRequests,
} from '../pages';

export const routesConfig = (location: any) => [
  {
    type: 'default',
    path: '*',
    Element: () => <Navigate to="/" state={{ from: location }} replace />,
  },
  {
    type: 'public',
    path: '/',
    Element: () => (
      <SuspenseWrapper
        path="pages"
        compName="Home"
        fallback={<Home loadingHome />}
      />
    ),
  },
  {
    type: 'private',
    path: '/',
    Element: () => (
      <SuspenseWrapper
        path="pages"
        compName="Dashboard"
        fallback={<Dashboard />}
      />
    ),
  },
  {
    type: 'private',
    path: '/chat',
    Element: () => (
      <SuspenseWrapper
        path="pages"
        compName="Chats"
        fallback={<Chats loadingChats />}
      />
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
