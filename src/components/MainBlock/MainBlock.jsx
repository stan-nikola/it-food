// export const MainBlock = () => {};
import { DashboardTypeBar } from '../DashboardTypeBar/DashboardTypeBar';
import { SearchBar } from '../SearchBar/SearchBar';
import { DishTypeBar } from '../DishTypeBar/DishTypeBar';
import { DishBlock } from '../DishBlock/DishBlock';
import css from './MainBlock.module.css';

export const MainBlock = () => {
  return (
    <>
      <section className={css.mainBlockWrapper}>
        <DashboardTypeBar />
        <div className={css.searchAndFoodTypeWrapper}>
          <SearchBar />
          <DishTypeBar />
        </div>
        <DishBlock />
      </section>
    </>
  );
};
