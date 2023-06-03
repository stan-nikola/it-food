import { TopBar } from './TopBar/TopBar';

import { Dashboard } from '../pages/Dashboard/Dashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import { refreshUser } from 'redux/auth/operations';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};
