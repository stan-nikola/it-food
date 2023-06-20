import { DishCardRender } from 'components/DishCardRender/DishCardRender';
import { Route, Routes, useLocation } from 'react-router-dom';

export const DishBlock = () => {
  const { pathname } = useLocation();

  return (
    <Routes>
      <Route
        index
        path="/main"
        element={<DishCardRender pathname={pathname} />}
      ></Route>
      <Route
        index
        path="/meat"
        element={<DishCardRender pathname={pathname} />}
      ></Route>
      <Route
        index
        path="/dessert"
        element={<DishCardRender pathname={pathname} />}
      ></Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};
