import { useSelector } from 'react-redux';
import {
  selectIsOrderAdded,
  selectLastOrder,
  selectOrderError,
  selectOrderLoading,
  selectOrderedDish,
  selectUserOrder,
} from 'redux/order/selectors';

export const useOrder = () => {
  const orderedDish = useSelector(selectOrderedDish);
  const orderError = useSelector(selectOrderError);
  const orderLoading = useSelector(selectOrderLoading);
  const isOrderAdded = useSelector(selectIsOrderAdded);
  const lastOrder = useSelector(selectLastOrder);
  const userOrder = useSelector(selectUserOrder);

  return {
    orderError,
    orderedDish,
    orderLoading,
    isOrderAdded,
    lastOrder,
    userOrder,
  };
};
