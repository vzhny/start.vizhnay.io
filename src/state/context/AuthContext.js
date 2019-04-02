import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext([false, () => {}]);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
