import { useDispatch } from 'react-redux';
import s from './HistoryCardRender.module.css';
import { useEffect, useState } from 'react';
import { deleteOrder, getUserOrder } from 'redux/order/operations';
import { useAuth } from 'components/hooks/useAuth';
import { useOrder } from 'components/hooks/useOrder';
import { AiOutlineCalendar } from 'react-icons/ai';

import { ReactComponent as Cash } from '../../images/svg/cash.svg';
import { ReactComponent as MasterCard } from '../../images/svg/master-card.svg';
import { ReactComponent as Visa } from '../../images/svg/Visa.svg';
import { ReactComponent as Gift } from '../../images/svg/giftCard.svg';
import {
  AiFillCaretDown,
  AiOutlineFileDone,
  AiOutlineFileExcel,
  AiOutlineDelete,
  AiOutlineEdit,
  AiTwotoneDelete,
} from 'react-icons/ai';
import { OrderedDishesAccordion } from 'components/OrderedDishesAccordion/OrderedDishesAccordion';
import { useNavigate } from 'react-router-dom';

export const HistoryCardRenderItems = ({ props }) => {
  const {
    _id,
    giftCoin,
    note,
    option,
    orderNumber,
    orderedDish,
    paymentMethod,
    tipAmount,
    totalWithTipsPrice,
    updatedAt,
    confirmed,
  } = props;
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { orderLoading } = useOrder();

  useEffect(() => {
    isLoggedIn && dispatch(getUserOrder());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    orderLoading && isLoggedIn && dispatch(getUserOrder());
  }, [dispatch, isLoggedIn, orderLoading]);

  const handleDeleteOrder = _id => {
    setDeleteLoading(true);
    dispatch(deleteOrder({ _id }));
  };

  const handleEditOrder = _id => {
    navigate(`/order/${_id}`);
  };

  return (
    <li className={s.order_card}>
      <div className={s.order_date_wrapper}>
        <p className={s.order_date}>
          <span>
            <AiOutlineCalendar />
          </span>
          {updatedAt.slice(0, 10)}
        </p>
        <p className={s.order_date}>
          <span>#</span>
          {orderNumber}
        </p>
      </div>
      <div className={s.order_item}>
        <p className={s.order_item_title}> Option</p>
        <p
          className={`${s.order_option} ${
            (option === 'dinein' && s.orderOption_dineIn) ||
            (option === 'delivery' && s.orderOption_delivery) ||
            (option === 'pickup' && s.orderOption_pickup)
          }`}
        >
          <span>{option}</span>
        </p>
      </div>

      <div className={s.order_item}>
        <p className={s.order_item_title}>Payment</p>
        {paymentMethod === 'cash' && (
          <Cash className={s.order_item_title_icon} />
        )}
        {paymentMethod === 'mastercard' && <MasterCard />}
        {paymentMethod === 'visa' && (
          <Visa className={s.order_item_title_icon} />
        )}
        {paymentMethod === 'gift' && (
          <Gift className={s.order_item_title_icon} />
        )}
      </div>
      {confirmed && (
        <div className={s.order_item}>
          <p className={s.order_item_title}>Tips</p>
          <p className={s.order_item_value}>{tipAmount}%</p>
        </div>
      )}
      <div className={s.order_item}>
        <OrderedDishesAccordion orderedDish={orderedDish} />
      </div>
      <div className={s.order_item}>
        <p className={s.order_item_title}>Note</p>
        <div className={s.order_item_text}>
          <AiFillCaretDown className={s.order_item_icon} />
          <span className={s.order_item_text_show}>
            {note ? note : 'Note not added'}
          </span>
        </div>
      </div>
      {confirmed && (
        <>
          <div className={s.order_item}>
            <p className={s.order_item_title}>Gift Coins</p>
            <p className={s.order_item_value}>{giftCoin}</p>
          </div>
          <div className={s.order_item}>
            <p className={s.order_item_title}>Total</p>
            <p className={s.order_item_value}>{totalWithTipsPrice}$</p>
          </div>
          <div className={s.order_item}>
            <p className={s.order_item_title}>Total</p>
            <p className={s.order_item_value}>{totalWithTipsPrice}$</p>
          </div>
        </>
      )}
      {!confirmed && (
        <div className={s.order_item_change_btn}>
          <button
            onClick={() => handleDeleteOrder(_id)}
            className={`${s.order_change_btn} ${s.order_change_delete_btn}`}
          >
            {deleteLoading ? <AiTwotoneDelete /> : <AiOutlineDelete />}
            <p>{deleteLoading ? 'Working...' : 'Delete'}</p>
          </button>
          <button
            onClick={() => handleEditOrder(_id)}
            className={`${s.order_change_btn} ${s.order_change_edit_btn}`}
          >
            <AiOutlineEdit />
            <p>Edit</p>
          </button>
        </div>
      )}
      <div className={s.order_item}>
        <p className={s.order_item_title}>Confirmed</p>
        <p className={s.order_item_value}>
          {confirmed ? (
            <AiOutlineFileDone
              style={{ color: '#01d12b' }}
              className={s.order_item_confirmed_icon}
            />
          ) : (
            <AiOutlineFileExcel
              style={{ color: '#ff5c00' }}
              className={s.order_item_confirmed_icon}
            />
          )}
        </p>
      </div>
    </li>
  );
};
