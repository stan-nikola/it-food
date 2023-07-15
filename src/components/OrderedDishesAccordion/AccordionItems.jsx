import s from './OrderedDishesAccordion.module.css';

export const AccordionItems = ({ props }) => {
  const { preview, title, price, quantity } = props;

  return (
    <>
      <li className={s.orderOption_card}>
        <img className={s.orderOption_detail_img} src={preview} alt={title} />

        <div className={s.orderOption_detail}>
          <div>
            <p className={s.orderOption_detail_dish_name}>
              {title.slice(0, 20)}
            </p>
            <div className={s.orderOption_detail_items}>
              <div>
                <p className={s.orderOption_detail_title}>Price</p>
                <p className={s.orderOption_detail_food_price}>$ {price}</p>
              </div>
              <div>
                <p className={s.orderOption_detail_title}>Quantity</p>
                <p className={s.orderOption_detail_food_price}>{quantity}</p>
              </div>
              <div>
                <p className={s.orderOption_detail_title}>Total</p>
                <p className={s.orderOption_detail_food_price}>
                  $ {(quantity * price).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
