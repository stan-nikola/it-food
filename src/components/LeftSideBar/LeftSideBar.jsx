// import { NavLink } from 'react-router-dom';

import css from './LeftSideBar.module.css';
// import Bread from '../../images/svg/Appetizer.svg';
// import { ReactComponent as Bread } from '../../images/svg/Appetizer.svg';

// import e from '../../images/svg/';

export const LeftSideBar = () => {
  return (
    <section className={css.container}>
      <ul className={css.wrapper}>
        <li className={css.listItem}>
          {/* <img
            src="../../images/svg/MainCourse.svg"
            alt="Icon"
            width="77"
            height="78"
          /> */}
          <button className={`${css.button} ${css.active}`} type="submit">
            FOOD
          </button>
        </li>
        <li className={css.listItem}>
          {/* <img
            src="../../images/svg/Appetizer.svg"
            alt="Icon"
            width="77"
            height="78"
          />
          */}
          <button className={css.button} type="submit">
            MEAT
          </button>
        </li>
        <li className={css.listItem}>
          {/* <img
            src="../../images/svg/Bread.svg"
            alt="Icon"
            width="77"
            height="78"
          /> */}
          <button className={css.button} type="submit">
            DESSERTS
          </button>
        </li>

        {/* <FoodTypeButton name="All" />
        <FoodTypeButton name="Chicken" />
        <FoodTypeButton name="Seafood" />
        <FoodTypeButton name="Pasta" />
        <FoodTypeButton name="Rice bowl" /> */}
      </ul>
    </section>
  );
};
