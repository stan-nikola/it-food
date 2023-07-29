import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import s from './OrderCardRender.module.css';
import FlipNumbers from 'react-flip-numbers';

import { useDispatch } from 'react-redux';
import {
  decrementOrderedDishQuantity,
  incrementOrderedDishQuantity,
} from 'redux/order/orderSlice';

export const OrderCardRender = ({ props }) => {
  const { _id, preview, title, price, quantity } = props;

  const dispatch = useDispatch();
  return (
    <li className={s.orderOption_card}>
      <img className={s.orderOption_detail_img} src={preview} alt={title}></img>
      <div className={s.orderOption_detail_change}>
        <div>
          <p className={s.orderOption_detail_food_name}>{title}</p>
          <div className={s.orderOption_detail_sup_change}>
            <div className={s.orderOption_detail_sub_change}>
              <p className={s.orderOption_detail_food_price}>Price</p>
              <p className={s.orderOption_detail_food_price_cost}>$ {price}</p>
            </div>
            <div className={s.orderOption_detail_sub_change}>
              <p className={s.orderOption_detail_food_price}>Quantity</p>
              <p className={s.orderOption_detail_food_price_cost}>
                <span> {quantity}</span>
              </p>
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
      <div className={s.orderOption_detail_change}>
        <button
          onClick={() => dispatch(decrementOrderedDishQuantity(_id))}
          className={s.orderOption_detail_change_btn}
        >
          <AiFillMinusCircle
            className={`${s.orderOption_detail_change_icon} ${s.orderOption_detail_change_icon_minus}`}
          />
        </button>
        <span className={s.orderOption_detail_quantity}>
          <FlipNumbers
            height={18}
            width={18}
            duration={1}
            play
            numbers={`${quantity}`}
          />
        </span>

        <button
          disabled={quantity >= 9}
          onClick={() => dispatch(incrementOrderedDishQuantity(_id))}
          className={s.orderOption_detail_change_btn}
        >
          <AiFillPlusCircle
            className={`${s.orderOption_detail_change_icon} ${s.orderOption_detail_change_icon_plus}`}
          />
        </button>
      </div>
    </li>
  );
};
