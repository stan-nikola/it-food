import s from './RightSideBar.module.css';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

export const RightSideBar = () => {
  const [, setOrderOption] = useState('dineIn');
  const [customerName, setCustomerName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');

  const [active, setActive] = useState(null);

  const handleOrderOptionChange = e => {
    setOrderOption(e.target.value);
    setActive(e.target.value);
  };

  // const handleSubmit = e => {
  //   console.log(customerPhoneNumber);
  //   console.log(e);
  // };

  return (
    <section className={s.container}>
      <div className={s.orderOption_wrapper}>
        <div className={s.orderOption}>
          <button
            onClick={handleOrderOptionChange}
            className={`${s.orderOption_button} ${
              active === 'dineIn' && s.orderOption_button_active
            }`}
            value="dineIn"
          >
            Dine In
          </button>
          <button
            onClick={handleOrderOptionChange}
            className={`${s.orderOption_button} ${
              active === 'delivery' && s.orderOption_button_active
            }`}
            value="delivery"
          >
            Delivery
          </button>
          <button
            onClick={handleOrderOptionChange}
            className={`${s.orderOption_button} ${
              active === 'pickup' && s.orderOption_button_active
            }`}
            value="pickup"
          >
            Pickup
          </button>
        </div>
        <p className={s.orderOption_text}>Customer information</p>
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
        <button className={s.orderOption_addNote_btn} type="button">
          Add note
        </button>
      </div>
      <div className={s.orderOption_detail}>
        <p className={s.orderOption_text}>Orders details</p>
        <div className={s.orderOption_card}>
          <img
            className={s.orderOption_detail_img}
            src="https://people.com/thmb/FuphaVojr0vzvu5gbDuxvar2qkM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/purple-carrot-buffalo-tempeh-quinoa-bowl-roasted-peppers-dill-sour-cream-8549bec1976a46fd8b6cd77fa82c68cd.jpg"
            alt="user meal"
          ></img>
          <div className={s.orderOption_detail_change}>
            <div>
              <p className={s.orderOption_detail_food_name}>Steak sapi bakar</p>
              <div className={s.orderOption_detail_sup_change}>
                <div className={s.orderOption_detail_sub_change}>
                  <p className={s.orderOption_detail_food_price}>Price</p>
                  <p className={s.orderOption_detail_food_price_cost}>
                    $ 25.26
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
        </div>
      </div>
    </section>
  );
};
