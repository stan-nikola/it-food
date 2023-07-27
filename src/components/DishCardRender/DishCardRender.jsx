import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import s from './DishCardRender.module.css';

import { getDishesByCategory } from 'redux/dish/operations';
import { getFavoriteDishes } from 'redux/user/operations';
import { useDish } from 'components/hooks/useDish';

import { ItemCard } from 'components/ItemCard';
import { DishCardSkeleton } from 'components/DishCardSkeleton';

export const DishCardRender = () => {
  const dispatch = useDispatch();
  const { category } = useParams();

  // console.log('category=', category);

  const [searchParams] = useSearchParams();
  const dishCategory = searchParams.get('category') ?? '';
  const userSearch = searchParams.get('search') ?? '';

  // console.log('userSearch in the Render =', userSearch);

  // console.log('dishCategory=', dishCategory);
  // console.log('category=', category);

  const { dish, dishIsLoaded } = useDish();

  let dishCollection = [];

  const numberOfCards = Array.from(Array(8).keys());

  useEffect(() => {
    if (category === 'favorite') {
      dispatch(getFavoriteDishes(category));
      return;
    }
    dispatch(getDishesByCategory(category));
  }, [category, dispatch]);

  // console.log('dish=', dish);
  // console.log('dishfavorite=', dish.favorite);

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
    case 'favorite':
      dishCollection = dish.favorite;
      break;

    default:
      dishCollection = dish.main;
  }

  let collectionForRender = [...dishCollection];

  if (userSearch) {
    collectionForRender = dishCollection.filter(dish =>
      dish.title.toLowerCase().includes(userSearch.toLowerCase())
    );
  }

  if (dishCategory) {
    switch (category) {
      case 'dessert':
        if (dishCategory.toLowerCase() !== 'all') {
          collectionForRender = dishCollection.filter(
            dish => dish.area.toLowerCase() === dishCategory
          );
        }
        break;

      default:
        if (dishCategory.toLowerCase() !== 'all') {
          collectionForRender = dishCollection.filter(
            dish => dish.category.toLowerCase() === dishCategory
          );
        }
    }
  }

  // if (dishCategory.toLowerCase() !== 'all') {
  //   collectionForRender = dishCollection.filter(
  //     dish => dish.category === dishCategory
  //   );
  // }

  // console.log('collectionForRender=', collectionForRender);

  // //Получаем точку
  // const point = document.querySelector('#card');
  // console.log('point=', point);

  // //Вешаем обработчик
  // //срабатывает при заходе курсора на элемент
  // point.addEventListener('mouseover', function () {
  //   this.style.backgroundColor = 'gray';
  // });
  // //срабатывает при уходе курсора с элемента
  // // point.addEventListener('mouseout', function () {
  // //   this.style.backgroundColor = 'white';
  // // });

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
              {collectionForRender.map(item => {
                const { _id } = item;
                // console.log('_id123=', _id);

                return (
                  <li key={_id} className="">
                    <ItemCard dish={item} />
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
