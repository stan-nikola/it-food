import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import s from './Order.module.css';

import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';

import {
  confirmOrder,
  deleteOrder,
  getByIdAndPhone,
  getOrderById,
} from 'redux/order/operations';

import { addOrderError } from 'redux/order/orderSlice';
import { refreshUser } from 'redux/auth/operations';

import { toast } from 'react-toastify';

import {
  AiOutlineDelete,
  AiOutlineMail,
  AiOutlineCheck,
  AiOutlinePercentage,
} from 'react-icons/ai';

import { mainToast, orderToast } from 'constants/toastConfig';

import { Cash, Gift, MasterCard, Visa } from 'images';
import { Modal } from 'components/Modal';

export const Order = () => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [tipAmount, setTipAmount] = useState(5);
  const [isTipChangeShow, setIsTipChangeShow] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const { user, isLoggedIn } = useAuth();
  const { lastOrder, orderLoading, orderError } = useOrder();

  const { phone, email } = user;

  const { orderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentOrderId(prev => prev !== orderId && orderId);
  }, [orderId]);

  useEffect(() => {
    if (phone && !isLoggedIn && orderId !== 'last') {
      dispatch(getByIdAndPhone({ phone, _id: orderId }));
    }
  }, [currentOrderId, dispatch, isLoggedIn, orderId, phone]);

  useEffect(() => {
    if (isLoggedIn && orderId !== 'last') {
      dispatch(getOrderById({ orderId }));
    }
  }, [dispatch, isLoggedIn, orderId, phone]);

  useEffect(() => {
    if (toastMessage && !orderLoading) {
      toast.success(toastMessage, orderToast);
      setTimeout(() => {
        navigate('/home');
        dispatch(refreshUser());
      }, 10);
    }
  }, [dispatch, navigate, orderLoading, toastMessage]);

  useEffect(() => {
    if (orderError) {
      setTimeout(() => {
        navigate('/home');
      }, 10);

      toast.error(orderError, mainToast);
      dispatch(addOrderError(null));
    }
  }, [dispatch, navigate, orderError]);

  const { orderNumber, orderedDish, note, option, createdAt, _id } =
    lastOrder || {};

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

    setToastMessage(
      'Thank you! Order successfully confirmed! We will contact you soon '
    );
  };

  const calculatedGiftCoin =
    isLoggedIn && (((totalPrice * 0.03 * tipAmount) / 10) * 100).toFixed(0);

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
              {isLoggedIn && (
                <p>
                  Gift Coins
                  <span> {calculatedGiftCoin}</span>
                </p>
              )}
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
