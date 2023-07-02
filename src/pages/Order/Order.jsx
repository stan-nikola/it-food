import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { getLastOrder } from 'redux/order/operations';
import s from './Order.module.css';

export const Order = () => {
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
    (acc, { price }) => acc + Number(price),
    0
  );

  return (
    <section className={s.orderContainer}>
      {lastOrder && (
        <>
          <div className={s.orderDetails}>
            <div className={s.orderDetailsData}>
              <div>
                <h1 className={s.orderDetailTitle}>Order details</h1>
                <p>
                  <span className={s.orderOption}>
                    {option === 'dinein' ? 'dine in' : option}
                  </span>
                </p>
              </div>
              <div>
                <p>Date: {createdAt.slice(0, 10)}</p>
                <p># {orderNumber}</p>
              </div>
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
                Total: $ <span>{totalPrice.toFixed(2)}</span>{' '}
              </p>
            </div>
          </div>
          <div>AAAAAAAAAAAAA</div>
        </>
      )}
    </section>
  );
};
