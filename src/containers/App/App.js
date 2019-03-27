import React, { useLayoutEffect } from 'react';
import { getGreeting } from '@/utils/utils';
import Container from '@/components/Container/Container';
import { app } from './App.module.scss';

const App = () => {
  useLayoutEffect(() => {
    const currentHour = new Date().getHours();

    document.title = getGreeting(currentHour);
  }, []);

  return (
    <div className={app}>
      <Container>
        <h1>Hello World!</h1>
      </Container>
    </div>
  );
};

export default App;
