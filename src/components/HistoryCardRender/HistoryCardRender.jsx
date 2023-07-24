import { useEffect, useRef } from 'react';
import s from './HistoryCardRender.module.css';

import { HistoryCardRenderItems } from './HistoryCardRenderItems';

export const HistoryCardRender = ({ userOrder, func, orderLoading }) => {
  const target = useRef();

  useEffect(() => {
    func(target.current.lastChild);
  }, [func]);

  return (
    <>
      <ul ref={target} className={s.order_card_wrapper}>
        {userOrder.map(item => (
          <HistoryCardRenderItems key={item._id} props={item} />
        ))}
      </ul>
    </>
  );
};
