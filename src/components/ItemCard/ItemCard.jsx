import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import css from './ItemCard.module.css';

import { addDish } from 'redux/order/orderSlice';
import {
  // getFavoriteDishes,
  addFavoriteDishes,
  deleteFromFavoriteDishes,
} from '../../redux/user/operations';

import { useOrder } from 'components/hooks/useOrder';

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { selectFavorite } from 'redux/auth/selectors';

import { Modal } from 'components/Modal';
import { MoreInfo } from './MoreInfo/MoreInfo';

export const ItemCard = ({ dish }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [addNoteShow, setAddNoteShow] = useState(false);
  const [moreInfoShow, setMoreInfoShow] = useState(false);
  const [isFavorite, setIsFavorite] = useState();

  const { _id: id, description, preview, thumb, title, price } = dish;

  const dispatch = useDispatch();

  const { orderedDish } = useOrder();

  const arrayOfFavoriteID = useSelector(selectFavorite);
  // console.log('arrayOfFavoriteID=', arrayOfFavoriteID);

  const modalToggle = () => {
    setAddNoteShow(prev => !prev);
  };

  const moreInfoToggle = () => {
    setMoreInfoShow(prev => !prev);
  };

  // const isFavoriteToggle = () => {
  //   setIsFavorite(prev => !prev);
  // };

  useEffect(() => {
    if (arrayOfFavoriteID.includes(id)) {
      setIsFavorite(true);
    } else setIsFavorite(false);
    // console.log('isFavorite=', isFavorite);
  }, [arrayOfFavoriteID, id]);

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
        // onMouseOver={moreInfoToggle}
        // onMouseOut={moreInfoToggle}
      >
        <button type="button" onClick={modalToggle} className={css.wrapper}>
          <div
            className={css.imageWrapper}
            onMouseOver={moreInfoToggle}
            onMouseOut={moreInfoToggle}
          >
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
        <div className={css.favoriteIconWraper}>
          {!isFavorite ? (
            <button
              onClick={() => {
                // console.log('id for tranfer = ', id);
                dispatch(addFavoriteDishes(id));
                // isFavoriteToggle();
                // moreInfoToggle();
              }}
              // onClick={() => {
              //   dispatch(addDish(id));
              //   modalToggle();
              // }}
              type="button"
              className={css.favoriteIcon}
            >
              {/* <MdFavoriteBorder className={css.icon} /> */}
              <IconContext.Provider
                value={{
                  style: {
                    verticalAlign: 'middle',
                    color: 'red',
                    width: '25',
                    height: '25',
                  },
                }}
                // { color: 'blue', width: '35', className: 'icon' }}
              >
                <div>
                  <MdFavoriteBorder />
                </div>
              </IconContext.Provider>
              {/* <MdFavoriteBorder value={{ className: 'icon' }} /> */}
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(deleteFromFavoriteDishes(id));
                // dispatch(getFavoriteDishes('favorite'));
                // isFavoriteToggle();
                // moreInfoToggle();
              }}
              type="button"
              className={css.favoriteIcon}
            >
              <IconContext.Provider
                value={{
                  style: {
                    verticalAlign: 'middle',
                    color: 'red',
                    width: '25',
                    height: '25',
                  },
                }}
              >
                <div>
                  <MdFavorite />
                </div>
              </IconContext.Provider>
              {/* <MdFavorite /> */}
            </button>
          )}
          {/* <MdFavoriteBorder />
              <MdFavorite /> */}
        </div>

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
                  {!isFavorite ? (
                    <button
                      onClick={() => {
                        console.log('id for tranfer = ', id);
                        dispatch(addFavoriteDishes(id));
                        // isFavoriteToggle();
                        // moreInfoToggle();
                      }}
                      type="button"
                      className={css.buttonModal}
                    >
                      Add to favorite
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(deleteFromFavoriteDishes(id));
                        // dispatch(getFavoriteDishes('favorite'));
                        // isFavoriteToggle();
                        // moreInfoToggle();
                      }}
                      type="button"
                      className={css.buttonModal}
                    >
                      Remove from favorite
                    </button>
                  )}
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
