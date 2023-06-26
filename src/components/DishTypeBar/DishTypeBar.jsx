import { DishTypeButton } from 'components/DishTypeButton/DishTypeButton';
import { useParams } from 'react-router-dom';
import css from './DishTypeBar.module.css';

export const DishTypeBar = () => {
  const buttonsMain = ['All', 'Chicken', 'Seafood', 'Pasta', 'Vegetarian'];
  const buttonsMeat = ['All', 'Lamb', 'Beef', 'Pork'];
  const buttonsDesserts = ['All', 'British', 'American', 'French', 'Canadian'];

  const { category } = useParams();
  let actualButtons = [];

  switch (category) {
    case 'main':
      actualButtons = [...buttonsMain];
      break;
    case 'meat':
      actualButtons = [...buttonsMeat];
      break;
    case 'dessert':
      actualButtons = [...buttonsDesserts];
      break;

    default:
      actualButtons = [...buttonsMain];
  }

  // console.log('actualButtons=', actualButtons);

  return (
    <ul className={css.wrapper}>
      {actualButtons.map(item => {
        // const { _id } = item;

        return (
          <li key={item}>
            <DishTypeButton name={item} />
          </li>
        );
      })}
    </ul>
  );
};

// <div className={css.wrapper}>
//   <DishTypeButton name="All" />
//   <DishTypeButton name="Chicken" />
//   <DishTypeButton name="Seafood" />
//   <DishTypeButton name="Pasta" />
//   <DishTypeButton name="Vegetarian" />
// </div>;
