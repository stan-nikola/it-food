import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';

import { useAuth } from 'components/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';

export const LogOutForm = ({ modalToggle }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { name, avatarUrl, email, phone } = user;

  const handleLogOut = () => {
    dispatch(logOut());
    modalToggle();
  };

  return (
    <div className={s.signIn}>
      <div className={s.signIn_logo}>
        <LogoIcon />
        <p className={s.signIn_logoText}>IT FOOD</p>
      </div>
      <img className={s.logOut_avatar} src={avatarUrl} alt="user avatar" />
      <p className={`${s.logOut_text} ${s.logOut_text_name}`}>{name}</p>
      <p className={s.logOut_text}>{email}</p>
      <p className={s.logOut_text}>{phone}</p>
      <button onClick={handleLogOut} className={s.signIn_btn} type="button">
        LOG OUT
      </button>
    </div>
  );
};
