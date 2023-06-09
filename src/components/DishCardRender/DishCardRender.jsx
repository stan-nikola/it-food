import { ItemCard } from '../ItemCard/ItemCard';
import s from './DishCardRender.module.css';
import { useDispatch } from 'react-redux';
import { getDishesByCategory } from 'redux/dish/operations';
import { useEffect } from 'react';
import { useDish } from 'components/hooks/useDish';
import { DishCardSkeleton } from 'components/DishCardSkeleton/DishCardSkeleton';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export const DishCardRender = () => {
  const dispatch = useDispatch();
  const { category } = useParams();

  // console.log('category=', category);

  const [searchParams] = useSearchParams();
  const dishCategory = searchParams.get('category') ?? '';
  const userSearch = searchParams.get('search') ?? '';

  // console.log('userSearch in the Render =', userSearch);

  // console.log('dishCategory=', dishCategory);

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
