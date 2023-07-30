import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import s from './DishCardRender.module.css';

import { getDishesByCategory } from 'redux/dish/operations';
import { getFavoriteDishes } from 'redux/user/operations';

import { useDish } from 'components/hooks/useDish';
// import { useAuth } from 'components/hooks/useAuth';

import { selectFavorite } from 'redux/auth/selectors';

import { ItemCard } from 'components/ItemCard';
import { DishCardSkeleton } from 'components/DishCardSkeleton';
import ScrollContainer from 'react-indiana-drag-scroll';

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

  // const { favorite } = useAuth();
  // console.log('FAVOR=', favorite);

  const arrayOfFavoriteID = useSelector(selectFavorite);

  // const arrayOfFavoriteID = useSelector(
  //   state => state.user.favorite.arrayOfFavoriteID
  // );
  // console.log('xxx=', arrayOfFavoriteID);

  let dishCollection = [];

  const numberOfCards = Array.from(Array(8).keys());

  // useEffect(() => {
  //   if (category === 'favorite') {
  //     dispatch(getFavoriteDishes(category));
  //     return;
  //   }
  //   dispatch(getDishesByCategory(category));
  // }, [category, dispatch]);

  useEffect(() => {
    if (category === 'favorite') {
      dispatch(getFavoriteDishes(category));
      return;
    }
  }, [arrayOfFavoriteID, category, dispatch]);

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
      <ScrollContainer
        hideScrollbars={false}
        horizontal={false}
        component="ul"
        className={s.container}
      >
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
      </ScrollContainer>
    </>
  );
};
