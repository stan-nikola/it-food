import { useDispatch } from 'react-redux';
import s from './HistoryCardRender.module.css';
import { useEffect } from 'react';
import { getUserOrder } from 'redux/order/operations';
import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';

import { HistoryCardRenderItems } from './HistoryCardRenderItems';

export const HistoryCardRender = () => {
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
    <ul className={s.order_card_wrapper}>
      {userOrder.map(item => (
        <HistoryCardRenderItems key={item._id} props={item} />
      ))}
    </ul>
  );
};
