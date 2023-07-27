import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { refreshUser } from 'redux/auth/operations';
import { useAuth } from './hooks/useAuth';

import { Layout } from './Layout';
import { DishBlock } from './MainBlock';

import { Dashboard } from 'pages/Dashboard';
import { Order } from 'pages/Order';
import { History } from 'pages/History';

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
          <Route path="/home" element={<Dashboard />}>
            <Route path=":category" element={<DishBlock />} />
          </Route>

          <Route path="/order/" element={<Navigate to="/order/last" />} />

          <Route path="/order/:orderId" element={<Order />}></Route>
          <Route path="/history/" element={<History />}></Route>
        </Route>
        <Route path="*" element={<>NotFound</>} />
      </Routes>
    </>
  );
};
