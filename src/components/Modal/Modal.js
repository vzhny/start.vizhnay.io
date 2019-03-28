import React, { useEffect } from 'react';
import clsx from 'clsx';
import Backdrop from '@/components/Backdrop/Backdrop';
import PropTypes from 'prop-types';
import { modal, open, closed, closeButton } from './Modal.module.scss';

const Modal = ({ children, isVisible, toggleVisibility }) => {
  const handleEscKey = e => {
    const { keyCode } = e;
    const escKey = 27;

    if (keyCode === escKey) {
      e.preventDefault();
      toggleVisibility(false);
      window.removeEventListener('keyup', handleEscKey);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleEscKey);

    return () => {
      window.removeEventListener('keyup', handleEscKey);
    };
  });

  return (
    <>
      <Backdrop isVisible={isVisible} toggleVisibility={toggleVisibility} />
      <div className={clsx(modal, isVisible ? open : closed)}>
        <button className={closeButton} onClick={() => toggleVisibility(false)} type="button">
          &times;
        </button>
        {children}
      </div>
    </>
  );
};

Modal.defaultProps = {
  isVisible: false,
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isVisible: PropTypes.bool,
  toggleVisibility: PropTypes.func.isRequired,
};

export default Modal;
