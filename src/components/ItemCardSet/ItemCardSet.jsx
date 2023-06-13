// import { useEffect, useState } from 'react';
import { arrayOfCards } from 'recipes-17';
import { ItemCard } from '../ItemCard/ItemCard';
import css from './ItemCardSet.module.css';
// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000/api/';

export const ItemCardSet = () => {
  // const [arrayOfCards, setArrayOfCards] = useState([]);

  // useEffect(() => {
  //   fetchAllItems().then(data => setArrayOfCards(data));
  // }, []);

  return (
    <>
      <ul className={css.itemCardSet}>
        {arrayOfCards.map(item => {
          const { _id, preview, title, price } = item;
          return (
            <li key={_id}>
              <ItemCard imgUrl={preview} name={title} price={price} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

// const fetchAllItems = async () => {
//   try {
//     const response = await axios.get('/items');
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
