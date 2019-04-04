import React from 'react';
import PropTypes from 'prop-types';
import { RefreshProvider } from '@/state/context/RefreshContext';
import { LinksProvider } from '@/state/context/LinksContext';
import { AuthProvider } from '@/state/context/AuthContext';

const GlobalContext = ({ children }) => {
  return (
    <RefreshProvider>
      <LinksProvider>
        <AuthProvider>{children}</AuthProvider>
      </LinksProvider>
    </RefreshProvider>
  );
};

GlobalContext.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default GlobalContext;
