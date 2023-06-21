import { Dashboard } from '../pages/Dashboard/Dashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { refreshUser } from 'redux/auth/operations';
import { useAuth } from './hooks/useAuth';

import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { DishBlock } from './MainBlock/DishBlock';
import { Order } from 'pages/Order/Order';

export const App = () => {
  const dispatch = useDispatch();

  const { token } = useAuth();

  useEffect(() => {
    if (token) dispatch(refreshUser());
  }, [dispatch, token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/home/main" />} />
          <Route path="/home/" element={<Navigate to="/home/main" />} />

          <Route path="/home" element={<Dashboard />}>
            <Route path=":category" element={<DishBlock />} />
          </Route>
          <Route path="/order" element={<Order />} />
        </Route>
      </Routes>
    </>
  );
};
