import React from 'react';
import linkReducer from '@/state/reducers/LinksReducer';
import PropTypes from 'prop-types';

export const LinksContext = React.createContext({ state: {}, dispatch: () => {} });

export const LinksProvider = ({ children }) => {
  const [{ links, categories }, dispatch] = linkReducer();
  return <LinksContext.Provider value={[{ links, categories }, dispatch]}>{children}</LinksContext.Provider>;
};

LinksProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
