import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ modalToggle, children, styles }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMultiClose = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      setIsMounted(false);
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
      onMouseDown={handleMultiClose}
    >
      <div
        className={`${styles.modal} ${!isMounted ? styles.modal_unmount : ''}`}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};
