import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const EditLinksContext = React.createContext([false, () => {}]);

export const EditLinksProvider = ({ children }) => {
  const [canEditLinks, toggleEditLinks] = useState(false);

  return <EditLinksContext.Provider value={[canEditLinks, toggleEditLinks]}>{children}</EditLinksContext.Provider>;
};

EditLinksProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
