import { useEffect, useState } from 'react';
import s from './OrderedDishesAccordion.module.css';

import { AiFillCaretDown } from 'react-icons/ai';
import { AccordionItems } from './AccordionItems';

export const OrderedDishesAccordion = ({ orderedDish }) => {
  const [target, setTarget] = useState(null);
  const [dishesShow, setDishesShow] = useState(false);

  useEffect(() => {
    return () => {
      dishesShow &&
        target &&
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
    };
  }, [dishesShow, target]);

  const handleClick = e => {
    setTarget(e.currentTarget.firstChild.firstChild);
  };

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
          onClick={handleClick}
          className={`${s.dishes_content} 
          ${dishesShow && s.dishes_content_show}`}
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
                }}
              />
            ))}
            <AiFillCaretDown
              className={`${s.dishes_button_icon} ${
                dishesShow && s.dishes_button_icon_show
              } `}
            />
          </ul>
        </div>
      </button>
    </div>
  );
};
