import css from './FoodTypeButton.module.css';

export const FoodTypeButton = ({ name }) => {
  return (
    <button type="button" className={css.buttonText}>
      {name}
    </button>
  );
};
