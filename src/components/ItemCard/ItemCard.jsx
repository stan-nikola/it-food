import { useState } from 'react';
import css from './ItemCard.module.css';
import { Modal } from '../Modal/Modal';
import { MoreInfo } from '../ItemCard/MoreInfo/MoreInfo';
import { useDispatch } from 'react-redux';
import { addDish } from 'redux/order/orderSlice';

import { useOrder } from 'components/hooks/useOrder';

export const ItemCard = ({ dish }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [addNoteShow, setAddNoteShow] = useState(false);
  const [moreInfoShow, setmoreInfoShow] = useState(false);

  const { _id: id, description, preview, thumb, title, price } = dish;

  const dispatch = useDispatch();

  const { orderedDish } = useOrder();

  const modalToggle = () => {
    setAddNoteShow(prev => !prev);
  };

  const moreInfoToggle = () => {
    setmoreInfoShow(prev => !prev);
  };

  const isDishOrdered = orderedDish.some(item => item.id === id);

  // //Получаем точку
  // const point = document.querySelector('#card');
  // console.log('point=', point);

  // //Вешаем обработчик
  // //срабатывает при заходе курсора на элемент
  // point.addEventListener('mouseover', function () {
  //   this.style.backgroundColor = 'gray';
  // });
  // //срабатывает при уходе курсора с элемента
  // // point.addEventListener('mouseout', function () {
  // //   this.style.backgroundColor = 'white';
  // // });

  return (
    <>
      <div
        className={css.card}
        onMouseOver={moreInfoToggle}
        onMouseOut={moreInfoToggle}
      >
        <button type="button" onClick={modalToggle} className={css.wrapper}>
          <div className={css.imageWrapper}>
            <img
              className={`${!isImgLoaded && css.image_hide}`}
              onLoad={() => setIsImgLoaded(prev => !prev)}
              src={preview}
              alt={title}
              width="203"
            />
            {!isImgLoaded && <div className={css.isLoadingCard}></div>}
          </div>
          {moreInfoShow && (
            <div className={css.moreInfo}>
              <MoreInfo styles={css} />
            </div>
          )}
          <h1 className={css.foodName}>{title}</h1>
        </button>

        <p className={css.foodPrice}>Price: $ {price}</p>

        <div className={css.buttonsWrapper}>
          {/* <button onClick={modalToggle} type="button" className={css.button}>
            More info
          </button> */}
          <button
            onClick={() => dispatch(addDish(id))}
            type="button"
            className={css.button}
          >
            {isDishOrdered ? 'Ordered' : 'Order now'}
          </button>
        </div>
      </div>

      {addNoteShow && (
        <Modal modalToggle={modalToggle} styles={css}>
          <div className={css.modalWrapper}>
            <div className={css.modalDataWrapper}>
              <img
                // className={`${!isImgLoaded && css.image_hide}`}
                className={css.imageModal}
                // onLoad={() => setIsImgLoaded(prev => !prev)}
                src={thumb}
                alt={title}
              />
              <div className={css.modalDataTextWrapper}>
                <h2 className={css.foodNameModal}>{title}</h2>

                <p className={css.descriptionModal}>{description}</p>
                <p className={css.foodPriceModal}>Price: $ {price}</p>
                <div className={css.buttonsModalWrapper}>
                  <button
                    onClick={modalToggle}
                    type="button"
                    className={css.buttonModal}
                  >
                    Add to favorite
                  </button>
                  <button
                    onClick={() => {
                      dispatch(addDish(id));
                      modalToggle();
                    }}
                    type="button"
                    className={css.buttonModal}
                  >
                    Order now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
