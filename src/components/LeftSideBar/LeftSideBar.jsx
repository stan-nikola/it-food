import { NavLink } from 'react-router-dom';
import s from './LeftSideBar.module.css';

// import { LogInForm } from 'components/AuthForm';

// import { LogInForm } from '../AuthForm/LogInForm';

import { selectToken } from '../../redux/auth/selectors';

import { MdFavoriteBorder } from 'react-icons/md';

import { DessertDishIcon, MainDishIcon, MeatDishIcon } from 'images';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const LeftSideBar = () => {
  const userToken = useSelector(selectToken);

  const [favInfoShow, setFavInfoShow] = useState(false);

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
          <NavLink
            to="favorite"
            className={({ isActive }) =>
              userToken
                ? ` ${s.link} ${isActive && s.link_active} `
                : ` ${s.link} ${s.link_disable} `
            }

            // className={({ isActive }) =>
            //   ` ${s.link} ${isActive && s.link_active} `
            // }
          >
            <MdFavoriteBorder />
            <p>Favorite</p>
          </NavLink>

          {favInfoShow && !userToken && (
            <p className={s.favInfo}>
              To review your Favorite dishes you must LOG IN first!
            </p>
          )}
        </li>
      </ul>
    </section>
  );
};
