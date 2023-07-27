import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import s from './History.module.css';
import { useEffect, useState } from 'react';
import { getOrderCount, getUserOrder } from 'redux/order/operations';
import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';

import { HistoryCardRender } from 'components/HistoryCardRender';

import { deleteUserOrder } from 'redux/order/orderSlice';
import { NoContentHistory } from 'components/NoContentHistory';
import { HistoryRightSideBar } from 'components/HistoryRightSideBar';

export const History = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const [page, setPage] = useState(1);

  const [target, setTarget] = useState(null);

  const dispatch = useDispatch();

  const { isLoggedIn, isRefreshing, isLoading } = useAuth();

  const currentPage = searchParams.get('page');

  const { userOrder, orderLoading, userOrderEnd, orderCount } = useOrder();

  const unauthorizedText =
    'To view the history of your orders, you need to SIGN UP or LOG IN.';
  const authorizedText = `Sorry, but you don't have an order history yet. Please go to HOME to order.`;

  useEffect(() => {
    dispatch(deleteUserOrder());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) setPage(1);
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && userOrder.length > 0 && currentPage === '1') {
      dispatch(getOrderCount());
    }
  }, [currentPage, dispatch, isLoggedIn, userOrder.length]);

  useEffect(() => {
    !userOrderEnd && isIntersecting && setPage(prev => prev + 1);
  }, [isIntersecting, userOrderEnd]);

  useEffect(() => {
    isLoggedIn ? setSearchParams({ page }) : setSearchParams('');
  }, [isLoggedIn, page, setSearchParams, userOrder.length]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserOrder(currentPage));
    }
  }, [currentPage, dispatch, isLoggedIn]);

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
      {isLoggedIn || isRefreshing || isLoading ? (
        <>
          {userOrder.length > 0 ? (
            <>
              <HistoryCardRender
                func={target => setTarget(target)}
                userOrder={userOrder}
                orderLoading={orderLoading}
              />
              <HistoryRightSideBar orderCount={orderCount} />
            </>
          ) : (
            <>
              {orderLoading ? (
                <div className={s.order_loading}>Loading...</div>
              ) : (
                <NoContentHistory textContent={authorizedText} />
              )}
            </>
          )}
        </>
      ) : (
        <NoContentHistory textContent={unauthorizedText} />
      )}
    </section>
  );
};
