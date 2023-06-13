import { DishTypeButton } from 'components/DishTypeButton/DishTypeButton';
import css from './DishTypeBar.module.css';

export const DishTypeBar = () => {
  return (
    <div className={css.wrapper}>
      <DishTypeButton name="All" />
      <DishTypeButton name="Chicken" />
      <DishTypeButton name="Seafood" />
      <DishTypeButton name="Pasta" />
      <DishTypeButton name="Vegetarian" />
    </div>
  );
};
