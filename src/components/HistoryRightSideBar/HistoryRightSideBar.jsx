import s from './HistoryRightSideBar.module.css';

export const HistoryRightSideBar = ({ userOrder }) => {
  const orderCount = userOrder.length;

  const confirmedCount = userOrder
    .reduce((acc, { confirmed }) => (confirmed ? acc + 1 : acc + 0), 0)
    .toFixed(0);

  const totalPrice = userOrder
    .reduce(
      (acc, { totalPrice, confirmed }) =>
        confirmed ? acc + Number(totalPrice) : acc + 0,
      0
    )
    .toFixed(2);
  const totalWithTipsPrice = userOrder
    .reduce(
      (acc, { totalWithTipsPrice, confirmed }) =>
        confirmed ? acc + Number(totalWithTipsPrice) : acc + 0,
      0
    )
    .toFixed(2);
  const totalGiftCoins = userOrder
    .reduce(
      (acc, { giftCoin, confirmed }) =>
        confirmed ? acc + Number(giftCoin) : acc + 0,
      0
    )
    .toFixed(0);
  const totalDishes = userOrder
    .reduce(
      (acc, { orderedDish, confirmed }) =>
        confirmed ? acc + orderedDish.length : acc + 0,
      0
    )
    .toFixed(0);

  const totalTips = (totalWithTipsPrice - totalPrice).toFixed(2);

  return (
    <section className={s.container}>
      <h2 className={s.orders_title}>Order details</h2>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Orders:</p>
        <p className={s.orders_item_value}>{orderCount}</p>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Confirmed orders:</p>
        <p className={s.orders_item_value}>{confirmedCount}</p>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Unconfirmed orders:</p>
        <p className={s.orders_item_value}>{orderCount - confirmedCount}</p>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total Dishes:</p>
        <p className={s.orders_item_value}>{totalDishes}</p>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total Gift Coins:</p>
        <p className={s.orders_item_value}>{totalGiftCoins}</p>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total :</p>
        <p className={s.orders_item_value}>$ {totalPrice}</p>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total with tips:</p>
        <p className={s.orders_item_value}>$ {totalWithTipsPrice}</p>
      </div>
      <div className={s.orders_item}>
        <p className={s.orders_item_name}>Total tips:</p>
        <p className={s.orders_item_value}>$ {totalTips}</p>
      </div>
    </section>
  );
};
