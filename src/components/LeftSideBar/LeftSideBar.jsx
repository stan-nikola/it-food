import { NavLink } from 'react-router-dom';
import s from './LeftSideBar.module.css';


import { MdFavoriteBorder } from 'react-icons/md';

import { DessertDishIcon, MainDishIcon, MeatDishIcon } from 'images';


export const LeftSideBar = () => {
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
        <li className={s.listItem}>
          <NavLink
            to="favorite"
            className={({ isActive }) =>
              ` ${s.link} ${isActive && s.link_active} `
            }
          >
            <MdFavoriteBorder />
            <p>Favorite</p>
          </NavLink>
        </li>
      </ul>
    </section>
  );
};
