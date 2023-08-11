import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import css from './ItemCard.module.css';
import topBarCss from '../TopBar/TopBar.module.css';

import { addDish } from 'redux/order/orderSlice';
import {
  // getFavoriteDishes,
  addFavoriteDishes,
  deleteFromFavoriteDishes,
} from '../../redux/user/operations';

import { useOrder } from 'components/hooks/useOrder';

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
// import { IconContext } from 'react-icons';
import { selectFavorite } from 'redux/auth/selectors';
import { selectToken } from '../../redux/auth/selectors';

import { Modal } from 'components/Modal';
import { MoreInfo } from './MoreInfo/MoreInfo';
import { useAuth } from 'components/hooks/useAuth';
import { SignUpForm } from 'components/AuthForm';

export const ItemCard = ({ dish }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [addNoteShow, setAddNoteShow] = useState(false);

  const [moreInfoShow, setMoreInfoShow] = useState(false);
  const [isFavorite, setIsFavorite] = useState();

  const [signUpFormShow, setSignUpFormShow] = useState(false);

  const { _id: id, description, preview, thumb, title, price } = dish;

  const userToken = useSelector(selectToken);

  const dispatch = useDispatch();

  const { orderedDish } = useOrder();
  const { isLoggedIn } = useAuth();

  const arrayOfFavoriteID = useSelector(selectFavorite);
  // console.log('arrayOfFavoriteID=', arrayOfFavoriteID);

  const modalToggle = () => {
    setAddNoteShow(false);
    setSignUpFormShow(false);
  };

  const moreInfoToggle = () => {
    setMoreInfoShow(prev => !prev);
  };

  const isFavoriteToggle = () => {
    setIsFavorite(prev => !prev);
  };

  useEffect(() => {
    if (arrayOfFavoriteID?.includes(id)) {
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
        <button
          type="button"
          onClick={() => setAddNoteShow(prev => !prev)}
          className={css.wrapper}
        >
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
          {/* <h1 className={css.foodName}>{title}</h1> */}
        </button>
        <div className={css.favoriteIconWraper}>
          {isLoggedIn ? (
            <>
              {!isFavorite ? (
                <button
                  onClick={() => {
                    // console.log('id for tranfer = ', id);
                    if (userToken) {
                      dispatch(addFavoriteDishes(id));
                    }

                    isFavoriteToggle();
                    moreInfoToggle();
                  }}
                  type="button"
                  className={css.favoriteIcon}
                >
                  <div className={css.icon}>
                    <MdFavoriteBorder />
                  </div>

                  {/* <MdFavoriteBorder value={{ className: 'icon' }} /> */}
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(deleteFromFavoriteDishes(id));
                    isFavoriteToggle();
                    moreInfoToggle();
                  }}
                  type="button"
                  className={css.favoriteIcon}
                >
                  <div className={css.icon}>
                    <MdFavorite />
                  </div>
                  {/* <IconContext.Provider
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
              </IconContext.Provider> */}
                  {/* <MdFavorite /> */}
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => setSignUpFormShow(prev => !prev)}
              type="button"
              className={css.favoriteIcon}
            >
              <MdFavoriteBorder className={css.favorite_button_disable} />
            </button>
          )}
        </div>

        <h1 className={css.foodName}>{title}</h1>

        <p className={css.foodPrice}>Price: $ {price}</p>

        <div className={css.buttonsWrapper}>
          <button
            onClick={() => dispatch(addDish(id))}
            type="button"
            className={css.button}
          >
            {isDishOrdered ? 'Ordered' : 'Order now'}
          </button>
        </div>
      </div>

      {(addNoteShow || signUpFormShow) && (
        <Modal modalToggle={modalToggle} styles={addNoteShow ? css : topBarCss}>
          {addNoteShow && (
            <div className={css.modalWrapper}>
              <div className={css.modalDataWrapper}>
                <img
                  // className={`${!isImgLoaded && css.image_hide}`}
                  className={css.imageModal}
                  // onLoad={() => setIsImgLoaded(prev => !prev)}
                  src={thumb}
                  alt={title}
                />
                {isFavorite && (
                  <div className={css.modalFavIconWrapper}>
                    <MdFavorite />
                  </div>
                )}
                <div className={css.modalDataTextWrapper}>
                  <h2 className={css.foodNameModal}>{title}</h2>

                  <p className={css.descriptionModal}>{description}</p>
                  <p className={css.foodPriceModal}>Price: $ {price}</p>
                  <div className={css.buttonsModalWrapper}>
                    {!isFavorite ? (
                      <button
                        onClick={() => {
                          // console.log('id for tranfer = ', id);
                          if (isLoggedIn) {
                            dispatch(addFavoriteDishes(id));
                          } else {
                            setAddNoteShow(prev => !prev);
                            setTimeout(() => {
                              setSignUpFormShow(prev => !prev);
                            }, 100);
                          }
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
          )}
          {signUpFormShow && <SignUpForm />}
        </Modal>
      )}
    </>
  );
};

/* <p className={css.cardFavInfo}>
   Only logged users can add dishes to Favorites
 </p>; */
