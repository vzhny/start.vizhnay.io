import React, { useState, useLayoutEffect, useContext } from 'react';
import to from 'await-to-js';
import axios from 'axios';
import store from 'store';
import { RefreshContext } from '@/state/context/RefreshContext';
import { LinksContext } from '@/state/context/LinksContext';
import { AuthContext } from '@/state/context/AuthContext';
import { setInitialLocalStorage } from '@/utils/utils';
import Card, { CardBody } from '@/components/Card/Card';
import Collection from '@/components/Collection/Collection';
import { linksContainer } from './LinksContainer.module.scss';

/* eslint-disable no-nested-ternary */

const LinksContainer = () => {
  const [token] = useState(store.get('token'));
  const [serverError, setServerError] = useState('');
  const [refresh] = useContext(RefreshContext);
  const [{ links }, dispatch] = useContext(LinksContext);
  const length = links ? links.length : 0;
  const [auth, setAuth] = useContext(AuthContext);

  const retrieveLinks = async () => {
    const localLinks = store.get('links');

    if (token && length === 0) {
      const [error, response] = await to(
        axios.get('/links', {
          headers: { Authorization: token },
        })
      );

      if (error) {
        setServerError('There was an error retrieving your links, please try again later.');

        return;
      }

      dispatch({ type: 'SET_LINKS', payload: response.data.links });
    } else if (localLinks !== undefined) {
      dispatch({ type: 'GET_LINKS' });
    }
  };

  useLayoutEffect(() => {
    if (token !== undefined) {
      setAuth(true);
    }

    if (links === undefined) {
      setInitialLocalStorage();
    }

    retrieveLinks();
  }, [refresh]);

  return (
    <div className={linksContainer}>
      {auth ? (
        length > 0 ? (
          links.map(({ category, links: categorizedLinks }) => (
            <Collection key={category} category={category} links={categorizedLinks} />
          ))
        ) : (
          <Card>
            <CardBody>
              <p>Add your first link through the side menu!</p>
            </CardBody>
          </Card>
        )
      ) : (
        <Card>
          <CardBody>{serverError ? <p>{serverError}</p> : <p>Please log in to start adding links!</p>}</CardBody>
        </Card>
      )}
    </div>
  );
};

export default LinksContainer;
