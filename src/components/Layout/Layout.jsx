import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { ToastContainer } from 'react-toastify';
import { TopBar } from 'components/TopBar';

export const Layout = ({ setter }) => {
  return (
    <>
      <TopBar setter={setter} />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <ToastContainer />
    </>
  );
};
