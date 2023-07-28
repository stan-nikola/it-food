import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
  selectIsError,
  selectIsLoading,
  selectFavorite,
} from 'redux/auth/selectors';
import { selectDish, selectIsDishLoaded } from 'redux/dish/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const dish = useSelector(selectDish);
  const dishIsLoaded = useSelector(selectIsDishLoaded);
  const favorite = useSelector(selectFavorite);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    token,
    isError,
    isLoading,
    dish,
    dishIsLoaded,
    favorite,
  };
};
