import { useEffect, useRef, useState } from 'react';
import s from './OrderedDishesAccordion.module.css';
import { useDraggable } from 'react-use-draggable-scroll';
import { AiFillCaretDown } from 'react-icons/ai';
import { AccordionItems } from './AccordionItems';

export const OrderedDishesAccordion = ({ orderedDish }) => {
  const [target, setTarget] = useState(null);
  const [dishesShow, setDishesShow] = useState(false);
  const containerRef = useRef(null);
  const { events } = useDraggable(containerRef);

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
    setTarget(
      document.getElementById(e.currentTarget.firstChild.firstChild.id)
    );
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
          {...events}
          onMouseEnter={handleClick}
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
      </button>
    </div>
  );
};
