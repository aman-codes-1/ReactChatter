import { NavBar, SideBarFooter } from '..';
import { SideBarStyled } from './SideBar.styled';

const SideBar = ({ className, children }: any) => (
  <SideBarStyled className={className}>
    <NavBar className="hidden-from-mobile flex-item" />
    {children}
    <SideBarFooter />
  </SideBarStyled>
);

export default SideBar;
