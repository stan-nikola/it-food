import css from './ItemCard.module.css';

export const ItemCard = ({
  imgUrl = './pic.jpg',
  name = 'Food Name',
  price = 50,
}) => {
  return (
    <div className={css.wrapper}>
      <div className={css.imageWrapper}>
        <img src={imgUrl} alt={name} width="203" />
      </div>
      <h2 className={css.foodName}>{name}</h2>
      <p className={css.foodPrice}>Price: {price}$</p>
      <div className={css.buttonsWrapper}>
        <button type="button">More info</button>
        <button type="button">Order now</button>
      </div>
    </div>
  );
};
