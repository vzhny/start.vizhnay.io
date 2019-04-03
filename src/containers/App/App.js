import React, { useLayoutEffect } from 'react';
import { getGreeting } from '@/utils/utils';
import { RefreshProvider } from '@/state/context/RefreshContext';
import { LinksProvider } from '@/state/context/LinksContext';
import { AuthProvider } from '@/state/context/AuthContext';
import SideMenu from '@/containers/SideMenu/SideMenu';
import LinksContainer from '@/containers/LinksContainer/LinksContainer';
import { app } from './App.module.scss';

const App = () => {
  useLayoutEffect(() => {
    const currentHour = new Date().getHours();
    document.title = getGreeting(currentHour);
  }, []);

  return (
    <div className={app}>
      <RefreshProvider>
        <LinksProvider>
          <AuthProvider>
            <LinksContainer />
            <SideMenu />
          </AuthProvider>
        </LinksProvider>
      </RefreshProvider>
    </div>
  );
};

export default App;
