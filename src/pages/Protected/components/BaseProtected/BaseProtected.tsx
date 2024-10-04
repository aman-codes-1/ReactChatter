import { useLayoutEffect, useRef, useState } from 'react';
import { AppBar } from '@mui/material';
import { Drawer, NavBar, SideBar } from '../../../../components';
import {
  ChatsAndFriendsProvider,
  MessagesProvider,
} from '../../../../contexts';
import { updateHeight } from '../../../../helpers';
import { SideBarList } from './components';
import { Dashboard } from './pages';
import { BaseProtectedStyled } from './BaseProtected.styled';

const BaseProtected = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<any>(null);

  const toggleDrawer = (newOpen: boolean, isSwitch?: boolean) => () => {
    if (isSwitch) {
      setIsDrawerOpen((prev) => !prev);
    } else {
      setIsDrawerOpen(newOpen);
    }
  };

  useLayoutEffect(() => {
    updateHeight(navbarRef, setNavbarHeight);
    window.addEventListener('resize', () =>
      updateHeight(navbarRef, setNavbarHeight),
    );

    return () => {
      window.removeEventListener('resize', () =>
        updateHeight(navbarRef, setNavbarHeight),
      );
    };
  }, []);

  return (
    <ChatsAndFriendsProvider>
      <MessagesProvider>
        <BaseProtectedStyled>
          <SideBar className="hidden-from-mobile">
            <SideBarList />
          </SideBar>
          <Drawer
            isOpen={isDrawerOpen}
            anchor="right"
            onClose={toggleDrawer(false)}
            isMobile
            navbarHeight={navbarHeight}
          >
            <SideBar className="mobile-sidebar">
              <SideBarList toggleDrawer={toggleDrawer(false)} />
            </SideBar>
          </Drawer>
          <Dashboard navbarHeight={navbarHeight} />
          <AppBar
            position="fixed"
            elevation={0}
            className="hidden-from-web mobile-navbar"
            ref={navbarRef}
          >
            <NavBar
              onMenuClick={toggleDrawer(false, true)}
              toggleDrawer={toggleDrawer(false)}
            />
          </AppBar>
        </BaseProtectedStyled>
      </MessagesProvider>
    </ChatsAndFriendsProvider>
  );
};

export default BaseProtected;
