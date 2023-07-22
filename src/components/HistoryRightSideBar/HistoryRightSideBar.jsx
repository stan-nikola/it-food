import CountUp from 'react-countup';
import s from './HistoryRightSideBar.module.css';

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
        <CountUp className={s.orders_item_value} end={orders} />
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Confirmed orders:</p>
        <CountUp className={s.orders_item_value} end={confirmedOrder} />
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Unconfirmed orders:</p>
        <CountUp className={s.orders_item_value} end={unconfirmedOrder} />
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total Dishes:</p>
        <CountUp className={s.orders_item_value} end={totalOrderedDish} />
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total Gift Coins:</p>
        <CountUp
          className={s.orders_item_value}
          end={totalGiftCoin.toFixed(2)}
        />
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total :</p>
        <div className={s.orders_inner}>
          <p className={s.orders_item_value}>$</p>
          <CountUp
            className={s.orders_item_value}
            decimals={2}
            decimal="."
            end={totalPrice.toFixed(2)}
          />
        </div>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total with tips:</p>
        <div className={s.orders_inner}>
          <p className={s.orders_item_value}>$</p>
          <CountUp
            className={s.orders_item_value}
            decimals={2}
            decimal="."
            end={totalPriceWithTips.toFixed(2)}
          />
        </div>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total tips:</p>
        <div className={s.orders_inner}>
          <p className={s.orders_item_value}>$</p>
          <CountUp
            className={s.orders_item_value}
            decimals={2}
            decimal="."
            end={totalTips}
          />
        </div>
      </div>
    </div>
  );
};
