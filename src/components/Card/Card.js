import React from 'react';
import PropTypes from 'prop-types';
import { card, cardHeader, cardBody, cardFooter } from './Card.module.scss';

export const CardHeader = ({ children }) => <div className={cardHeader}>{children}</div>;

export const CardBody = ({ children }) => <div className={cardBody}>{children}</div>;

export const CardFooter = ({ children }) => <div className={cardFooter}>{children}</div>;

const Card = ({ children }) => {
  return <div className={card}>{children}</div>;
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
