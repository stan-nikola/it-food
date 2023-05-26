import { FoodTypeButton } from '../FoodTypeButton/FoodTypeButton';
import css from './FoodTypeBar.module.css';

export const FoodTypeBar = () => {
  return (
    <div className={css.wraper}>
      <FoodTypeButton name="All" />
      <FoodTypeButton name="Chicken" />
      <FoodTypeButton name="Seafood" />
      <FoodTypeButton name="Pasta" />
      <FoodTypeButton name="Rice bowl" />
    </div>
  );
};
