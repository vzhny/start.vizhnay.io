import React, { useState, useLayoutEffect, useContext } from 'react';
import to from 'await-to-js';
import axios from 'axios';
import store from 'store';
import { useArray } from 'react-hanger';
import { AuthContext } from '@/context/AuthContext';
import Card, { CardBody } from '@/components/Card/Card';
import { linksContainer } from './LinksContainer.module.scss';
import Collection from '@/components/Collection/Collection';

const LinksContainer = () => {
  const linkData = useArray([]);
  const [serverError, setServerError] = useState('');
  const [auth, setAuth] = useContext(AuthContext);

  const retrieveLocalLinks = () => {
    linkData.setValue(store.get('links'));
  };

  const retrieveLinks = async () => {
    const token = store.get('token');

    if (token) {
      const [error, response] = await to(
        axios.get('/links', {
          headers: { Authorization: token },
        })
      );

      if (error) {
        setServerError('There was an error retrieving your links, please try again later.');

        return;
      }

      store.set('links', response.data.links);
      linkData.setValue(response.data.links);
      setAuth(true);
    }
  };

  useLayoutEffect(() => {
    if (store.get('links')) {
      setAuth(true);
      retrieveLocalLinks();
    } else {
      retrieveLinks();
    }
  }, [auth]);

  return (
    <div className={linksContainer}>
      {auth ? (
        linkData.value.map(({ category, links }) => <Collection key={category} category={category} links={links} />)
      ) : (
        <Card>
          <CardBody>{serverError ? <p>{serverError}</p> : <p>Please log in to start adding links!</p>}</CardBody>
        </Card>
      )}
    </div>
  );
};

export default LinksContainer;
