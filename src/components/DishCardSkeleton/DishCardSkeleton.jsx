import s from './DishCardSkeleton.module.css';

export const DishCardSkeleton = ({ imgUrl, name, price }) => {
  return (
    <div className={s.skeleton}>
      <div className={s.card}>
        <div className={s.image}></div>
        <p className={s.text}></p>
        <p className={s.text}></p>
      </div>
    </div>
  );
};
