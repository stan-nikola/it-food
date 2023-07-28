import css from './DishBlock.module.css';

import { DishCardRender } from 'components/DishCardRender';
import { DashboardTypeBar } from 'components/DashboardTypeBar';
import { SearchBar } from 'components/SearchBar';
import { DishTypeBar } from 'components/DishTypeBar';

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
