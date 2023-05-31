// import { NavLink } from 'react-router-dom';

import css from './LeftSideBar.module.css';
// import Bread from '../../images/svg/Appetizer.svg';
import { ReactComponent as Bread } from '../../images/svg/Appetizer.svg';

// import e from '../../images/svg/';

export const LeftSideBar = () => {
  return (
    <section className={css.container}>
      <ul className={css.wrapper}>
        <li className={css.listItem}>
          {/* <NavLink
          // className={css.link}
          // to={}
          // state={}
          >
            <img
              src="../../images/svg/Coffee.svg"
              alt="Icon"
              width="77"
              height="78"
            />
          </NavLink> */}
        </li>
        <li className={css.listItem}>
          <Bread />
          {/* <img
            src="../../images/svg/Beverages.svg"
            alt="Icon"
            width="77"
            height="78"
          /> */}
        </li>
        <li className={css.listItem}>
          <img
            src="../../images/svg/MainCourse.svg"
            alt="Icon"
            width="77"
            height="78"
          />
        </li>
        <li className={css.listItem}>
          <img
            src="../../images/svg/Appetizer.svg"
            alt="Icon"
            width="77"
            height="78"
          />
        </li>
        <li className={css.listItem}>
          <img
            src="../../images/svg/Bread.svg"
            alt="Icon"
            width="77"
            height="78"
          />
        </li>
        <li className={css.listItem}>
          <img
            src="../../images/svg/Snack.svg"
            alt="Icon"
            width="77"
            height="78"
          />
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
