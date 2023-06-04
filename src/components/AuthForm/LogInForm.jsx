import { useState } from 'react';

import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';

export const LogInForm = ({ modalToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(logIn({ email, password }));
    modalToggle();
  };

  return (
    <div className={s.signIn}>
      <div className={s.signIn_logo}>
        <LogoIcon />
        <p className={s.signIn_logoText}>IT FOOD</p>
      </div>
      <h1 className={s.signIn_title}>LOG IN</h1>
      <p className={s.signIn_subTitle}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
        incidunt facere laborum!
      </p>
      <form className={s.signIn_form}>
        <input
          placeholder="Email"
          className={s.signIn_name}
          type="email"
          name="customerEmail"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <input
          placeholder="Password"
          className={s.signIn_name}
          type="password"
          name="customerPassword"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </form>
      <button onClick={handleSubmit} className={s.signIn_btn} type="button">
        LOG IN
      </button>
    </div>
  );
};
