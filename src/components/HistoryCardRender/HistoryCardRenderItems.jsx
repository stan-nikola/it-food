import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './HistoryCardRender.module.css';

import { deleteOrder, getOrderCount } from 'redux/order/operations';

import { AiOutlineCalendar, AiOutlineNumber } from 'react-icons/ai';

import {
  AiFillCaretDown,
  AiOutlineFileDone,
  AiOutlineFileExcel,
  AiOutlineDelete,
  AiOutlineEdit,
  AiTwotoneDelete,
} from 'react-icons/ai';
import { Cash, Gift, MasterCard, Visa } from 'images';

import { OrderedDishesAccordion } from 'components/OrderedDishesAccordion';

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
    totalPrice,
    updatedAt,
    totalWithTipsPrice,
    confirmed,
  } = props;
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteOrder = _id => {
    setDeleteLoading(true);
    dispatch(deleteOrder({ _id }));
    dispatch(getOrderCount());
  };

  const handleEditOrder = id => {
    navigate(`/order/${id}`);
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
          <span>
            <AiOutlineNumber />
          </span>
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
            <p className={s.order_item_title}>Tips</p>
            <p className={s.order_item_value}>{tipAmount}%</p>
          </div>
          <div className={s.order_item}>
            <p className={s.order_item_title}>Gift Coins</p>
            <p className={s.order_item_value}>{giftCoin}</p>
          </div>
          <div className={s.order_item}>
            <p className={s.order_item_title}>Total</p>
            <p className={s.order_item_value}>{totalPrice}$</p>
          </div>
          <div className={s.order_item}>
            <p className={s.order_item_title}>Total with tips</p>
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
              style={{ color: '#ff0101' }}
              className={s.order_item_confirmed_icon}
            />
          )}
        </p>
      </div>
    </li>
  );
};
