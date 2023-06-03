import { useEffect } from 'react';

import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export function Modal({ modalToggle, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleMultiClose);

    return () => {
      window.removeEventListener('keydown', handleMultiClose);
    };
  });

  const handleMultiClose = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      modalToggle();
    }
  };
  return createPortal(
    <div className={s.backdrop} onClick={handleMultiClose}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
