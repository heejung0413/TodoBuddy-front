import { Outlet } from 'react-router-dom';
import PageHeader from './layout/PageHeader';
import { FC } from 'react';
import PageAside from './layout/PageAside';

const Layout: FC = () => {
  return (
    <>
      <PageHeader />
      <main>
        <Outlet />
      </main>
      <PageAside />
    </>
  );
};

export default Layout;
