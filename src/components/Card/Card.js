import React from 'react';
import PropTypes from 'prop-types';
import { card, cardHeader, cardBody, cardFooter } from './Card.module.scss';

export const CardHeader = ({ children, ...props }) => (
  <div {...props} className={cardHeader}>
    {children}
  </div>
);

export const CardBody = ({ children, ...props }) => (
  <div {...props} className={cardBody}>
    {children}
  </div>
);

export const CardFooter = ({ children, ...props }) => (
  <div {...props} className={cardFooter}>
    {children}
  </div>
);

const Card = ({ children, ...props }) => {
  return (
    <div {...props} className={card}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

CardBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

CardFooter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Card;
