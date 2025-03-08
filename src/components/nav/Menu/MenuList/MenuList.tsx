import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge, List } from '@mui/material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { DataList, ListItem } from '../../..';
import { getBadgeWidth } from '../../../../helpers';
import { ChatsAndFriendsContext } from '../../../../contexts';
import { MenuListStyled } from './MenuList.styled';

const MenuList = ({ className }: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedOverviewLink = pathname?.split?.('/')?.[1];
  const {
    pendingRequestsCount = 0,
    sentRequestsCount = 0,
    setIsListItemClicked,
    isFetchingChats,
    isFetchingFriends,
    currentChats = [],
    currentFriends = [],
    toggleChats,
    setToggleChats,
    toggleFriends,
    setToggleFriends,
    closeAllDrawers,
    handleClickChat,
  } = useContext(ChatsAndFriendsContext);
  const prevPathname = `${location?.pathname}${location?.search}`;

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

  const handleToggle = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setToggle: any,
  ) => {
    setToggle((prev: boolean) => !prev);
  };

  const handleClickOverviewItem = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    link: string,
  ) => {
    setIsListItemClicked((prev: boolean) => !prev);
    closeAllDrawers();
    if (prevPathname !== link) {
      navigate(link);
    }
  };

  const isLoaded = !isFetchingChats && !isFetchingFriends;
  const showChats = isLoaded && !!currentChats?.length;
  const showFriends = isLoaded && !!currentFriends?.length;
  const bothNotVisible = !showChats && !showFriends;

  return (
    <MenuListStyled className={className}>
      {showChats ? (
        <>
          <ListItem
            dense
            sx={{ pt: 0 }}
            btnProps={{
              textProps: {
                primary: 'Chats',
                slotProps: {
                  primary: {
                    className: 'default-heading heading',
                    style: {
                      WebkitLineClamp: 1,
                    },
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
              data={currentChats}
              className="flex-list-item margin-bottom"
              scrollDependencies={[toggleChats, toggleFriends]}
              handleClickListItem={handleClickChat}
            />
          ) : null}
        </>
      ) : null}
      {showFriends ? (
        <>
          <ListItem
            dense
            sx={!showChats ? { pt: 0 } : {}}
            btnProps={{
              textProps: {
                primary: currentChats?.length ? 'New Chat' : 'Your Friends',
                slotProps: {
                  primary: {
                    className: 'default-heading',
                    style: {
                      WebkitLineClamp: 1,
                    },
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
                data={currentFriends}
                className="flex-list-item margin-bottom"
                scrollDependencies={[toggleChats, toggleFriends]}
                handleClickListItem={handleClickChat}
              />
            </>
          ) : null}
        </>
      ) : null}
      <>
        <ListItem
          dense
          sx={bothNotVisible ? { pt: 0 } : {}}
          disableHover
          btnProps={{
            textProps: {
              primary: 'Overview',
              slotProps: {
                primary: {
                  className: 'default-heading',
                  style: {
                    WebkitLineClamp: 1,
                  },
                },
              },
            },
          }}
        />
        <List dense disablePadding className="flex-list-item">
          {navLinks?.map((navLink, idx) => (
            <ListItem
              key={navLink?.title}
              btnProps={{
                textProps: {
                  primary: navLink?.title || '',
                  slotProps: {
                    primary: {
                      fontSize: '0.875rem',
                      style: {
                        WebkitLineClamp: 1,
                      },
                    },
                  },
                },
                startIcon: navLink?.icon,
                endIcon: (
                  <Badge
                    badgeContent={navLink?.count}
                    color="secondary"
                    max={999}
                    sx={{
                      left: `-${getBadgeWidth(navLink?.count)}px`,
                    }}
                    invisible={!navLink?.count}
                  />
                ),
                selected:
                  idx ===
                  navLinks?.findIndex(
                    (el) =>
                      selectedOverviewLink === el?.link?.split?.('/')?.[1],
                  ),
                onClick: (_) => handleClickOverviewItem(_, navLink?.link),
              }}
            />
          ))}
        </List>
      </>
    </MenuListStyled>
  );
};

export default MenuList;
