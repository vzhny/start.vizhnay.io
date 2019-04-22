import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { backdrop, visible } from './Backdrop.module.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/aria-role */

const Backdrop = ({ animate, toggleClose }) => {
  return (
    <div
      className={clsx(backdrop, animate && visible)}
      onClick={() => toggleClose()}
      onKeyPress={() => toggleClose()}
      role="backdrop"
    />
  );
};

Backdrop.propTypes = {
  animate: PropTypes.bool.isRequired,
  toggleClose: PropTypes.func.isRequired,
};

export default Backdrop;
