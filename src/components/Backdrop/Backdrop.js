import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { backdrop, visible } from './Backdrop.module.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/aria-role */

const Backdrop = ({ isVisible, toggleVisibility }) => {
  return (
    <div
      className={clsx(backdrop, isVisible && visible)}
      onClick={() => toggleVisibility(false)}
      onKeyPress={() => toggleVisibility(false)}
      role="backdrop"
    />
  );
};

Backdrop.defaultProps = {
  isVisible: false,
};

Backdrop.propTypes = {
  isVisible: PropTypes.bool,
  toggleVisibility: PropTypes.func.isRequired,
};

export default Backdrop;
