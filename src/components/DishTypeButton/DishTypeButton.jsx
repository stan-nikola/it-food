import css from './DishTypeButton.module.css';

export const DishTypeButton = ({ name }) => {
  return (
    <button type="button" className={css.buttonText}>
      {name}
    </button>
  );
};
