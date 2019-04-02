import React, { useState, useLayoutEffect, useContext } from 'react';
import to from 'await-to-js';
import axios from 'axios';
import store from 'store';
import { AuthContext } from '@/context/AuthContext';
import Card, { CardBody } from '@/components/Card/Card';
import Collection from '@/components/Collection/Collection';
import { linksContainer } from './LinksContainer.module.scss';

const LinksContainer = () => {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState('');
  const [auth, setAuth] = useContext(AuthContext);

  const retrieveLinks = async () => {
    const links = store.get('links');
    const token = store.get('token');

    if (links) {
      setData(links);
      setAuth(true);
    } else if (token) {
      const [error, response] = await to(
        axios.get('/links', {
          headers: { Authorization: token },
        })
      );

      if (error) {
        setServerError('There was an error retrieving your links, please try again later.');

        return;
      }

      const { links: retrievedLinks } = response.data;

      store.set('links', retrievedLinks);
      setData(retrievedLinks);
      setAuth(true);
    }
  };

  useLayoutEffect(() => {
    retrieveLinks();
  }, []);

  return (
    <div className={linksContainer}>
      {auth ? (
        data.map(({ category, links }) => <Collection key={category} category={category} links={links} />)
      ) : (
        <Card>
          <CardBody>{serverError ? <p>{serverError}</p> : <p>Please log in to start adding links!</p>}</CardBody>
        </Card>
      )}
    </div>
  );
};

export default LinksContainer;
