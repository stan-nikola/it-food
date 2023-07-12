import { useDispatch } from 'react-redux';
import s from './History.module.css';
import { useEffect } from 'react';
import { getUserOrder } from 'redux/order/operations';
import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';
import { AiOutlineCalendar } from 'react-icons/ai';

import { ReactComponent as Cash } from '../../images/svg/cash.svg';
import { ReactComponent as MasterCard } from '../../images/svg/master-card.svg';
import { ReactComponent as Visa } from '../../images/svg/Visa.svg';
import { ReactComponent as Gift } from '../../images/svg/giftCard.svg';

export const History = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useAuth();

  const { userOrder } = useOrder();

  useEffect(() => {
    isLoggedIn && dispatch(getUserOrder());
  }, [dispatch, isLoggedIn]);

  return (
    <section className={s.homeContainer}>
      <ul className={s.order_card_wrapper}>
        {userOrder.map(
          ({
            _id,
            giftCoin,
            note,
            option,
            orderNumber,
            orderedDish,
            paymentMethod,
            tipAmount,
            totalWithTipsPrice,
            updatedAt,
          }) => (
            <li key={_id} className={s.order_card}>
              <div className={s.order_date_wrapper}>
                <p className={s.order_date}>
                  <span>
                    <AiOutlineCalendar />
                  </span>
                  {updatedAt.slice(0, 10)}
                </p>
                <p className={s.order_date}>
                  <span>#</span>
                  {orderNumber}
                </p>
              </div>
              <div className={s.order_item}>
                <p className={s.order_item_title}> Option</p>
                <p className={s.order_option}>
                  <span>{option}</span>
                </p>
              </div>

              <div className={s.order_item}>
                <p className={s.order_item_title}>Payment</p>
                {paymentMethod === 'cash' && <Cash />}
                {paymentMethod === 'mastercard' && <MasterCard />}
                {paymentMethod === 'visa' && <Visa />}
                {paymentMethod === 'gift' && <Gift />}
              </div>
            </li>
          )
        )}
      </ul>
      <div>aaaaaaaaaa</div>
    </section>
  );
};
