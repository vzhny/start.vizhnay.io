import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { loader, bounce1, bounce2, bounce3, dark, light } from './Loader.module.scss';

const Loader = ({ light: lightColor }) => (
  <div className={loader}>
    <div className={clsx(lightColor ? clsx(bounce1, light) : clsx(bounce1, dark))} />
    <div className={clsx(lightColor ? clsx(bounce2, light) : clsx(bounce2, dark))} />
    <div className={clsx(lightColor ? clsx(bounce3, light) : clsx(bounce3, dark))} />
  </div>
);

Loader.defaultProps = {
  light: false,
};

Loader.propTypes = {
  light: PropTypes.bool,
};

export default Loader;
