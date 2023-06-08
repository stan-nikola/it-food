import { useEffect, useState } from 'react';
import { ItemCard } from '../ItemCard/ItemCard';
import css from './ItemCardSet.module.css';
import axios from 'axios';

import { arrayOfCards } from '../../../src/recipes-17';

axios.defaults.baseURL = 'http://localhost:3000/api/';

export const ItemCardSet = async () => {
  // const { } = useState()

  // useEffect(() => {
  //   const res = fetchAllItems();
  //   console.log('res=', res);
  // }, []);

  // const arrayOfCards = JSON.parse(res);
  const arrayOfCards = await fetchAllItems();
  console.log('arrayOfCards=', arrayOfCards);
  // const q = []
  // console.log('arrayOfCards=', arrayOfCards);
  // console.log(typeof arrayOfCards);

  return (
    <>
      <ul className={css.itemCardSet}>
        {arrayOfCards.map(item => {
          console.log(item);
          const { _id, preview, title, price } = item;
          return (
            <li key={_id}>
              <ItemCard imgUrl={preview} name={title} price={price} />
            </li>
          );
        })}
        <ItemCard />
      </ul>
    </>
  );
};

const fetchAllItems = async () => {
  try {
    const response = await axios.get('/items');
    // const x = response.data;
    // console.log('DATA=', x);
    // console.log(typeof x);
    // console.log('response=', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
