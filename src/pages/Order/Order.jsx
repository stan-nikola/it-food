import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLastOrder } from 'redux/order/operations';

export const Order = () => {
  const { user, isLoggedIn } = useAuth();
  const { lastOrder } = useOrder();

  const { phone } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    (phone || isLoggedIn) &&
      dispatch(getLastOrder(isLoggedIn ? null : { phone }));
  }, [dispatch, isLoggedIn, phone]);

  return (
    <section>
      {lastOrder && (
        <div>
          <h1># {lastOrder.orderNumber}</h1>
          <p>Option :{lastOrder.option}</p>
          {/* <ul>{lastOrder.dishes.map()}</ul> */}
        </div>
      )}
    </section>
  );
};
