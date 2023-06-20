import { useSelector } from 'react-redux';

import { selectDish, selectIsDishLoaded } from 'redux/dish/selectors';

export const useDish = () => {
  const dish = useSelector(selectDish);
  const dishIsLoaded = useSelector(selectIsDishLoaded);

  return {
    dish,
    dishIsLoaded,
  };
};
