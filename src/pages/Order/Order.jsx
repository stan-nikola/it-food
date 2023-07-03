import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { getLastOrder } from 'redux/order/operations';
import s from './Order.module.css';
import { ReactComponent as Cash } from '../../images/svg/cash.svg';
import { ReactComponent as MasterCard } from '../../images/svg/master-card.svg';
import { ReactComponent as Visa } from '../../images/svg/Visa.svg';
import { ReactComponent as Gift } from '../../images/svg/giftCard.svg';

export const Order = () => {
  const [paymentButton, setPaymentButton] = useState('cash');

  const { user, isLoggedIn } = useAuth();
  const { lastOrder } = useOrder();

  const { phone } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    (phone || isLoggedIn) &&
      dispatch(getLastOrder(isLoggedIn ? null : { phone }));
  }, [dispatch, isLoggedIn, phone]);

  const { orderNumber, orderedDish, note, option, createdAt } = lastOrder || {};

  const totalPrice = orderedDish?.reduce(
    (acc, { price, quantity }) => acc + Number(price * quantity),
    0
  );

  const handlePaymentChange = e => {
    setPaymentButton(e.currentTarget.id);
  };

  return (
    <section className={s.orderContainer}>
      {lastOrder && (
        <>
          <div className={s.orderDetails}>
            <div className={s.orderDetailsData}>
              <h1 className={s.orderDetailTitle}>Order details</h1>
              <p>
                <span className={s.orderOption}>
                  {option === 'dinein' ? 'dine in' : option}
                </span>
              </p>
            </div>

            <ul className={s.orderOption_detail}>
              {orderedDish.map(({ _id, preview, title, price, quantity }) => (
                <li key={_id} className={s.orderOption_card}>
                  <img
                    className={s.orderOption_detail_img}
                    src={preview}
                    alt={title}
                  ></img>
                  <div className={s.orderOption_detail_change}>
                    <div>
                      <p className={s.orderOption_detail_food_name}>{title}</p>
                      <div className={s.orderOption_detail_sup_change}>
                        <div className={s.orderOption_detail_sub_change}>
                          <p className={s.orderOption_detail_food_price}>
                            Price
                          </p>
                          <p className={s.orderOption_detail_food_price_cost}>
                            $ {price}
                          </p>
                        </div>
                        <div className={s.orderOption_detail_sub_change}>
                          <p className={s.orderOption_detail_food_price}>
                            Quantity
                          </p>
                          <p className={s.orderOption_detail_food_price_cost}>
                            <span> {quantity}</span>
                          </p>
                        </div>
                        <div className={s.orderOption_detail_sub_change}>
                          <p className={s.orderOption_detail_food_price}>
                            Total
                          </p>
                          <p className={s.orderOption_detail_food_price_cost}>
                            $ {(quantity * price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className={s.orderOption_bottom}>
              <div className={s.orderOption_note}>
                Note
                <p>{note ? note : 'you left no notes for the order'}</p>
              </div>
              <p className={s.orderOption_total}>
                Total: <span>$ {totalPrice.toFixed(2)}</span>{' '}
              </p>
            </div>
          </div>
          <div className={s.order_payment}>
            <div className={s.order_payment_title}>
              <h1>Order payment</h1>
              <div className={s.order_payment_sub_title}>
                <p>Date: {createdAt.slice(0, 10)}</p>
                <p># {orderNumber}</p>
              </div>
            </div>
            <div className={s.order_payment_amount}>
              <p className={s.order_payment_amount_tip}>
                Tip amount 10%<span>$ {(totalPrice / 10).toFixed(2)}</span>
              </p>
              <p>
                Total amount<span>$ {(totalPrice * 1.1).toFixed(2)}</span>
              </p>
            </div>
            <div className={s.order_payment_method}>
              <p>Payment method</p>
              <ul className={s.order_payment_method_wrapper}>
                <li>
                  <button
                    id="cash"
                    onClick={handlePaymentChange}
                    className={`${s.order_payment_method_btn} ${
                      paymentButton === 'cash' && s.payment_button_active
                    }`}
                  >
                    <Cash />
                  </button>
                </li>
                <li>
                  <button
                    id="masterCard"
                    onClick={handlePaymentChange}
                    className={`${s.order_payment_method_btn} ${
                      paymentButton === 'masterCard' && s.payment_button_active
                    }`}
                  >
                    <MasterCard />
                  </button>
                </li>
                <li>
                  <button
                    id="visa"
                    onClick={handlePaymentChange}
                    className={`${s.order_payment_method_btn} ${
                      paymentButton === 'visa' && s.payment_button_active
                    }`}
                  >
                    <Visa />
                  </button>
                </li>
                <li>
                  <button
                    id="gift"
                    onClick={handlePaymentChange}
                    className={`${s.order_payment_method_btn} ${
                      paymentButton === 'gift' && s.payment_button_active
                    }`}
                  >
                    <Gift />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
