import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';
import { useDispatch } from 'react-redux';
import { signUp, verification } from 'redux/auth/operations';
import { useAuth } from 'components/hooks/useAuth';

export const SignUpForm = ({ modalToggle }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const { user } = useAuth();

  const { email: savedEmail } = user;

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      signUp({
        name,
        phone,
        email,
        password,
      })
    );
    setShowVerification(prev => !prev);
  };

  const handleVerification = () => {
    dispatch(verification({ email: savedEmail, verificationCode }));
    modalToggle();
  };

  return (
    <div className={s.signIn}>
      <div className={s.signIn_logo}>
        <LogoIcon />
        <p className={s.signIn_logoText}>IT FOOD</p>
      </div>
      <h1 className={s.signIn_title}>SIGN UP</h1>

      {showVerification || user.email ? (
        <div>
          <p className={s.signIn_subTitle}>
            For verification, enter the four-digit code sent to your email :
            <span> {savedEmail}</span>
          </p>
          <form className={s.signIn_form}>
            <input
              placeholder=" 4 digits code"
              className={s.signIn_name}
              type="number"
              name="vilificationCode"
              onChange={e => setVerificationCode(e.target.value)}
              value={verificationCode}
            />
            <button
              onClick={handleVerification}
              className={s.signIn_btn}
              type="button"
            >
              SIGN UP
            </button>
          </form>
        </div>
      ) : (
        <div>
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
              onChange={e => setName(e.target.value)}
              value={name}
            />
            <input
              placeholder="Email"
              className={s.signIn_name}
              type="email"
              name="customerEmail"
              onChange={e => setEmail(e.target.value)}
              value={email}
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
              value={phone}
              onChange={e => setPhone(e)}
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
            SIGN UP
          </button>
        </div>
      )}
    </div>
  );
};
