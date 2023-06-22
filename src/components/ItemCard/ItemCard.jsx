import { useState } from 'react';
import css from './ItemCard.module.css';

import { useDispatch } from 'react-redux';
import { addDish } from 'redux/order/orderSlice';

export const ItemCard = ({ dish }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const { _id: id, preview, title, price } = dish;

  const dispatch = useDispatch();

  return (
    <div className={css.card}>
      <div className={css.wrapper}>
        <div className={css.imageWrapper}>
          <img
            className={`${!isImgLoaded && css.image_hide}`}
            onLoad={() => setIsImgLoaded(prev => !prev)}
            src={preview}
            alt={title}
            width="203"
          />
          {!isImgLoaded && <div className={css.isLoadingCard}></div>}
        </div>
        <h1 className={css.foodName}>{title}</h1>
      </div>

      <p className={css.foodPrice}>Price: $ {price}</p>

      <div className={css.buttonsWrapper}>
        <button type="button" className={css.button}>
          More info
        </button>
        <button
          onClick={() => dispatch(addDish(id))}
          type="button"
          className={css.button}
        >
          Order now
        </button>
      </div>
    </div>
  );
};
