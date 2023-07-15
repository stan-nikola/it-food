import { useRef, useState } from 'react';
import s from './OrderedDishesAccordion.module.css';
import { useDraggable } from 'react-use-draggable-scroll';
import { AiFillCaretDown } from 'react-icons/ai';
import { AccordionItems } from './AccordionItems';

export const OrderedDishesAccordion = ({ orderedDish }) => {
  const [dishesShow, setDishesShow] = useState(false);
  const containerRef = useRef(null);
  const { events } = useDraggable(containerRef);

  return (
    <div>
      <div
        onClick={() => setDishesShow(prev => !prev)}
        className={`${s.dishes_button} ${
          dishesShow && s.dishes_button_item_show
        }`}
      >
        <div
          {...events}
          ref={containerRef}
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
      </div>
    </div>
  );
};
