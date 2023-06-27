import { useSearchParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

// import { useEffect } from 'react';
import css from './SearchBar.module.css';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userSearchValue = searchParams.get('search') ?? '';
  // const { category } = useParams();

  const updateQueryString = evt => {
    const search = evt.target.value;
    const nextParams = search !== '' ? { search } : {};
    setSearchParams(nextParams);
  };

  // useEffect(() => {
  //   return () => setSearchParams('');
  // }, [category]);

  // console.log('search=', searchParams);

  return (
    <form action="">
      <input
        className={css.wrapper}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search menu..."
        value={userSearchValue}
        onChange={updateQueryString}
      />
    </form>
  );
};

// e => setSearchParams({ search: e.target.value })
// Meat Pies
// French
// Canadian
