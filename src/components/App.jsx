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

import '../index.css';

export const App = () => {
  const dispatch = useDispatch();

  const { token } = useAuth();

  // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // const [theme, setTheme] = useLocalStorage(
  //   'theme',
  //   defaultDark ? 'dark' : 'light'
  // );

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
