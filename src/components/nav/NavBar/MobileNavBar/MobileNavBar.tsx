import { forwardRef, useLayoutEffect } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { NavBar } from '..';
import { MobileNavBarStyled } from './MobileNavBar.styled';
import { updateHeight } from '../../../../helpers';

const MobileNavBar = forwardRef<HTMLDivElement, any>((props, ref) => {
  const { setNavBarHeight } = props;

  useLayoutEffect(() => {
    const update = () => updateHeight(ref, setNavBarHeight, true);
    update();

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <MobileNavBarStyled>
      <div className="mobile-navbar-wrapper" ref={ref}>
        <AppBar position="static" className="mobile-navbar-app-bar">
          <Toolbar
            variant="dense"
            disableGutters
            className="mobile-navbar-tool-bar"
          >
            <NavBar />
          </Toolbar>
        </AppBar>
      </div>
    </MobileNavBarStyled>
  );
});

export default MobileNavBar;
