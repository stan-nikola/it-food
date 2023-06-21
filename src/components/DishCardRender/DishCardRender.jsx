import { ItemCard } from '../ItemCard/ItemCard';
import s from './DishCardRender.module.css';
import { useDispatch } from 'react-redux';
import { getDishesByCategory } from 'redux/dish/operations';
import { useEffect } from 'react';
import { useDish } from 'components/hooks/useDish';
import { DishCardSkeleton } from 'components/DishCardSkeleton/DishCardSkeleton';
import { useParams } from 'react-router-dom';

export const DishCardRender = () => {
  const dispatch = useDispatch();
  const { category } = useParams();

  const { dish, dishIsLoaded } = useDish();

  let dishCollection = [];

  const numberOfCards = Array.from(Array(8).keys());

  useEffect(() => {
    dispatch(getDishesByCategory(category));
  }, [category, dispatch]);

  switch (category) {
    case 'main':
      dishCollection = dish.main;
      break;
    case 'meat':
      dishCollection = dish.meat;
      break;
    case 'dessert':
      dishCollection = dish.dessert;
      break;

    default:
      dishCollection = dish.main;
  }

  return (
    <>
      <ul className={s.container}>
        <>
          {dishIsLoaded ? (
            <>
              {numberOfCards.map((item, i) => {
                return (
                  <li key={i}>
                    <DishCardSkeleton />
                  </li>
                );
              })}
            </>
          ) : (
            <>
              {dishCollection.map(item => {
                const { _id, preview, title, price } = item;

                return (
                  <li key={_id}>
                    <ItemCard imgUrl={preview} name={title} price={price} />
                  </li>
                );
              })}
            </>
          )}
        </>
      </ul>
    </>
  );
};
