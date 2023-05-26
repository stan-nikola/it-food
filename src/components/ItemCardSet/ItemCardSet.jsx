import { ItemCard } from '../ItemCard/ItemCard';
import css from './ItemCardSet.module.css';

export const ItemCardSet = () => {
  return (
    <>
      <div className={css.itemCardSet}>
        <ItemCard />
      </div>
    </>
  );
};
