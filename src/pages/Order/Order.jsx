import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  confirmOrder,
  deleteOrder,
  getLastOrder,
} from 'redux/order/operations';
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

import { orderToast } from 'constants/toastConfig';
import { toast } from 'react-toastify';
import { deleteAllDishes } from 'redux/order/orderSlice';
import { refreshUser } from 'redux/auth/operations';

export const Order = () => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [tipAmount, setTipAmount] = useState(5);
  const [isTipChangeShow, setIsTipChangeShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const { user, isLoggedIn } = useAuth();
  const { lastOrder, orderLoading } = useOrder();

  const { phone, email } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (phone || isLoggedIn) &&
      dispatch(getLastOrder(isLoggedIn ? null : { phone }));
  }, [dispatch, isLoggedIn, phone]);

  useEffect(() => {
    if (!lastOrder && !orderLoading) {
      toast.success(toastMessage, orderToast);
      setTimeout(() => {
        navigate('/home');
        dispatch(refreshUser());
      }, 10);
    }
  }, [dispatch, lastOrder, navigate, orderLoading, toastMessage]);

  useEffect(() => {
    if (orderConfirmed && !lastOrder) {
      dispatch(deleteAllDishes());
    }
  }, [dispatch, lastOrder, orderConfirmed]);

  const { orderNumber, orderedDish, note, option, createdAt, _id } =
    lastOrder || {};
  console.log('Order => option:', option);

  const totalPrice = orderedDish?.reduce(
    (acc, { price, quantity }) => acc + Number(price * quantity),
    0
  );

  const handlePaymentChange = e => {
    setPaymentMethod(e.currentTarget.id);
  };

  const handleDeleteOrder = () => {
    dispatch(deleteOrder({ _id }));
    setToastMessage('Order successfully deleted!');
  };

  const modalToggle = () => setIsTipChangeShow(prev => !prev);

  const handleConfirmOrder = () => {
    dispatch(
      confirmOrder({ _id: lastOrder._id, paymentMethod, tipAmount, email })
    );
    setOrderConfirmed(prev => !prev);
    setToastMessage(
      'Thank you! Order successfully confirmed! We will contact you soon '
    );
  };

  const calculatedGiftCoin = (
    ((totalPrice * 0.03 * tipAmount) / 10) *
    100
  ).toFixed(0);

  return (
    <section className={s.orderContainer}>
      {lastOrder && (
        <>
          <div className={s.orderDetails}>
            <div className={s.orderDetailsData}>
              <h1 className={s.orderDetailTitle}>Order details</h1>
              <p>
                <span
                  className={`${s.orderOption} ${
                    (option === 'dinein' && s.orderOption_dineIn) ||
                    (option === 'delivery' && s.orderOption_delivery) ||
                    (option === 'pickup' && s.orderOption_pickup)
                  }`}
                >
                  {option === 'dinein' ? 'dine in' : option}
                </span>
              </p>
            </div>

            <ul className={s.orderOption_detail}>
              {orderedDish.map(
                ({ _id, id, preview, title, price, quantity }) => (
                  <li key={_id || id} className={s.orderOption_card}>
                    <img
                      className={s.orderOption_detail_img}
                      src={preview}
                      alt={title}
                    ></img>
                    <div className={s.orderOption_detail_change}>
                      <div>
                        <p className={s.orderOption_detail_food_name}>
                          {title}
                        </p>
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
                )
              )}
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
                Tip amount {tipAmount}%
                <span>$ {((totalPrice / 100) * tipAmount).toFixed(2)}</span>
              </p>
              <p>
                Gift Coins
                <span> {calculatedGiftCoin}</span>
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
                      paymentMethod === 'cash' && s.payment_button_active
                    }`}
                  >
                    <Cash />
                  </button>
                </li>
                <li>
                  <button
                    id="mastercard"
                    onClick={handlePaymentChange}
                    className={`${s.order_payment_method_btn} ${
                      paymentMethod === 'mastercard' && s.payment_button_active
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
                      paymentMethod === 'visa' && s.payment_button_active
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
                      paymentMethod === 'gift' && s.payment_button_active
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
                    onClick={handleConfirmOrder}
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
          <div className={s.change_tip}>
            <h1 className={s.change_tip_title}>TIP CHANGE</h1>

            <p className={s.change_tip_subTitle}>You can change tip amount</p>

            <form className={s.signIn_form}>
              <label htmlFor="tipChange">
                <input
                  className={s.change_tip_input}
                  name="tipChange"
                  type="number"
                  value={tipAmount}
                  onChange={e =>
                    setTipAmount(
                      e.target.value > 0 && e.target.value < 31
                        ? e.target.value
                        : 0
                    )
                  }
                />
              </label>
            </form>
            <button
              className={s.change_tip_btn}
              onClick={modalToggle}
              id="tipChange"
            >
              OK
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};
