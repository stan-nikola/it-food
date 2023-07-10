import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import s from './RightSideBar.module.css';
import 'react-phone-input-2/lib/style.css';
import { CircularProgress } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

import { useAuth } from 'components/hooks/useAuth';
import { useDish } from 'components/hooks/useDish';
import { useOrder } from 'components/hooks/useOrder';
import { Modal } from '../Modal/Modal';
import {
  addOrderError,
  decrementDishQuantity,
  incrementDishQuantity,
} from 'redux/order/orderSlice';
import { addOrder } from 'redux/order/operations';
import { toast } from 'react-toastify';
import { mainToast } from 'constants/toastConfig';
import { useNavigate } from 'react-router-dom';
import { setPhone } from 'redux/auth/authSlice';

export const RightSideBar = () => {
  const [orderOption, setOrderOption] = useState('dinein');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [noteText, setNoteText] = useState('');
  const [addNoteShow, setAddNoteShow] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoggedIn, user, isRefreshing } = useAuth();
  const { avatarUrl, name } = user;

  const { dish } = useDish();
  const { orderedDish, orderError, orderLoading, isOrderAdded } = useOrder();

  const { main, meat, dessert } = dish;

  const dishFilter = orderedDish.map(item => item.id);

  useEffect(() => {
    orderError && toast.error(orderError, mainToast);
    dispatch(addOrderError(null));
  }, [dispatch, orderError]);

  useEffect(() => {
    if (isOrderAdded) {
      navigate('/order');
    }
  }, [isOrderAdded, navigate]);

  const filteredDish = useMemo(() => {
    const allDishes = [...main, ...meat, ...dessert];

    const filteredByOrderId = allDishes.filter(item =>
      dishFilter.includes(item._id)
    );

    return filteredByOrderId.map(i1 => ({
      ...i1,
      ...orderedDish.find(i2 => i2.id === i1._id),
    }));
  }, [dessert, dishFilter, main, meat, orderedDish]);

  const totalPrice = filteredDish
    .reduce((acc, { price, quantity }) => {
      return acc + Number(price) * quantity;
    }, 0)
    .toFixed(2);

  const handleOrderOptionChange = e => {
    setOrderOption(e.target.value);
  };

  const modalToggle = () => {
    setAddNoteShow(prev => !prev);
  };

  const handleSubmit = () => {
    dispatch(
      addOrder({
        customerName: isLoggedIn ? '' : customerName,
        note: noteText,
        option: orderOption,
        orderedDish,
        phone: isLoggedIn ? '' : customerPhone,
      })
    );
    !isLoggedIn && dispatch(setPhone(customerPhone));
  };

  return (
    <section className={s.container}>
      <div className={s.orderOption}>
        <p className={s.orderOption_text}>Customer information</p>
        {isLoggedIn || isRefreshing ? (
          <>
            {isRefreshing ? (
              <CircularProgress />
            ) : (
              <div className={s.orderOption_user}>
                <img
                  className={s.orderOption_userAvatar}
                  src={avatarUrl}
                  alt="user avatar"
                />
                <div>
                  <p className={s.orderOption_userName}>{name}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <form>
            <input
              placeholder="Customer name"
              className={s.orderOption_name}
              type="text"
              name="customerName"
              onChange={e => setCustomerName(e.target.value)}
              value={customerName}
            />
            <PhoneInput
              className={s.orderOption_phone}
              inputClass={s.orderOption_phone_input}
              buttonClass={s.orderOption_phone_flag}
              isValid={value => {
                if (value.length < 12) {
                  return;
                } else {
                  return true;
                }
              }}
              type="phone"
              country={'ua'}
              value={customerPhone}
              onChange={e => setCustomerPhone(e)}
            />
          </form>
        )}
        <ul className={s.orderOption_list}>
          <li className={s.orderOption_item}>
            <button
              onClick={handleOrderOptionChange}
              className={`${s.orderOption_button} ${
                orderOption === 'dinein' && s.orderOption_button_active
              }`}
              value="dinein"
            >
              Dine In
            </button>
          </li>
          <li className={s.orderOption_item}>
            <button
              onClick={handleOrderOptionChange}
              className={`${s.orderOption_button} ${
                orderOption === 'delivery' && s.orderOption_button_active
              }`}
              value="delivery"
            >
              Delivery
            </button>
          </li>
          <li className={s.orderOption_item}>
            <button
              onClick={handleOrderOptionChange}
              className={`${s.orderOption_button} ${
                orderOption === 'pickup' && s.orderOption_button_active
              }`}
              value="pickup"
            >
              Pickup
            </button>
          </li>
        </ul>
        <button
          onClick={modalToggle}
          className={s.orderOption_addNote_btn}
          type="button"
        >
          Add note
        </button>
      </div>
      {filteredDish.length > 0 ? (
        <ul className={s.orderOption_detail}>
          <li>
            <p className={s.orderOption_text}>Orders details</p>
          </li>
          <>
            {filteredDish.map(({ _id, preview, title, price, quantity }) => (
              <li key={_id} className={s.orderOption_card}>
                <img
                  className={s.orderOption_detail_img}
                  src={preview}
                  alt={title}
                />

                <div className={s.orderOption_detail_change}>
                  <div>
                    <p className={s.orderOption_detail_food_name}>{title}</p>
                    <div className={s.orderOption_detail_sup_change}>
                      <div className={s.orderOption_detail_sub_change}>
                        <p className={s.orderOption_detail_food_price}>Price</p>
                        <p className={s.orderOption_detail_food_price_cost}>
                          $ {(quantity * price).toFixed(2)}
                        </p>
                      </div>
                      <div className={s.orderOption_detail_change}>
                        <button
                          onClick={() => dispatch(decrementDishQuantity(_id))}
                          className={s.orderOption_detail_change_btn}
                        >
                          <AiFillMinusCircle
                            className={`${s.orderOption_detail_change_icon} ${s.orderOption_detail_change_icon_minus}`}
                          />
                        </button>
                        <p className={s.orderOption_detail_quantity}>
                          {quantity}
                        </p>
                        <button
                          disabled={quantity >= 10}
                          onClick={() => dispatch(incrementDishQuantity(_id))}
                          className={s.orderOption_detail_change_btn}
                        >
                          <AiFillPlusCircle
                            className={`${s.orderOption_detail_change_icon} ${s.orderOption_detail_change_icon_plus}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </>
        </ul>
      ) : (
        <p className={s.orderOption_placeholder}>
          To order a dish, click the Order Now button
        </p>
      )}
      <ul className={s.orderOption_pay}>
        <li className={s.orderOption_pay_Text}>
          <p className={s.pay_text}>Total</p>
          <p className={`${s.pay_text} ${s.pay_textPrice}`}>$ {totalPrice}</p>
        </li>
        <li>
          <button
            type="button"
            disabled={
              orderLoading ||
              filteredDish.length === 0 ||
              (!isLoggedIn &&
                (customerName.length < 3 || customerPhone.length < 12))
            }
            className={`${s.orderOption_pay_btn} ${s.pay_btn}`}
            onClick={handleSubmit}
          >
            {orderLoading ? 'LOADING' : 'PAY NOW'}
          </button>
        </li>
      </ul>

      {addNoteShow && (
        <Modal modalToggle={modalToggle} styles={s}>
          <div className={s.add_note}>
            <h1 className={s.add_note_title}>NOTE</h1>

            <p className={s.add_note_subTitle}>
              You can add note to your order
            </p>

            <form className={s.signIn_form}>
              <label htmlFor="note">
                <textarea
                  className={s.add_note_subTitle_field}
                  placeholder="add you note..."
                  id="note"
                  name="note"
                  type="text"
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                />
                {noteText.length > 36 && (
                  <p className={s.add_note_form_error}>
                    Note must not exceed 36 characters
                  </p>
                )}
              </label>
            </form>
            <button
              disabled={noteText.length > 36}
              className={s.add_note_btn}
              onClick={modalToggle}
              id="addNote"
            >
              ADD NOTE
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};
