import { NavLink } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import css from './DishTypeButton.module.css';

export const DishTypeButton = ({ name }) => {
  return (
    <NavLink
      to={`?category=${name}`}
      // className={`${css.buttonText} `}
      className={({ isActive }) =>
        isActive ? `${css.buttonText} ${css.active}` : css.buttonText
      }
    >
      {name}
    </NavLink>

    // <button type="button" className={css.buttonText}>
    //   {name}
    // </button>
  );
};
