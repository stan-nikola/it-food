import { useDispatch } from 'react-redux';
import s from './History.module.css';
import { useEffect, useState } from 'react';
import { getUserOrder } from 'redux/order/operations';
import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';

import { HistoryCardRender } from './../../components/HistoryCardRender/HistoryCardRender';
import { HistoryRightSideBar } from 'components/HistoryRightSideBar/HistoryRightSideBar';
import { useSearchParams } from 'react-router-dom';
import { deleteUserOrder } from 'redux/order/orderSlice';

export const History = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const [page, setPage] = useState(1);

  const [target, setTarget] = useState(null);

  const dispatch = useDispatch();

  const { isLoggedIn } = useAuth();
  const currentPage = searchParams.get('page');

  const { userOrder, userOrderEnd } = useOrder();

  useEffect(() => {
    dispatch(deleteUserOrder());
  }, [dispatch]);

  useEffect(() => {
    !userOrderEnd && isIntersecting && setPage(prev => prev + 1);
  }, [isIntersecting, userOrderEnd]);

  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams]);

  // const res = axios.get(`/order/history?page=1`).then(e => console.log(e.data));

  // console.log('History => res:', res);

  useEffect(() => {
    isLoggedIn && dispatch(getUserOrder(currentPage));
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
      <HistoryCardRender
        func={target => setTarget(target)}
        userOrder={userOrder}
      />
      <HistoryRightSideBar userOrder={userOrder} />
    </section>
  );
};
