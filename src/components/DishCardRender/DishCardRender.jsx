import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import ScrollContainer from 'react-indiana-drag-scroll';
import s from './DishCardRender.module.css';

import { getDishesByCategory } from 'redux/dish/operations';
import { getFavoriteDishes } from 'redux/user/operations';

import { useDish } from 'components/hooks/useDish';
// import { useAuth } from 'components/hooks/useAuth';

// import { selectFavorite } from 'redux/auth/selectors';

import { ItemCard } from 'components/ItemCard';
import { DishCardSkeleton } from 'components/DishCardSkeleton';
import { useAuth } from 'components/hooks/useAuth';
import { eraseFavorite } from 'redux/dish/dishSlice';
import { selectFavorite } from 'redux/auth/selectors';

export const DishCardRender = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { category } = useParams();

  const [searchParams] = useSearchParams();
  const dishCategory = searchParams.get('category') ?? '';
  const userSearch = searchParams.get('search') ?? '';

  const { dish, dishIsLoaded } = useDish();

  const arrayOfFavoriteID = useSelector(selectFavorite);

  let dishCollection = [];

  const numberOfCards = Array.from(Array(8).keys());

  useEffect(() => {
    if (category === 'favorite' && isLoggedIn) {
      dispatch(getFavoriteDishes(category));
      return;
    }
  }, [arrayOfFavoriteID, isLoggedIn, category, dispatch]);

  useEffect(() => {
    if (category === 'favorite' && !isLoggedIn) {
      navigate('/home/main?category=all');
      dispatch(eraseFavorite());
    }
  }, [category, dispatch, isLoggedIn, navigate]);

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

  return (
    <>
      <ScrollContainer
        hideScrollbars={false}
        horizontal={false}
        component="ul"
        className={s.container}
        draggingClassName={s.container_isDrag}
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

                return (
                  <li key={_id}>
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
