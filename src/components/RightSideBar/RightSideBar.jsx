import s from './RightSideBar.module.css';
import 'react-phone-input-2/lib/style.css';
import { useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

import { useAuth } from 'components/hooks/useAuth';
import { CircularProgress } from '@mui/material';
import { useDish } from 'components/hooks/useDish';
import { useOrder } from 'components/hooks/useOrder';
import { useDispatch } from 'react-redux';
import {
  decrementDishQuantity,
  incrementDishQuantity,
} from 'redux/order/orderSlice';

export const RightSideBar = () => {
  const [orderOption, setOrderOption] = useState('dineIn');
  const [customerName, setCustomerName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');

  const dispatch = useDispatch();

  const { isLoggedIn, user, isRefreshing } = useAuth();
  const { avatarUrl, name } = user;

  const { dish } = useDish();

  const { main, meat, dessert } = dish;

  const { orderedDish } = useOrder();

  const dishFilter = orderedDish.map(item => item.id);

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

  // const handleSubmit = e => {
  //   console.log(customerPhoneNumber);
  //   console.log(e);
  // };

  return (
    <section className={s.container}>
      <div className={s.orderOption}>
        <ul className={s.orderOption_list}>
          <li className={s.orderOption_item}>
            <button
              onClick={handleOrderOptionChange}
              className={`${s.orderOption_button} ${
                orderOption === 'dineIn' && s.orderOption_button_active
              }`}
              value="dineIn"
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
        <p className={s.orderOption_text}>Customer information</p>
        {isLoggedIn || isRefreshing ? (
          <>
            {isRefreshing ? (
              <CircularProgress className={s.header__nav_item} />
            ) : (
              <div className={s.orderOption_user}>
                <img
                  className={s.orderOption_userAvatar}
                  src={avatarUrl}
                  alt="user avatar"
                />
                <p className={s.orderOption_userName}>{name}</p>
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
              value={customerPhoneNumber}
              onChange={e => setCustomerPhoneNumber(e)}
            />
          </form>
        )}
        <button className={s.orderOption_addNote_btn} type="button">
          Add note
        </button>
      </div>
      <ul className={s.orderOption_detail}>
        <li>
          <p className={s.orderOption_text}>Orders details</p>
        </li>
        {filteredDish.map(({ _id, preview, title, price, quantity }) => {
          const quantityPrice = Number((quantity * price).toFixed(2));

          return (
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
                      <p className={s.orderOption_detail_food_price}>Price</p>
                      <p className={s.orderOption_detail_food_price_cost}>
                        $ {quantityPrice}
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
          );
        })}
      </ul>
      <ul className={s.orderOption_pay}>
        <li className={s.orderOption_pay_Text}>
          <p className={s.pay_text}>Total</p>
          <p className={`${s.pay_text} ${s.pay_textPrice}`}>$ {totalPrice}</p>
        </li>
        <li>
          <button
            type="button"
            className={`${s.orderOption_pay_btn} ${s.pay_btn}`}
          >
            Pay Now
          </button>
        </li>
      </ul>
    </section>
  );
};
