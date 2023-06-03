import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');
// const body = document.querySelector('body');

export const Modal = ({ modalToggle, children }) => {
  const [isMounted, setIsisMounted] = useState(false);

  useEffect(() => {
    setIsisMounted(true);
  }, []);

  // useEffect(() => {
  //   setIsisMounted(true);
  //   if (!body) {
  //     return;
  //   }

  //   body.style.margin = isMounted ? '0' : '';
  //   body.style.height = isMounted ? '100%' : '';
  //   body.style.overflowY = isMounted ? 'hidden' : 'scroll';

  //   return () => {
  //     body.style = '';
  //   };
  // }, [isMounted]);

  const handleMultiClose = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      setIsisMounted(false);
      setTimeout(() => {
        modalToggle();
      }, 250);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleMultiClose);

    return () => {
      window.removeEventListener('keydown', handleMultiClose);
    };
  });

  return createPortal(
    <div
      className={`${s.backdrop} ${!isMounted ? s.backdrop_unmount : ''}`}
      onClick={handleMultiClose}
    >
      <div className={`${s.modal} ${!isMounted ? s.modal_unmount : ''}`}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
