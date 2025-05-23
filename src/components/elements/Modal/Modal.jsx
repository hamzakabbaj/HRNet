import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ children, isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className={styles.container} onClick={handleOverlayClick}>
      <div className={styles.container__modal}>
        <button
          className={styles.container__modal__close}
          onClick={handleCloseClick}
        >
          ×
        </button>
        <div className={styles.container__modal__content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
