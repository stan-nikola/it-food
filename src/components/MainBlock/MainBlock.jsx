// export const MainBlock = () => {};
import { DashboardTypeBar } from '../DashboardTypeBar/DashboardTypeBar';
import { SearchBar } from '../SearchBar/SearchBar';
import { FoodTypeBar } from '../FoodTypeBar/FoodTypeBar';
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
          <FoodTypeBar />
        </div>
        <ItemCardSet />
      </section>
    </>
  );
};
