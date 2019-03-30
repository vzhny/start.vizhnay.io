import React, { useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Card, { CardBody } from '@/components/Card/Card';
import { linksContainer } from './LinksContainer.module.scss';

const LinksContainer = () => {
  const [auth] = useContext(AuthContext);

  const retrieveLinks = async () => {
    if (auth) {
      // GET request logic goes here
    }
  };

  useEffect(() => {
    retrieveLinks();
  }, [auth]);

  return (
    <div className={linksContainer}>
      <Card>
        <CardBody>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, similique?</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default LinksContainer;
