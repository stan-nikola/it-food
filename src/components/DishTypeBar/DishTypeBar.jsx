import { useParams } from 'react-router-dom';
import css from './DishTypeBar.module.css';
import { DishTypeButton } from 'components/DishTypeButton';

export const DishTypeBar = () => {
  const buttonsMain = ['all', 'chicken', 'seafood', 'pasta', 'vegetarian'];
  const buttonsMeat = ['all', 'lamb', 'beef', 'pork', 'meat pies'];
  const buttonsDesserts = ['all', 'british', 'american', 'french', 'canadian'];

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
    // actualButtons = [];
  }

  // console.log('actualButtons=', actualButtons);

  return (
    <ul className={css.wrapper}>
      {category !== 'favorite' ? (
        actualButtons.map(item => {
          return (
            <li key={item}>
              <DishTypeButton name={item} />
            </li>
          );
        })
      ) : (
        <li>
          <p className={css.slogan}>Enjoy your favorite dishes!</p>
        </li>
      )}
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
