import { NavLink } from 'react-router-dom';
import s from './LeftSideBar.module.css';
import signUpStyles from '../TopBar/TopBar.module.css';

// import { LogInForm } from 'components/AuthForm';

// import { LogInForm } from '../AuthForm/LogInForm';

import { selectToken } from '../../redux/auth/selectors';

import { MdFavoriteBorder } from 'react-icons/md';

import { DessertDishIcon, MainDishIcon, MeatDishIcon } from 'images';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useAuth } from 'components/hooks/useAuth';
import { SignUpForm } from 'components/AuthForm';
import { Modal } from 'components/Modal';

export const LeftSideBar = () => {
  const userToken = useSelector(selectToken);

  const [favInfoShow, setFavInfoShow] = useState(false);
  const [signUpFormShow, setSignUpFormShow] = useState(false);

  const { isLoggedIn } = useAuth();

  const modalToggle = () => {
    setSignUpFormShow(false);
  };

  const favInfoToggle = () => {
    setFavInfoShow(prev => !prev);
  };

  return (
    <section className={s.container}>
      <ul className={s.wrapper}>
        <li className={s.listItem}>
          <NavLink
            to="main?category=all"
            className={({ isActive }) =>
              ` ${s.link} ${isActive && s.link_active} `
            }
          >
            <MainDishIcon />
            <p>Main</p>
          </NavLink>
        </li>
        <li className={s.listItem}>
          <NavLink
            to="meat?category=all"
            className={({ isActive }) =>
              ` ${s.link} ${isActive && s.link_active} `
            }
          >
            <MeatDishIcon />
            <p>Meat</p>
          </NavLink>
        </li>
        <li className={s.listItem}>
          <NavLink
            to="dessert?category=all"
            className={({ isActive }) =>
              ` ${s.link} ${isActive && s.link_active} `
            }
          >
            <DessertDishIcon />
            <p>Dessert</p>
          </NavLink>
        </li>
        <li
          className={s.listItem}
          onMouseOver={favInfoToggle}
          onMouseOut={favInfoToggle}
        >
          {isLoggedIn ? (
            <NavLink
              to="favorite"
              className={({ isActive }) =>
                ` ${s.link} ${isActive && s.link_active} `
              }

              // className={({ isActive }) =>
              //   ` ${s.link} ${isActive && s.link_active} `
              // }
            >
              <MdFavoriteBorder />
              <p>Favorite</p>
            </NavLink>
          ) : (
            <button
              onClick={() => setSignUpFormShow(prev => !prev)}
              className={s.link}
              type="button"
            >
              <MdFavoriteBorder />
              <p>Favorite</p>
            </button>
          )}

          {favInfoShow && !userToken && (
            <p className={s.favInfo}>
              To review your Favorite dishes you must SIGN UP first!
            </p>
          )}
        </li>
      </ul>
      {signUpFormShow && (
        <Modal modalToggle={modalToggle} styles={signUpStyles}>
          <SignUpForm />
        </Modal>
      )}
    </section>
  );
};
