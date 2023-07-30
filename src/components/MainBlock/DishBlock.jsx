import css from './DishBlock.module.css';

import { DishCardRender } from 'components/DishCardRender';

import { SearchBar } from 'components/SearchBar';
import { DishTypeBar } from 'components/DishTypeBar';
import { PageTypeBar } from 'components/PageTypeBar';

export const DishBlock = () => {
  return (
    <>
      <section className={css.mainBlockWrapper}>
        <PageTypeBar />
        <div className={css.searchAndFoodTypeWrapper}>
          <SearchBar />
          <DishTypeBar />
        </div>
        <DishCardRender />
      </section>
    </>
  );
};
