import { Dashboard } from '../pages/Dashboard/Dashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { refreshUser } from 'redux/auth/operations';
import { useAuth } from './hooks/useAuth';

import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { DishBlock } from './MainBlock/DishBlock';
import { Order } from 'pages/Order/Order';
import { History } from 'pages/History/History';

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
          <Route path="/" element={<Navigate to="/home/main?category=all" />} />
          <Route
            path="/home/"
            element={<Navigate to="/home/main?category=all" />}
          />
          <Route path="/order/" element={<Navigate to="/order/new" />} />

          <Route path="/home" element={<Dashboard />}>
            <Route path=":category" element={<DishBlock />} />
          </Route>

          <Route path="/order/:orderId" element={<Order />} />
          <Route path="/history/" element={<History />} />
        </Route>
        <Route path="*" element={<>NotFound</>} />
      </Routes>
    </>
  );
};
