// export const MainBlock = () => {};
import { DashboardTypeBar } from '../DashboardTypeBar/DashboardTypeBar';
import { SearchBar } from '../SearchBar/SearchBar';
import { DishTypeBar } from '../DishTypeBar/DishTypeBar';
import { ItemCardSet } from '../ItemCardSet/ItemCardSet';
import css from './MainBlock.module.css';

export const MainBlock = () => {
  return (
    <>
      <section className={css.mainBlockWrapper}>
        {/* MainBlock */}
        <DashboardTypeBar />
        <div className={css.searchAndFoodTypeWrapper}>
          <SearchBar />
          <DishTypeBar />
        </div>
        <ItemCardSet />
      </section>
    </>
  );
};
