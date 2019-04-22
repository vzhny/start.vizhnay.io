import React from 'react';
import useDocumentTitle from '@/state/hooks/useDocumentTitle';
import GlobalProvider from '@/containers/GlobalProvider/GlobalProvider';
import LinksContainer from '@/containers/LinksContainer/LinksContainer';
import SideMenu from '@/containers/SideMenu/SideMenu';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import { app } from './App.module.scss';

const App = () => {
  useDocumentTitle();

  return (
    <div className={app}>
      <GlobalProvider>
        <LinksContainer />
        <SideMenu />
        <FloatingButton />
      </GlobalProvider>
    </div>
  );
};

export default App;
