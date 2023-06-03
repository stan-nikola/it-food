import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';
import { BiHomeAlt, BiFile, BiTimeFive } from 'react-icons/bi';
import { Link, NavLink } from 'react-router-dom';

import s from './TopBar.module.css';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

import { SignInForm } from '../AuthForm/SignInForm';
import { LogInForm } from 'components/AuthForm/LogInForm';

export const TopBar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [logInShow, setLogInShow] = useState(false);
  const [signInShow, setSignInShow] = useState(false);

  const modalToggle = e => {
    setModalShow(prev => !prev);
    setLogInShow(false);
    setSignInShow(false);

    if (e?.target.id && e?.target.id === 'logIn') {
      setLogInShow(prev => !prev);
    }

    if (e?.target.id && e?.target.id === 'signIn') {
      setSignInShow(prev => !prev);
    }
  };

  const isLoggedIn = false;
  const avatar =
    'https://ru.meming.world/images/ru/thumb/2/28/Short_Keanu_Reeves.jpg/300px-Short_Keanu_Reeves.jpg';

  return (
    <header className={s.header}>
      <Link className={s.header__logo} to="/">
        <LogoIcon className={s.header__logo_icon} />
        <div>
          <p className={s.header__logo_mainText}>IT FOOD</p>
          <p className={s.header__logo_primaryText}>IT coffeetalk</p>
        </div>
      </Link>
      <nav className={s.header__nav}>
        <ul className={s.header__nav_list}>
          <li className={s.header__nav_item}>
            <NavLink
              className={({ isActive }) =>
                isActive ? s.header__nav_link_active : s.header__nav_link
              }
              to="/"
              end
            >
              <BiHomeAlt className={s.header__nav_icon} />
              <p>Home</p>
            </NavLink>
          </li>
          <li className={s.header__nav_item}>
            <NavLink
              className={({ isActive }) =>
                isActive ? s.header__nav_link_active : s.header__nav_link
              }
              to="/order"
            >
              <BiFile className={s.header__nav_icon} />
              <p>Order</p>
            </NavLink>
          </li>
          <li className={s.header__nav_item}>
            <NavLink
              className={({ isActive }) =>
                isActive ? s.header__nav_link_active : s.header__nav_link
              }
              to="/history"
            >
              <BiTimeFive className={s.header__nav_icon} />
              <p>History</p>
            </NavLink>
          </li>
          <li className={s.header__nav_item}>
            <button type="button" className={s.header__nav_option}>
              Dinning option
            </button>
          </li>
          <li className={s.header__nav_item}>
            {isLoggedIn ? (
              <button type="button" className={s.header__nav_avatar}>
                <img
                  className={s.header__nav_avatar_img}
                  src={avatar}
                  alt="user avatar"
                />
              </button>
            ) : (
              <div className={s.header__nav_auth}>
                <button
                  type="button"
                  onClick={e => modalToggle(e)}
                  id={'signIn'}
                  className={`${s.header__nav_auth_btn} ${s.header__nav_auth_btnSignIn}`}
                >
                  SIGN IN
                </button>
                <button
                  type="button"
                  onClick={e => modalToggle(e)}
                  className={s.header__nav_auth_btn}
                  id={'logIn'}
                >
                  LOG IN
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
      {modalShow && (
        <Modal modalToggle={modalToggle}>
          {signInShow && <SignInForm />}
          {logInShow && <LogInForm />}
        </Modal>
      )}
    </header>
  );
};
