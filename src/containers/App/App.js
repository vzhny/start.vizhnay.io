import React, { useLayoutEffect } from 'react';
import { getGreeting } from '@/utils/utils';
import Container from '@/components/Container/Container';
import Card, { CardBody } from '@/components/Card/Card';
import { app } from './App.module.scss';

const App = () => {
  useLayoutEffect(() => {
    const currentHour = new Date().getHours();

    document.title = getGreeting(currentHour);
  }, []);

  const TestCard = () => (
    <Card>
      <CardBody>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </CardBody>
    </Card>
  );

  return (
    <div className={app}>
      <Container>
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
      </Container>
    </div>
  );
};

export default App;
