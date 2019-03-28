import React, { useLayoutEffect } from 'react';
import { getGreeting } from '@/utils/utils';
import Container from '@/components/Container/Container';
import SideMenu from '@/components/SideMenu/SideMenu';
import Card, { CardBody } from '@/components/Card/Card';
import { app } from './App.module.scss';

const App = () => {
  useLayoutEffect(() => {
    const currentHour = new Date().getHours();

    document.title = getGreeting(currentHour);
  }, []);

  return (
    <div className={app}>
      <Container>
        <Card>
          <CardBody>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </CardBody>
        </Card>
      </Container>
      <SideMenu />
    </div>
  );
};

export default App;
