import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Backdrop from '@/components/Backdrop/Backdrop';
import cross from '@/images/cross.svg';
import { modal, open, closeButton, closeButtonIcon } from './Modal.module.scss';

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
      <div className={clsx(modal, isVisible && open)}>
        <button className={closeButton} onClick={() => toggleVisibility(false)} type="button">
          <img alt="Close Button" className={closeButtonIcon} src={cross} />
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
