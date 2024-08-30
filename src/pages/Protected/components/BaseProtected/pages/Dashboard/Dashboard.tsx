import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardStyled } from './Dashboard.styled';

const Dashboard = ({ navbarHeight }: any) => (
  <DashboardStyled navbarHeight={navbarHeight}>
    <Suspense fallback={null}>
      <Outlet context={[navbarHeight]} />
    </Suspense>
  </DashboardStyled>
);

export default Dashboard;
