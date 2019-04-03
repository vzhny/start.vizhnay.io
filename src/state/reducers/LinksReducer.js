import { useReducer } from 'react';
import pick from 'lodash/pick';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import store from 'store';

/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

const getAllLinks = ({ links, categories }) => {
  const storedLinks = store.get('links');
  const storedCategories = store.get('categories');

  return { links: storedLinks, categories: storedCategories };
};

const setLinks = (links, state) => {
  const categories = [];

  links.map(({ category }) => {
    categories.push(category);
  });

  store.set('links', links);
  store.set('categories', categories);

  return { links, categories };
};

const addNewLink = (link, { links, categories }) => {
  const { category } = link;
  const linkWithoutCategory = pick(link, ['title', 'url', 'linkId']);
  const updatedLinks = [...links];
  const updatedCategories = [...categories];

  const categoryIndex = findIndex(updatedLinks, { category });

  if (categoryIndex >= 0) {
    updatedLinks[categoryIndex].links.push(linkWithoutCategory);
  } else {
    updatedLinks.push({
      category,
      links: [linkWithoutCategory],
    });
  }

  if (find(updatedCategories, category) === undefined) {
    updatedCategories.push(category);
  }

  store.set('links', updatedLinks);
  store.set('categories', updatedCategories);

  return { links: updatedLinks, categories: updatedCategories };
};

const updateLink = ({ link, category }, { links, categories }) => {
  const { linkId } = link;
  const updatedLinks = [...links];
  const updatedCategories = [...categories];

  const categoryIndex = findIndex(updatedLinks, { category });

  if (categoryIndex !== -1) {
    const linksInCategory = updatedLinks[categoryIndex].links;

    const linkIndex = findIndex(linksInCategory, { linkId });

    linksInCategory[linkIndex] = link;

    updatedLinks[categoryIndex] = { category, links: linksInCategory[linkIndex] };
  } else {
    updatedCategories.push(category);
  }

  store.set('links', updatedLinks);
  store.set('categories', updatedCategories);

  return { links: updatedLinks, categories: updatedCategories };
};

const deleteLink = (linkId, { links, categories }) => {};

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
  categories: store.get('categories') || [],
};

export default () => useReducer(reducer, initialState);
