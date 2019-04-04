import React, { useLayoutEffect } from 'react';
import { getGreeting } from '@/utils/utils';
import GlobalContext from '@/containers/GlobalContext/GlobalContext';
import LinksContainer from '@/containers/LinksContainer/LinksContainer';
import SideMenu from '@/containers/SideMenu/SideMenu';
import { app } from './App.module.scss';

const App = () => {
  useLayoutEffect(() => {
    const currentHour = new Date().getHours();
    document.title = getGreeting(currentHour);
  }, []);

  return (
    <div className={app}>
      <GlobalContext>
        <LinksContainer />
        <SideMenu />
      </GlobalContext>
    </div>
  );
};

export default App;
