import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';

export const SignInForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');

  return (
    <div className={s.signIn}>
      <div className={s.signIn_logo}>
        <LogoIcon />
        <p className={s.signIn_logoText}>IT FOOD</p>
      </div>
      <h1 className={s.signIn_title}>SIGN IN</h1>
      <p className={s.signIn_subTitle}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
        incidunt facere laborum!
      </p>
      <form className={s.signIn_form}>
        <input
          placeholder="Name"
          className={s.signIn_name}
          type="text"
          name="customerName"
          onChange={e => setCustomerName(e.target.value)}
          value={customerName}
        />
        <input
          placeholder="Email"
          className={s.signIn_name}
          type="email"
          name="customerEmail"
          onChange={e => setCustomerEmail(e.target.value)}
          value={customerEmail}
        />

        <PhoneInput
          className={s.signIn_phone}
          inputClass={s.signIn_phone_input}
          buttonClass={s.signIn_phone_flag}
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
        <input
          placeholder="Password"
          className={s.signIn_name}
          type="password"
          name="customerPassword"
          onChange={e => setCustomerPassword(e.target.value)}
          value={customerPassword}
        />
      </form>
      <button className={s.signIn_btn} type="button">
        SIGN IN
      </button>
    </div>
  );
};
