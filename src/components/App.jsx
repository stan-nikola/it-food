import { TopBar } from './TopBar/TopBar';

import { Dashboard } from '../pages/Dashboard/Dashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { refreshUser } from 'redux/auth/operations';
import { useAuth } from './hooks/useAuth';

export const App = () => {
  const dispatch = useDispatch();

  const { token } = useAuth();

  useEffect(() => {
    if (token) dispatch(refreshUser());
  }, [dispatch, token]);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};
