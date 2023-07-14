import { useState } from 'react';
import s from './OrderedDishesAccordion.module.css';

import { AiFillCaretDown } from 'react-icons/ai';
import { AccordionItems } from './AccordionItems';

export const OrderedDishesAccordion = ({ orderedDish }) => {
  const [dishesShow, setDishesShow] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setDishesShow(prev => !prev)}
        className={`${s.dishes_button} ${
          dishesShow && s.dishes_button_item_show
        }`}
      >
        <div
          className={`${s.dishes_content} ${
            dishesShow && s.dishes_content_show
          }`}
        >
          <ul>
            {orderedDish.map(({ _id, preview, title, price, quantity }) => (
              <AccordionItems
                key={_id}
                props={{
                  _id,
                  preview,
                  title,
                  price,
                  quantity,
                  dishesShow,
                  orderedDish,
                }}
              />
            ))}
          </ul>
          <AiFillCaretDown
            className={`${s.dishes_button_icon} ${
              dishesShow && s.dishes_button_icon_show
            } `}
          />
        </div>
      </button>
    </div>
  );
};
