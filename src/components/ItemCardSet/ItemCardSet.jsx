import { ItemCard } from '../ItemCard/ItemCard';
import css from './ItemCardSet.module.css';
import { arrayOfCards } from '../../../src/recipes-17';

// console.log(arrayOfCards);

export const ItemCardSet = () => {
  return (
    <>
      <ul className={css.itemCardSet}>
        {arrayOfCards.map(item => {
          console.log('item.title====', item.title);
          return (
            <li key={item._id.$oid}>
              <ItemCard imgUrl={item.preview} name={item.title} price="50" />
            </li>
          );
        })}
        {/* <ItemCard /> */}
      </ul>
    </>
  );
};
