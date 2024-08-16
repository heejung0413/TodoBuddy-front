import { Outlet } from 'react-router-dom';
import PageHeader from './layout/PageHeader';
import { FC } from 'react';

const Layout: FC = () => {
  return (
    <>
      <PageHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
