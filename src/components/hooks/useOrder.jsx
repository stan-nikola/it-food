import { useSelector } from 'react-redux';
import {
  selectIsOrderAdded,
  selectLastOrder,
  selectOrderError,
  selectOrderLoading,
  selectOrderedDish,
} from 'redux/order/selectors';

export const useOrder = () => {
  const orderedDish = useSelector(selectOrderedDish);
  const orderError = useSelector(selectOrderError);
  const orderLoading = useSelector(selectOrderLoading);
  const isOrderAdded = useSelector(selectIsOrderAdded);
  const lastOrder = useSelector(selectLastOrder);

  return {
    orderError,
    orderedDish,
    orderLoading,
    isOrderAdded,
    lastOrder,
  };
};
