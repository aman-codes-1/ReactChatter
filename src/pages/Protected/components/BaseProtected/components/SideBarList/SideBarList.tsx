import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge, List } from '@mui/material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Button, DataList, ListItem } from '../../../../../../components';
import {
  CHAT_ADDED_SUBSCRIPTION,
  CHATS_QUERY,
  ChatsAndFriendsContext,
  MessagesContext,
  OTHER_FRIENDS_QUERY,
} from '../../../../../../contexts';
import { useAuth } from '../../../../../../hooks';
import { SideBarListStyled } from './SideBarList.styled';

const SideBarList = ({ toggleDrawer, className }: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedOverviewLink = pathname?.split?.('/')?.[1];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const { auth: { _id = '' } = {} } = useAuth();
  const {
    chats = [],
    chatsClient,
    subscribeChatsToMore,
    otherFriends = [],
    otherFriendsClient,
    pendingRequestsCount = 0,
    sentRequestsCount = 0,
    setIsListItemClicked,
    setLoadingQuery,
    selectedChat,
    setSelectedChat,
    selectedFriend,
    setSelectedFriend,
    setSelectedMember,
  } = useContext(ChatsAndFriendsContext);
  const {
    setLoadingChatMessages,
    getChatMessagesWithQueue,
    getFriendMessagesWithQueue,
  } = useContext(MessagesContext);
  const [toggleChats, setToggleChats] = useState(!!chats?.length);
  const [toggleFriends, setToggleFriends] = useState(!!otherFriends?.length);
  const unsubscribeRef = useRef<() => void>();

  const navLinks = [
    {
      icon: <PersonAddAltOutlinedIcon className="list-item-icon" />,
      title: 'Add Friend',
      link: '/addFriend',
    },
    {
      icon: <Face4OutlinedIcon className="list-item-icon" />,
      title: 'Friend Requests',
      link: '/friendRequests',
      count: pendingRequestsCount,
    },
    {
      icon: <PeopleAltOutlinedIcon className="list-item-icon" />,
      title: 'Sent Requests',
      link: '/sentRequests',
      count: sentRequestsCount,
    },
  ];

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (chats?.length) {
      setToggleChats(true);
    } else {
      setToggleChats(false);
    }
  }, [chats]);

  useLayoutEffect(() => {
    if (otherFriends?.length) {
      setToggleFriends(true);
    } else {
      setToggleFriends(false);
    }
  }, [otherFriends]);

  const updateQuery = useCallback(
    (prev: any, { subscriptionData }: any) => {
      if (!subscriptionData?.data) return prev;

      const OnChatAdded = subscriptionData?.data?.OnChatAdded;
      const OnChatAddedFriendId = OnChatAdded?.friendId;
      const OnChatAddedChat = OnChatAdded?.chat;
      const OnChatAddedMembers = OnChatAddedChat?.members;
      const isChatAddedPrivate = OnChatAddedChat?.type === 'private';

      const isAlreadyExists = prev?.chats?.length
        ? prev?.chats?.some((chat: any) => chat?._id === OnChatAddedChat?._id)
        : false;

      const isMemberExists = OnChatAddedMembers?.length
        ? OnChatAddedMembers.some((member: any) => member?._id === _id)
        : false;

      if (!isAlreadyExists && isMemberExists) {
        if (isChatAddedPrivate) {
          otherFriendsClient.writeQuery({
            query: OTHER_FRIENDS_QUERY,
            data: {
              otherFriends: otherFriends?.length
                ? otherFriends?.filter(
                    (otherFriend: any) =>
                      otherFriend?._id !== OnChatAddedFriendId,
                  )
                : otherFriends,
            },
            variables: {
              userId: _id,
            },
          });
        }

        setSelectedFriend();
        setSelectedChat(OnChatAddedChat);

        const data = {
          ...prev,
          chats: prev?.chats?.length
            ? [OnChatAddedChat, ...prev.chats]
            : [OnChatAddedChat],
        };

        chatsClient.writeQuery({
          query: CHATS_QUERY,
          data,
          variables: {
            userId: _id,
          },
        });

        return data;
      }

      return prev;
    },
    [otherFriends, otherFriendsClient, chatsClient],
  );

  useEffect(() => {
    if (unsubscribeRef?.current) {
      unsubscribeRef?.current();
    }

    unsubscribeRef.current = subscribeChatsToMore({
      document: CHAT_ADDED_SUBSCRIPTION,
      updateQuery,
      variables: {
        userId: _id,
      },
    });

    return () => {
      if (unsubscribeRef?.current) {
        unsubscribeRef?.current();
      }
    };
  }, [subscribeChatsToMore, updateQuery]);

  const handleToggle = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setToggle: any,
  ) => {
    setToggle((prev: boolean) => !prev);
  };

  const handleClickChat = async (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    chat: any,
    selectedMember: any,
  ) => {
    setIsListItemClicked((prev: boolean) => !prev);

    if (chat?._id) {
      try {
        setLoadingQuery(false);
        setLoadingChatMessages(false);
        await getChatMessagesWithQueue(chat?._id);
        setSelectedFriend(undefined);
        setSelectedChat(chat);
        setSelectedMember(selectedMember);
        navigate(`/chat?id=${chat?._id}&type=chat`);
        toggleDrawer?.();
      } catch (error: any) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  const handleClickFriend = async (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    friend: any,
    selectedMember: any,
  ) => {
    setIsListItemClicked((prev: boolean) => !prev);

    if (friend?._id) {
      try {
        setLoadingQuery(false);
        setLoadingChatMessages(false);
        await getFriendMessagesWithQueue(friend?._id);
        setSelectedChat(undefined);
        setSelectedFriend(friend);
        setSelectedMember(selectedMember);
        navigate(`/chat?id=${friend?._id}&type=friend`);
        toggleDrawer?.();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  const handleClickOverviewItem = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    link: string,
  ) => {
    setIsListItemClicked((prev: boolean) => !prev);
    toggleDrawer?.();
    navigate(link);
  };

  return (
    <SideBarListStyled
      chats={chats}
      toggleFriends={toggleFriends}
      className={`flex-item ${className}`}
    >
      {chats?.length ? (
        <>
          <ListItem
            dense
            disablePadding
            disableGutters
            btnProps={{
              textProps: {
                primary: 'Chats',
                primaryTypographyProps: {
                  className: 'default-heading heading',
                  style: {
                    WebkitLineClamp: 1,
                  },
                },
              },
              endIcon: toggleChats ? (
                <ExpandLessIcon />
              ) : (
                <ExpandCircleDownIcon />
              ),
              onClick: (_) => handleToggle(_, setToggleChats),
            }}
          />
          {toggleChats ? (
            <DataList
              dense
              data={chats}
              selectedItem={selectedChat}
              handleClickListItem={handleClickChat}
              className={toggleChats ? 'chats-wrapper margin-bottom' : ''}
              scrollDependencies={[toggleChats, toggleFriends]}
              WebkitLineClamp={1}
              disableGutters={isMobile}
            />
          ) : null}
        </>
      ) : null}
      {otherFriends?.length ? (
        <>
          <ListItem
            dense
            disablePadding
            disableGutters
            btnProps={{
              textProps: {
                primary: chats?.length ? 'New Chat' : 'Your Friends',
                primaryTypographyProps: {
                  className: 'default-heading',
                  style: {
                    WebkitLineClamp: 1,
                  },
                },
              },
              endIcon: toggleFriends ? (
                <ExpandLessIcon fontSize="small" />
              ) : (
                <ExpandCircleDownIcon fontSize="small" />
              ),
              onClick: (_) => handleToggle(_, setToggleFriends),
            }}
          />
          {toggleFriends ? (
            <>
              <DataList
                dense
                data={otherFriends}
                sliceDataBy={
                  toggleChats && chats?.length > 2 && otherFriends?.length > 2
                    ? 2
                    : undefined
                }
                selectedItem={selectedFriend}
                handleClickListItem={handleClickFriend}
                className={toggleFriends ? 'friends-wrapper margin-bottom' : ''}
                scrollDependencies={[toggleChats, toggleFriends]}
                WebkitLineClamp={1}
                disableGutters={isMobile}
              />
              {toggleChats && chats?.length > 2 && otherFriends?.length > 2 ? (
                <Button
                  color="secondary"
                  variant="outlined"
                  size="small"
                  fullWidth
                >
                  View More
                </Button>
              ) : null}
            </>
          ) : null}
        </>
      ) : null}
      {navLinks?.length ? (
        <>
          <ListItem
            dense
            disablePadding
            disableGutters
            disableHover
            btnProps={{
              textProps: {
                primary: 'Overview',
                primaryTypographyProps: {
                  className: 'default-heading',
                  style: {
                    WebkitLineClamp: 1,
                  },
                },
              },
            }}
          />
          <List dense disablePadding>
            {navLinks.map((navLink, idx) => (
              <ListItem
                key={navLink?.title}
                btnProps={{
                  textProps: {
                    primary: navLink?.title || '',
                    primaryTypographyProps: {
                      style: {
                        WebkitLineClamp: 1,
                      },
                    },
                  },
                  startIcon: navLink?.icon,
                  endIcon: (
                    <Badge
                      badgeContent={navLink?.count}
                      color="secondary"
                      overlap="circular"
                      sx={{ mr: '0.5rem' }}
                    />
                  ),
                  selected:
                    idx ===
                    navLinks.findIndex(
                      (el) =>
                        selectedOverviewLink === el?.link?.split?.('/')?.[1],
                    ),
                  onClick: (_) => handleClickOverviewItem(_, navLink?.link),
                }}
                disableGutters={isMobile}
              />
            ))}
          </List>
        </>
      ) : null}
    </SideBarListStyled>
  );
};

export default SideBarList;
