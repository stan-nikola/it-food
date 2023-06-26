// import { NavLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import css from './DishTypeButton.module.css';

export const DishTypeButton = ({ name }) => {
  const [searchParams] = useSearchParams();
  const dishCategory = searchParams.get('category');
  return (
    <Link
      to={`?category=${name}`}
      // className={`${css.buttonText} `}
      className={
        name === dishCategory
          ? `${css.buttonText} ${css.active}`
          : css.buttonText
      }
      // className={({ isActive }) =>
      //   isActive ? `${css.buttonText} ${css.active}` : css.buttonText
      // }
    >
      {name}
    </Link>

    // <button type="button" className={css.buttonText}>
    //   {name}
    // </button>
  );
};
