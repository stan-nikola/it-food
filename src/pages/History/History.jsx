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
import { OrderedDishesAccordion } from 'components/OrderedDishesAccordion/OrderedDishesAccordion';

export const History = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useAuth();

  const { userOrder } = useOrder();

  useEffect(() => {
    isLoggedIn && dispatch(getUserOrder());
  }, [dispatch, isLoggedIn]);

  return (
    <section className={s.historyContainer}>
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
                <p
                  className={`${s.order_option} ${
                    (option === 'dinein' && s.orderOption_dineIn) ||
                    (option === 'delivery' && s.orderOption_delivery) ||
                    (option === 'pickup' && s.orderOption_pickup)
                  }`}
                >
                  <span>{option}</span>
                </p>
              </div>

              <div className={s.order_item}>
                <p className={s.order_item_title}>Payment</p>
                {paymentMethod === 'cash' && (
                  <Cash className={s.order_item_title_icon} />
                )}
                {paymentMethod === 'mastercard' && <MasterCard />}
                {paymentMethod === 'visa' && (
                  <Visa className={s.order_item_title_icon} />
                )}
                {paymentMethod === 'gift' && (
                  <Gift className={s.order_item_title_icon} />
                )}
              </div>
              <div className={s.order_item}>
                <p className={s.order_item_title}>Tips</p>
                <p className={s.order_item_value}>{tipAmount}%</p>
              </div>
              <div className={s.order_item}>
                <OrderedDishesAccordion orderedDish={orderedDish} />
              </div>
            </li>
          )
        )}
      </ul>
      <div>aaaaaaaaaa</div>
    </section>
  );
};
