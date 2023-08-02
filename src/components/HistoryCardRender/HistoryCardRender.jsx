import { useEffect, useRef } from 'react';
import s from './HistoryCardRender.module.css';

import { HistoryCardRenderItems } from './HistoryCardRenderItems';
import ScrollContainer from 'react-indiana-drag-scroll';

export const HistoryCardRender = ({ userOrder, func, orderLoading }) => {
  const target = useRef();

  useEffect(() => {
    func(target.current.lastChild);
  }, [func]);

  return (
    <>
      <ScrollContainer
        hideScrollbars={false}
        horizontal={false}
        component="ul"
        innerRef={target}
        className={s.order_card_wrapper}
        draggingClassName={s.order_card_wrapper_isGrab}
      >
        {userOrder.map(item => (
          <HistoryCardRenderItems key={item._id} props={item} />
        ))}
      </ScrollContainer>
    </>
  );
};
