import { createContext, useContext, useRef, useState } from 'react';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {
  DataList,
  Drawer,
  ListItem,
  Menu,
  MobileNavBar,
} from '../../components';
import { useAuth } from '../../hooks';
import { toggleDrawer } from '../../helpers';
import { ChatsAndFriendsContext, FRIENDS_SORTED_QUERY } from '..';
import { DrawerMainStyled } from './Drawer.styled';

export const DrawerContext = createContext<any>({});

export const DrawerProvider = ({ children }: any) => {
  const theme = useTheme();
  const [navBarHeight, setNavBarHeight] = useState(0);
  const [menuWidth, setMenuWidth] = useState(0);
  const { auth: { _id = '' } = {} } = useAuth();
  const {
    friendsSorted = [],
    friendsSortedClient,
    isMenuDrawerOpen,
    setIsMenuDrawerOpen,
    isNewChatDrawerOpen,
    setIsNewChatDrawerOpen,
    handleClickChat,
  } = useContext(ChatsAndFriendsContext);
  const navBarRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isExtraSmallOrBelow = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumOrAbove = useMediaQuery(theme.breakpoints.up('sm'));
  const isExtraLargeOrAbove = useMediaQuery(theme.breakpoints.up('lg'));
  const isBetweenMediumAndLarge = useMediaQuery(
    theme.breakpoints.between('md', 'lg'),
  );
  const isBetweenSmallAndMedium = useMediaQuery(
    theme.breakpoints.between('sm', 'md'),
  );
  const isBetweenExtraSmallAndMedium = useMediaQuery(
    theme.breakpoints.between('xs', 'sm'),
  );

  const getDrawerWidth = () => {
    let maxWidth = 0;

    if (isExtraLargeOrAbove) {
      maxWidth = 400;
    } else if (isBetweenMediumAndLarge) {
      maxWidth = 350;
    } else if (isBetweenSmallAndMedium) {
      maxWidth = 300;
    } else if (isBetweenExtraSmallAndMedium) {
      maxWidth = 330;
    }

    return maxWidth;
  };

  const clearSortedFriendsCache = () => {
    friendsSortedClient.cache.evict({
      fieldName: 'friendsSorted',
      args: { input: { userId: _id } },
    });
    friendsSortedClient.cache.gc();
    friendsSortedClient.writeQuery({
      query: FRIENDS_SORTED_QUERY,
      data: {
        friendsSorted: [],
      },
      variables: { userId: _id },
    });
  };

  const handleClickCloseNewChat = () => {
    toggleDrawer(setIsNewChatDrawerOpen);
    setTimeout(() => {
      clearSortedFriendsCache();
    }, 200);
  };

  const handleClickCloseMenu = () => {
    toggleDrawer(setIsMenuDrawerOpen);
  };

  return (
    <DrawerContext.Provider
      value={{
        navBarHeight,
        setNavBarHeight,
        menuWidth,
        setMenuWidth,
        getDrawerWidth,
      }}
    >
      {isExtraSmallOrBelow ? (
        <Menu
          open={isMenuDrawerOpen}
          onClose={handleClickCloseMenu}
          anchor="right"
        />
      ) : null}
      <div style={{ display: 'flex' }}>
        {isMediumOrAbove ? (
          <Menu
            open
            variant="permanent"
            ref={menuRef}
            setMenuWidth={setMenuWidth}
          />
        ) : null}
        <Drawer
          open={isNewChatDrawerOpen}
          onClose={handleClickCloseNewChat}
          variant={isMediumOrAbove ? 'persistent' : 'temporary'}
        >
          <div style={{ marginTop: '1rem' }}>
            <ListItem
              dense
              disableHover
              sx={{
                pt: 0,
                pb: 0,
              }}
              btnProps={{
                sx: {
                  gap: '1.125rem',
                  ml: '-0.125rem',
                },
                textProps: {
                  primary: 'New Chat',
                  slotProps: {
                    primary: {
                      sx: {
                        fontWeight: 600,
                      },
                      style: {
                        WebkitLineClamp: 1,
                      },
                    },
                  },
                },
                startIcon: isMediumOrAbove ? (
                  <IconButton onClick={handleClickCloseNewChat}>
                    <ArrowBackRoundedIcon />
                  </IconButton>
                ) : null,
              }}
            />
            <DataList
              dense
              data={friendsSorted}
              handleClickListItem={handleClickChat}
            />
          </div>
        </Drawer>
        <DrawerMainStyled drawerWidth={isMediumOrAbove ? getDrawerWidth() : 0}>
          {children}
        </DrawerMainStyled>
      </div>
      {isExtraSmallOrBelow ? (
        <MobileNavBar ref={navBarRef} setNavBarHeight={setNavBarHeight} />
      ) : null}
    </DrawerContext.Provider>
  );
};
