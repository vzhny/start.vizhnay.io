import { useReducer } from 'react';
import pick from 'lodash/pick';
import findIndex from 'lodash/findIndex';
import store from 'store';

/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

const getAllLinks = ({ links }) => {
  const storedLinks = store.get('links');

  return { links: storedLinks };
};

const setLinks = (links, state) => {
  store.set('links', links);

  return { links };
};

const addNewLink = (link, { links }) => {
  const { category } = link;
  const linkWithoutCategory = pick(link, ['title', 'url', 'linkId']);
  const updatedLinks = [...links];

  const categoryIndex = findIndex(updatedLinks, { category });

  if (categoryIndex >= 0) {
    updatedLinks[categoryIndex].links.push(linkWithoutCategory);
  } else {
    updatedLinks.push({
      category,
      links: [linkWithoutCategory],
    });
  }

  store.set('links', updatedLinks);

  return { links: updatedLinks };
};

const updateLink = ({ link, category }, { links }) => {
  const { linkId } = link;
  const updatedLinks = [...links];

  const categoryIndex = findIndex(updatedLinks, { category });

  if (categoryIndex !== -1) {
    const linksInCategory = updatedLinks[categoryIndex].links;

    const linkIndex = findIndex(linksInCategory, { linkId });

    linksInCategory[linkIndex] = link;

    updatedLinks[categoryIndex] = { category, links: linksInCategory[linkIndex] };
  }

  store.set('links', updatedLinks);

  return { links: updatedLinks };
};

const deleteLink = ({ linkId, category }, { links }) => {
  const updatedLinks = [...links];

  const categoryIndex = findIndex(updatedLinks, { category });

  if (categoryIndex !== -1) {
    const linksInCategory = updatedLinks[categoryIndex].links;

    const linkIndex = findIndex(linksInCategory, { linkId });

    if (linkIndex !== 0) {
      linksInCategory.splice(linkIndex, 1);
      updatedLinks[categoryIndex] = { category, links: linksInCategory };
    } else {
      updatedLinks.splice(categoryIndex, 1);
    }
  }

  store.set('links', updatedLinks);

  return { links: updatedLinks };
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_LINKS':
      return getAllLinks(state);
    case 'SET_LINKS':
      return setLinks(payload, state);
    case 'ADD_LINK':
      return addNewLink(payload, state);
    case 'UPDATE_LINK':
      return updateLink(payload, state);
    case 'DELETE_LINK':
      return deleteLink(payload, state);
    default:
  }
};

const initialState = {
  links: store.get('links') || [],
};

export default () => useReducer(reducer, initialState);
