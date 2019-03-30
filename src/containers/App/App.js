import React, { useLayoutEffect } from 'react';
import { getGreeting } from '@/utils/utils';
import SideMenu from '@/containers/SideMenu/SideMenu';
import Container from '@/components/Container/Container';
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
