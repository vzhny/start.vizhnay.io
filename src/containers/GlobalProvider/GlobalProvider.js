import React from 'react';
import PropTypes from 'prop-types';
import { RefreshProvider } from '@/state/context/RefreshContext';
import { LinksProvider } from '@/state/context/LinksContext';
import { AuthProvider } from '@/state/context/AuthContext';
import { EditLinksProvider } from '@/state/context/EditLinksContext';

const GlobalProvider = ({ children }) => {
  return (
    <RefreshProvider>
      <LinksProvider>
        <AuthProvider>
          <EditLinksProvider>{children}</EditLinksProvider>
        </AuthProvider>
      </LinksProvider>
    </RefreshProvider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default GlobalProvider;
