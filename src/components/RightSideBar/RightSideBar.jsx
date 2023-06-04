import s from './RightSideBar.module.css';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { arrayOfSmallCards } from 'recipes-3';
import { useAuth } from 'components/hooks/useAuth';
import { CircularProgress } from '@mui/material';

export const RightSideBar = () => {
  const [orderOption, setOrderOption] = useState('dineIn');
  const [customerName, setCustomerName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');

  const { isLoggedIn, user, isRefreshing } = useAuth();
  const { avatarUrl, name } = user;

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
        {isLoggedIn ? (
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
        {arrayOfSmallCards.map(item => (
          <li key={item._id.$oid} className={s.orderOption_card}>
            <img
              className={s.orderOption_detail_img}
              src={item.preview}
              alt={item.title}
            ></img>
            <div className={s.orderOption_detail_change}>
              <div>
                <p className={s.orderOption_detail_food_name}>{item.title}</p>
                <div className={s.orderOption_detail_sup_change}>
                  <div className={s.orderOption_detail_sub_change}>
                    <p className={s.orderOption_detail_food_price}>Price</p>
                    <p className={s.orderOption_detail_food_price_cost}>
                      $ {item.time}
                    </p>
                  </div>
                  <div className={s.orderOption_detail_change}>
                    <button className={s.orderOption_detail_change_btn}>
                      <AiFillMinusCircle
                        className={`${s.orderOption_detail_change_icon} ${s.orderOption_detail_change_icon_minus}`}
                      />
                    </button>
                    <p>1</p>
                    <button className={s.orderOption_detail_change_btn}>
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
      </ul>
      <ul className={s.orderOption_pay}>
        <li className={s.orderOption_pay_Text}>
          <p className={s.pay_text}>Total</p>
          <p className={`${s.pay_text} ${s.pay_textPrice}`}>$ 62.13</p>
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
