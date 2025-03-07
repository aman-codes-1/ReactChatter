import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { BaseSvg, Button } from '../..';
import { useAuth } from '../../../hooks';
import {
  ChatsAndFriendsContext,
  FRIENDS_SORTED_QUERY,
} from '../../../contexts';
import { toggleDrawer } from '../../../helpers';
import { NavBarStyled } from './NavBar.styled';

const NavBar = ({ className }: any) => {
  const theme = useTheme();
  const { auth: { _id = '' } = {} } = useAuth();
  const {
    friendsSortedQuery,
    friendsSortedClient,
    setIsHomeButtonClicked,
    setIsMenuDrawerOpen,
    isNewChatDrawerOpen,
    setIsNewChatDrawerOpen,
    currentFriends = [],
    fetchAll,
    closeAllDrawers,
  } = useContext(ChatsAndFriendsContext);
  const isExtraSmallOrBelow = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickLogo = async () => {
    setIsHomeButtonClicked((prev: boolean) => !prev);
    closeAllDrawers();
    await fetchAll();
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

  const handleClickNewChat = async () => {
    try {
      if (!isNewChatDrawerOpen) {
        await friendsSortedQuery({
          variables: {
            userId: _id,
          },
        });
      } else {
        clearSortedFriendsCache();
      }
      toggleDrawer(setIsNewChatDrawerOpen, true);
    } catch (err) {
      console.error('Error fetching friends:', err);
    }
  };

  const handleClickMenu = () => {
    toggleDrawer(setIsMenuDrawerOpen, true);
  };

  return (
    <NavBarStyled className={className}>
      <Link to="/" className="nav-logo" onClick={handleClickLogo}>
        <BaseSvg id="logo" className="nav-logo-svg" />
      </Link>
      {currentFriends?.length ? (
        <Button
          color="secondary"
          variant="outlined"
          startIcon={<CommentOutlinedIcon />}
          xsTextHidden
          onClick={handleClickNewChat}
        >
          New Chat
        </Button>
      ) : null}
      {isExtraSmallOrBelow ? (
        <Button
          variant="contained"
          endIcon={<MenuRoundedIcon />}
          className="nav-menu-btn"
          onClick={handleClickMenu}
          xsTextHidden
        >
          Menu
        </Button>
      ) : null}
    </NavBarStyled>
  );
};

export default NavBar;
