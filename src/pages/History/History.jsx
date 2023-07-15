import { useDispatch } from 'react-redux';
import s from './History.module.css';
import { useEffect } from 'react';
import { getUserOrder } from 'redux/order/operations';
import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';

import { HistoryCardRender } from './../../components/HistoryCardRender/HistoryCardRender';
import { HistoryRightSideBar } from 'components/HistoryRightSideBar/HistoryRightSideBar';

export const History = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useAuth();

  const { orderLoading, userOrder } = useOrder();

  useEffect(() => {
    isLoggedIn && dispatch(getUserOrder());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    orderLoading && isLoggedIn && dispatch(getUserOrder());
  }, [dispatch, isLoggedIn, orderLoading]);

  return (
    <section className={s.historyContainer}>
      <HistoryCardRender userOrder={userOrder} />
      <HistoryRightSideBar userOrder={userOrder} />
    </section>
  );
};
