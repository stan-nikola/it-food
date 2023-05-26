import css from './SearchBar.module.css';

export const SearchBar = () => {
  return (
    <input
      className={css.wrapper}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search menu..."
      // value={inputedQuery}
      // onChange={handleInputChange}
    />
  );
};
