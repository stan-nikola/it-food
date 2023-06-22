// export const MainBlock = () => {};
import { DashboardTypeBar } from '../DashboardTypeBar/DashboardTypeBar';
import { SearchBar } from '../SearchBar/SearchBar';
import { DishTypeBar } from '../DishTypeBar/DishTypeBar';

import css from './DishBlock.module.css';
import { DishCardRender } from 'components/DishCardRender/DishCardRender';

export const DishBlock = () => {
  return (
    <>
      <section className={css.mainBlockWrapper}>
        <DashboardTypeBar />
        <div className={css.searchAndFoodTypeWrapper}>
          <SearchBar />
          <DishTypeBar />
        </div>
        <DishCardRender />
      </section>
    </>
  );
};
