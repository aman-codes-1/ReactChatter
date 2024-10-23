import { forwardRef } from 'react';
import { NavBar, SideBarFooter } from '..';
import { SideBarStyled } from './SideBar.styled';

const SideBar = forwardRef((props: any, ref: any) => {
  const { className, children } = props;

  return (
    <SideBarStyled className={className} ref={ref}>
      <NavBar className="hidden-from-mobile flex-item" />
      {children}
      <SideBarFooter className="flex-item" />
    </SideBarStyled>
  );
});

export default SideBar;
