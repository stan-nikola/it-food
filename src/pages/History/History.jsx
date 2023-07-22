import { useDispatch } from 'react-redux';
import s from './History.module.css';
import { useEffect, useState } from 'react';
import { getOrderCount, getUserOrder } from 'redux/order/operations';
import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';

import { HistoryCardRender } from './../../components/HistoryCardRender/HistoryCardRender';
import { HistoryRightSideBar } from 'components/HistoryRightSideBar/HistoryRightSideBar';
import { useSearchParams } from 'react-router-dom';
import { deleteUserOrder } from 'redux/order/orderSlice';
import { UnauthorizedHistory } from 'components/UnauthorizedHistory/UnauthorizedHistory';

export const History = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const [page, setPage] = useState(1);

  const [target, setTarget] = useState(null);

  const dispatch = useDispatch();

  const { isLoggedIn, isRefreshing } = useAuth();
  const currentPage = searchParams.get('page');

  const { userOrder, userOrderEnd, orderCount } = useOrder();

  useEffect(() => {
    dispatch(deleteUserOrder());
  }, [dispatch]);

  useEffect(() => {
    !userOrderEnd && isIntersecting && setPage(prev => prev + 1);
  }, [isIntersecting, userOrderEnd]);

  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams]);

  useEffect(() => {
    if (isLoggedIn && !isRefreshing) {
      dispatch(getUserOrder(currentPage));
      dispatch(getOrderCount());
    }
  }, [currentPage, dispatch, isLoggedIn, isRefreshing]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: '10px' }
    );
    target && observer.observe(target);
    return () => observer.disconnect();
  }, [target]);

  return (
    <section className={s.historyContainer}>
      {isLoggedIn || isRefreshing ? (
        <>
          <HistoryCardRender
            func={target => setTarget(target)}
            userOrder={userOrder}
          />
          <HistoryRightSideBar orderCount={orderCount} />
        </>
      ) : (
        <UnauthorizedHistory />
      )}
    </section>
  );
};
