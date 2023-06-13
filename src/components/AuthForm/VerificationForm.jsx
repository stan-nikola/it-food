import { useDispatch } from 'react-redux';
import s from './AuthForm.module.css';
import { verification } from 'redux/auth/operations';
import { useAuth } from 'components/hooks/useAuth';
import { useState } from 'react';

export const VerificationForm = ({ modalToggle }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const dispatch = useDispatch();

  const { user } = useAuth();

  const { email: savedEmail } = user;

  const handleVerification = () => {
    dispatch(verification({ email: savedEmail, verificationCode }));
    modalToggle();
  };
  return (
    <div>
      <p className={s.signIn_subTitle}>
        For verification, enter the code that was sent to:
        <span> {savedEmail}</span>
      </p>

      <form className={s.signIn_form}>
        <input
          placeholder="Code"
          className={s.signIn_name}
          // type="te"
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
  );
};
