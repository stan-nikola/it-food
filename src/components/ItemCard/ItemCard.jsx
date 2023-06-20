import { useState } from 'react';
import css from './ItemCard.module.css';

export const ItemCard = ({ imgUrl, name, price }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <div className={css.card}>
      <div className={css.wrapper}>
        <div className={css.imageWrapper}>
          <img
            className={!isImgLoaded && css.image_hide}
            onLoad={() => setIsImgLoaded(prev => !prev)}
            src={imgUrl}
            alt={name}
            width="203"
          />
          {!isImgLoaded && <div className={css.isLoadingCard}></div>}
        </div>
        <h1 className={css.foodName}>{name}</h1>
      </div>

      <p className={css.foodPrice}>Price: $ {price}</p>

      <div className={css.buttonsWrapper}>
        <button type="button" className={css.button}>
          More info
        </button>
        <button type="button" className={css.button}>
          Order now
        </button>
      </div>
    </div>
  );
};
