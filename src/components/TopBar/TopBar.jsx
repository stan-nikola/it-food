import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import s from './TopBar.module.css';
import { BiHomeAlt, BiFile, BiTimeFive } from 'react-icons/bi';
import { LogoIcon } from 'images';

import { useOrder } from 'components/hooks/useOrder';
import { useAuth } from 'components/hooks/useAuth';
import { Modal } from 'components/Modal';
import { LogInForm, SignUpForm, LogOutForm } from 'components/AuthForm';

export const TopBar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [logInShow, setLogInShow] = useState(false);
  const [signInShow, setSignInShow] = useState(false);
  const [logOutShow, setLogOutShow] = useState(false);

  const { isLoggedIn, user, isRefreshing } = useAuth();

  const { avatarUrl } = user;

  const { lastOrder } = useOrder();

  localStorage.setItem('theme', 'dark');

  const modalToggle = e => {
    setLogInShow(false);
    setSignInShow(false);
    setLogOutShow(false);

    setModalShow(e);

    if (e?.target?.id && e.target.id === 'logIn') {
      return setLogInShow(prev => !prev);
    }

    if (e?.target?.id && e.target.id === 'signIn') {
      return setSignInShow(prev => !prev);
    }

    if (e?.currentTarget?.id && e.currentTarget.id === 'logOut') {
      return setLogOutShow(prev => !prev);
    }
  };

  return (
    <header className={s.header}>
      <Link className={s.header__logo} to="/home">
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
              to="/home"
            >
              <BiHomeAlt className={s.header__nav_icon} />
              <p>Home</p>
            </NavLink>
          </li>

          {lastOrder && (
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
          )}

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
            <input type="checkbox" className={s.checkbox} id="checkbox" />
            <label for="checkbox" class="checkbox-label">
              <i class="fas fa-moon"></i>
              <i class="fas fa-sun"></i>
              <span class="ball"></span>
            </label>
          </li>
          <li className={s.header__nav_item}>
            {isRefreshing ? (
              <CircularProgress className={s.header__nav_item} />
            ) : (
              <>
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={e => modalToggle(e)}
                    id={'logOut'}
                    className={s.header__nav_avatar}
                  >
                    <img
                      className={s.header__nav_avatar_img}
                      src={avatarUrl}
                      alt="user avatar"
                      id={'logOut'}
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
                      SIGN UP
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
              </>
            )}
          </li>
        </ul>
        {modalShow && (
          <Modal modalToggle={modalToggle} styles={s}>
            {signInShow && <SignUpForm modalToggle={modalToggle} />}
            {logInShow && <LogInForm modalToggle={modalToggle} />}
            {logOutShow && <LogOutForm modalToggle={modalToggle} />}
          </Modal>
        )}
      </nav>
    </header>
  );
};
