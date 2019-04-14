import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Backdrop from '@/components/Backdrop/Backdrop';
import closeIcon from '@/images/close.svg';
import { modalContainer, modal, open, closeButton, closeButtonIcon } from './Modal.module.scss';

const Modal = ({ children, animate, toggleClose }) => {
  const handleEscKey = e => {
    const { keyCode } = e;
    const escKey = 27;

    if (keyCode === escKey) {
      e.preventDefault();
      toggleClose();
      window.removeEventListener('keyup', handleEscKey);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleEscKey);

    return () => {
      window.removeEventListener('keyup', handleEscKey);
    };
  });

  return ReactDOM.createPortal(
    <div className={modalContainer}>
      <Backdrop animate={animate} toggleClose={toggleClose} />
      <div className={clsx(modal, animate && open)}>
        <button className={closeButton} onClick={() => toggleClose()} type="button">
          <img alt="Close Button" className={closeButtonIcon} src={closeIcon} />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('app')
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  animate: PropTypes.bool.isRequired,
  toggleClose: PropTypes.func.isRequired,
};

export default Modal;
