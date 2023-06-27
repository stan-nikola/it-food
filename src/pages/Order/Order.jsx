import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLastOrder } from 'redux/order/operations';

export const Order = () => {
  const { user, isLoggedIn } = useAuth();
  const { lastOrder } = useOrder();

  const { phone } = user;
  console.log('Order => lastOrder:', lastOrder);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLastOrder(isLoggedIn ? null : { phone }));
  }, [dispatch, isLoggedIn, phone]);

  return (
    <main>
      <h1>AAAAAAAA</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
        laborum amet ab cumque sit nihil dolore modi error repudiandae
        perspiciatis atque voluptas corrupti, doloribus ex maiores quam magni
        mollitia illum dolor quis alias in sequi quod. Sunt ex numquam hic
        asperiores facere natus sapiente cum neque laudantium quam, expedita
        voluptates atque quia aspernatur saepe illo, rem quasi praesentium
        aliquid sed inventore obcaecati veniam? Nisi magnam vero, dolore
        praesentium totam ducimus similique asperiores culpa, eius amet
        repudiandae quam ut. Architecto commodi, tempore ut nostrum voluptas
        dolorum illum voluptatum dolores! Quas perferendis quis alias excepturi
        eaque voluptatibus eveniet error, nulla rem iusto?
      </p>
    </main>
  );
};
