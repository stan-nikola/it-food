import s from './HistoryRightSideBar.module.css';
import FlipNumbers from 'react-flip-numbers';

export const HistoryRightSideBar = ({ orderCount }) => {
  const {
    confirmedOrder = 0,
    totalGiftCoin = 0,
    totalOrderedDish = 0,
    totalPrice = 0,
    totalPriceWithTips = 0,
    unconfirmedOrder = 0,
  } = orderCount || {};

  const orders = confirmedOrder + unconfirmedOrder;
  const totalTips = (totalPriceWithTips - totalPrice).toFixed(2);

  return (
    <div className={s.container}>
      <h2 className={s.orders_title}>Order details</h2>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Orders:</p>
        <span className={s.orders_item_value}>
          <FlipNumbers
            className={s.orders_item_value}
            height={18}
            width={12}
            duration={2}
            play
            numbers={`${orders}`}
          />
        </span>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Confirmed orders:</p>
        <span className={s.orders_item_value}>
          <FlipNumbers
            className={s.orders_item_value}
            height={18}
            width={12}
            duration={2}
            play
            numbers={`${confirmedOrder}`}
          />
        </span>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Unconfirmed orders:</p>
        <span className={s.orders_item_value}>
          <FlipNumbers
            className={s.orders_item_value}
            height={18}
            width={12}
            duration={2}
            play
            numbers={`${unconfirmedOrder}`}
          />
        </span>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total Dishes:</p>
        <span className={s.orders_item_value}>
          <FlipNumbers
            className={s.orders_item_value}
            height={18}
            width={12}
            duration={2}
            play
            numbers={`${totalOrderedDish}`}
          />
        </span>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total Gift Coins:</p>
        <span className={s.orders_item_value}>
          <FlipNumbers
            className={s.orders_item_value}
            height={18}
            width={12}
            duration={2}
            play
            numbers={`${totalGiftCoin.toFixed(0)}`}
          />
        </span>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total :</p>
        <div className={s.orders_inner}>
          <p className={s.orders_item_value}>$</p>
          <span className={s.orders_item_value}>
            <FlipNumbers
              className={s.orders_item_value}
              height={18}
              width={12}
              duration={2}
              play
              numbers={`${totalPrice.toFixed(2)}`}
            />
          </span>
        </div>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total with tips:</p>
        <div className={s.orders_inner}>
          <p className={s.orders_item_value}>$</p>
          <span className={s.orders_item_value}>
            <FlipNumbers
              className={s.orders_item_value}
              height={18}
              width={12}
              duration={2}
              play
              numbers={`${totalPriceWithTips.toFixed(2)}`}
            />
          </span>
        </div>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total tips:</p>
        <div className={s.orders_inner}>
          <p className={s.orders_item_value}>$</p>
          <span className={s.orders_item_value}>
            <FlipNumbers
              className={s.orders_item_value}
              height={18}
              width={12}
              duration={2}
              play
              numbers={`${totalTips}`}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
