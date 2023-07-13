import { useEffect, useState } from 'react';
import s from './OrderedDishesAccordion.module.css';

export const AccordionItems = ({ props }) => {
  const [scrollTarget, setScrollTarget] = useState(null);

  const { _id, preview, title, price, quantity, dishesShow } = props;

  useEffect(() => {
    return () => {
      setScrollTarget(document.getElementById(_id));
      dishesShow &&
        scrollTarget &&
        scrollTarget.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
    };
  }, [_id, dishesShow, scrollTarget]);

  return (
    <li id={_id} className={s.orderOption_card}>
      <img className={s.orderOption_detail_img} src={preview} alt={title} />

      <div className={s.orderOption_detail_change}>
        <div>
          <p className={s.orderOption_detail_food_name}>{title.slice(0, 20)}</p>
          <div className={s.orderOption_detail_sup_change}>
            <div className={s.orderOption_detail_sub_change}>
              <p className={s.orderOption_detail_food_price}>Price</p>
              <p className={s.orderOption_detail_food_price_cost}>$ {price}</p>
            </div>
            <div className={s.orderOption_detail_sub_change}>
              <p className={s.orderOption_detail_food_price}>Quantity</p>
              <p className={s.orderOption_detail_food_price_cost}>{quantity}</p>
            </div>
            <div className={s.orderOption_detail_sub_change}>
              <p className={s.orderOption_detail_food_price}>Total</p>
              <p className={s.orderOption_detail_food_price_cost}>
                $ {(quantity * price).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
