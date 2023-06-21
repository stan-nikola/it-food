import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { TopBar } from 'components/TopBar/TopBar';
import { ToastContainer } from 'react-toastify';

export const Layout = () => {
  return (
    <>
      <TopBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <ToastContainer />
    </>
  );
};
