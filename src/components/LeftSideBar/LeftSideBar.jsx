import s from './LeftSideBar.module.css';
import { ReactComponent as MainDishIcon } from '../../images/svg/main-dish-icon.svg';
import { ReactComponent as MeatDishIcon } from '../../images/svg/meat-dish-icon.svg';
import { ReactComponent as DessertDishIcon } from '../../images/svg/dessert-dish-icon.svg';
import { NavLink } from 'react-router-dom';

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
      </ul>
    </section>
  );
};
