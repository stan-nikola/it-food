import { useSelector } from 'react-redux';
import { selectOrderedDish } from 'redux/order/selectors';

export const useOrder = () => {
  const orderedDish = useSelector(selectOrderedDish);

  return {
    orderedDish,
  };
};
