import { useContext, useLayoutEffect, useState } from 'react';
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
  const { auth: { _id = '' } = {} } = useAuth();
  const {
    chats = [],
    otherFriends = [],
    pendingRequestsCount = 0,
    sentRequestsCount = 0,
    otherFriendsClient,
    subscribeChatsToMore,
    setIsListItemClicked,
    selectedChat,
    setSelectedChat,
    selectedFriend,
    setSelectedFriend,
    setSelectedMember,
  } = useContext(ChatsAndFriendsContext);
  const { getCachedMessages, getQueuedMessages } = useContext(MessagesContext);
  const [toggleChats, setToggleChats] = useState(!!chats?.length);
  const [toggleFriends, setToggleFriends] = useState(!!otherFriends?.length);
  const [hasChatsScrollbar, setHasChatsScrollbar] = useState(false);
  const [hasFriendsScrollbar, setHasFriendsScrollbar] = useState(false);

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

  useLayoutEffect(() => {
    const chatsUnsubscribe: any = subscribeChatsToMore?.({
      document: CHAT_ADDED_SUBSCRIPTION,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (Object.values(prev || {})?.length) {
          if (!subscriptionData?.data) {
            return prev;
          }
          const OnChatAdded = subscriptionData?.data?.OnChatAdded;
          const OnChatAddedFriendId = OnChatAdded?.friendId;
          const OnChatAddedChat = OnChatAdded?.chat;
          const OnChatAddedMembers = OnChatAddedChat?.members;
          if (
            prev?.chats &&
            prev?.chats?.length &&
            prev?.chats?.find((chat: any) => chat === OnChatAddedChat)
          ) {
            return prev;
          }
          if (
            OnChatAddedMembers?.length &&
            OnChatAddedMembers?.some(
              (OnChatAddedMember: any) => OnChatAddedMember?._id === _id,
            )
          ) {
            if (OnChatAddedChat?.type === 'private') {
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
            return { ...prev, chats: [OnChatAddedChat, ...prev.chats] };
          }
        }
        return prev;
      },
    });

    return () => {
      chatsUnsubscribe?.();
    };
  }, [_id, otherFriends, otherFriendsClient, subscribeChatsToMore]);

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
        await getCachedMessages(chat?._id);
        toggleDrawer?.();
        setSelectedFriend(undefined);
        setSelectedChat(chat);
        setSelectedMember(selectedMember);
        navigate(`/chat?id=${chat?._id}&type=chat`);
      } catch (error) {
        console.error('Error fetching data:', error);
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
        await getQueuedMessages(friend?._id, true);
        toggleDrawer?.();
        setSelectedChat(undefined);
        setSelectedFriend(friend);
        setSelectedMember(selectedMember);
        navigate(`/chat?id=${friend?._id}&type=friend`);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      otherFriends={otherFriends}
      toggleChats={toggleChats}
      toggleFriends={toggleFriends}
      className={`flex-item ${className}`}
      hasChatsScrollbar={hasChatsScrollbar}
      hasFriendsScrollbar={hasFriendsScrollbar}
    >
      {chats?.length ? (
        <>
          <ListItem
            dense
            sx={{ pt: 0, pb: 0 }}
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
              hasScrollbar={hasChatsScrollbar}
              setHasScrollbar={setHasChatsScrollbar}
            />
          ) : null}
        </>
      ) : null}
      {otherFriends?.length ? (
        <>
          <ListItem
            dense
            sx={{ pt: 0, pb: 0 }}
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
                hasScrollbar={hasFriendsScrollbar}
                setHasScrollbar={setHasFriendsScrollbar}
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
            sx={{ pt: 0, pb: 0 }}
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
              />
            ))}
          </List>
        </>
      ) : null}
    </SideBarListStyled>
  );
};

export default SideBarList;
