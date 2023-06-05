import { useState } from 'react';

import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';

export const LogInForm = ({ modalToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPass, setShowForgotPass] = useState(false);
  const dispatch = useDispatch();

  const handleLogIn = () => {
    dispatch(logIn({ email, password }));
    modalToggle();
  };

  const handForgotPass = () => {
    dispatch(logIn({ email }));
    modalToggle();
  };

  return (
    <div className={s.signIn}>
      <div className={s.signIn_logo}>
        <LogoIcon />
        <p className={s.signIn_logoText}>IT FOOD</p>
      </div>
      {!showForgotPass ? (
        <h1 className={s.signIn_title}>LOG IN</h1>
      ) : (
        <h1 className={s.signIn_title}>FORGOT PASSWORD?</h1>
      )}
      {!showForgotPass ? (
        <p className={s.signIn_subTitle}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          incidunt facere laborum!
        </p>
      ) : (
        <p className={s.signIn_subTitle}>
          Enter your email and click get password. Instructions will be sent to
          your inbox.
        </p>
      )}
      <form className={s.signIn_form}>
        <input
          placeholder="Email"
          className={s.signIn_name}
          type="email"
          name="customerEmail"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        {!showForgotPass && (
          <input
            placeholder="Password"
            className={s.signIn_name}
            type="password"
            name="customerPassword"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        )}
      </form>
      {!showForgotPass ? (
        <button onClick={handleLogIn} className={s.signIn_btn} type="button">
          LOG IN
        </button>
      ) : (
        <button onClick={handForgotPass} className={s.signIn_btn} type="button">
          GET NEW PASSWORD
        </button>
      )}
      {!showForgotPass && (
        <button
          onClick={() => setShowForgotPass(prev => !prev)}
          className={s.forgot_pass_btn}
          type="button"
        >
          Forgot password?
        </button>
      )}
    </div>
  );
};
