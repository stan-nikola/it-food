import css from './ItemCard.module.css';

export const ItemCard = ({
  imgUrl = './pic.jpg',
  name = 'Food Name',
  price = 50,
}) => {
  return (
    <div className={css.card}>
      <div className={css.wrapper}>
        <div className={css.imageWrapper}>
          <img src={imgUrl} alt={name} width="203" />
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
