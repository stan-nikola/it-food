import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
  selectIsError,
  selectIsLoading,
} from 'redux/auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    token,
    isError,
    isLoading,
  };
};
