import React from 'react';
import Container from '@/components/Container/Container';
import { app } from './App.module.scss';

const App = () => {
  return (
    <div className={app}>
      <Container>
        <h1>Hello World!</h1>
      </Container>
    </div>
  );
};

export default App;
