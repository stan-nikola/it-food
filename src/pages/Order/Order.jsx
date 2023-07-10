import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { deleteOrder, getLastOrder } from 'redux/order/operations';
import s from './Order.module.css';
import {
  AiOutlineDelete,
  AiOutlineMail,
  AiOutlineCheck,
  AiOutlinePercentage,
} from 'react-icons/ai';
import { ReactComponent as Cash } from '../../images/svg/cash.svg';
import { ReactComponent as MasterCard } from '../../images/svg/master-card.svg';
import { ReactComponent as Visa } from '../../images/svg/Visa.svg';
import { ReactComponent as Gift } from '../../images/svg/giftCard.svg';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'components/Modal/Modal';

export const Order = () => {
  const [paymentButton, setPaymentButton] = useState('cash');
  const [tipAmount, setTipAmount] = useState(10);
  const [isTipChangeShow, setIsTipChangeShow] = useState(false);

  const { user, isLoggedIn } = useAuth();
  const { lastOrder, isOrderDeleted } = useOrder();

  const { phone } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (phone || isLoggedIn) &&
      dispatch(getLastOrder(isLoggedIn ? null : { phone }));
  }, [dispatch, isLoggedIn, phone]);

  useEffect(() => {
    if (isOrderDeleted) {
      navigate('/home');
    }
  }, [isOrderDeleted, navigate]);

  const { orderNumber, orderedDish, note, option, createdAt, _id } =
    lastOrder || {};

  const totalPrice = orderedDish?.reduce(
    (acc, { price, quantity }) => acc + Number(price * quantity),
    0
  );

  const handlePaymentChange = e => {
    setPaymentButton(e.currentTarget.id);
  };

  const handleDeleteOrder = () => {
    dispatch(deleteOrder({ _id }));
  };

  const modalToggle = () => () => setIsTipChangeShow(prev => !prev);

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
                <p>{note ? note : 'you left no notes for this order'}</p>
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
                Tip amount 10%
                <span>$ {(totalPrice / tipAmount).toFixed(2)}</span>
              </p>
              <p>
                Total amount
                <span>
                  $ {(totalPrice + (totalPrice / 100) * tipAmount).toFixed(2)}
                </span>
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
              <ul className={s.order_payment_other_wrapper}>
                <li>
                  <button
                    onClick={() => setIsTipChangeShow(prev => !prev)}
                    className={s.order_payment_other_btn}
                  >
                    <AiOutlinePercentage />
                    <p>Tip amount</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handlePaymentChange}
                    className={s.order_payment_other_btn}
                  >
                    <AiOutlineMail />
                    <p>Email</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleDeleteOrder}
                    className={`${s.order_payment_other_btn} ${s.order_payment_delete_btn}`}
                  >
                    <AiOutlineDelete />
                    <p>Delete order</p>
                  </button>
                </li>
                <li>
                  <button
                    // onClick={handlePaymentChange}
                    className={`${s.order_payment_other_btn} ${s.order_payment_done_btn}`}
                  >
                    <AiOutlineCheck />
                    <p>Done</p>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {isTipChangeShow && (
        <Modal modalToggle={modalToggle} styles={s}>
          <div className={s.add_note}>
            <h1 className={s.add_note_title}>TIP CHANGE</h1>

            <p className={s.add_note_subTitle}>You can change tip amount</p>

            <form className={s.signIn_form}>
              <label htmlFor="note">
                <input
                  className={s.add_note_subTitle_field}
                  placeholder="add you note..."
                  name="tipChange"
                  type="number"
                  value={tipAmount}
                  onChange={e => setTipAmount(e.target.value)}
                />
              </label>
            </form>
            <button className={s.add_note_btn} onClick={null} id="tipChange">
              OK
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};
