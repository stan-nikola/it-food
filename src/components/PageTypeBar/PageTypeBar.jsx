import { useLocation, useParams } from 'react-router-dom';
import css from './PageTypeBar.module.css';
import FlipNumbers from 'react-flip-numbers';

export const PageTypeBar = () => {
  const { category } = useParams();
  const { pathname, search } = useLocation();

  const pageNumber = search.split('=').slice(1);

  return (
    <>
      {pathname.split('/')[1] === 'home' && (
        <p className={css.dashboardText}>Dashboard / {category}</p>
      )}
      {pathname.split('/')[1] === 'history' && (
        <span className={css.historyText}>
          History / Loaded Pages #
          <FlipNumbers
            height={16}
            width={16}
            duration={1}
            play
            numbers={`${pageNumber}`}
          />
        </span>
      )}
      {/* {pathname.split('/')[1] === 'order' && (
        <h1 className={css.dashboardText}> Current order</h1>
      )} */}
    </>
  );
};
