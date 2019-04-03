import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const RefreshContext = React.createContext([false, () => {}]);

export const RefreshProvider = ({ children }) => {
  const [refresh, toggleRefresh] = useState(false);

  return <RefreshContext.Provider value={[refresh, toggleRefresh]}>{children}</RefreshContext.Provider>;
};

RefreshProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
