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

const updateLink = ({ link, originalCategory }, { links }) => {
  const { linkId, title, url, category } = link;
  const updatedLinks = [...links];

  const currentCategoryIndex = findIndex(updatedLinks, { category });
  const originalCategoryIndex = findIndex(updatedLinks, { category: originalCategory });

  const numberOfLinksInCurrentCategory = updatedLinks[currentCategoryIndex].links.length;
  const numberOfLinksInOriginalCategory = updatedLinks[originalCategoryIndex].links.length;

  if (currentCategoryIndex >= 0) {
    // category exists
    const linkIndex = findIndex(numberOfLinksInCurrentCategory, { linkId });

    if (linkIndex >= 0) {
      // link exists in the category; update it
      numberOfLinksInCurrentCategory[linkIndex] = { linkId, title, url };
      updatedLinks[currentCategoryIndex] = { category, links: numberOfLinksInCurrentCategory };
    } else {
      // link doesn't exist, push it
      updatedLinks[currentCategoryIndex].links.push({
        linkId,
        title,
        url,
      });
    }
  } else {
    // category doesn't exist, create it and push link
    updatedLinks.push({
      category,
      links: [{ linkId, title, url }],
    });
  }

  // check if original category has only one link -- if so, splice it
  if (numberOfLinksInOriginalCategory === 1) {
    updatedLinks.splice(originalCategoryIndex, 1);
  }

  store.set('links', updatedLinks);

  return { links: updatedLinks };
};

const deleteLink = ({ linkId, category }, { links }) => {
  const updatedLinks = [...links];

  const categoryIndex = findIndex(updatedLinks, { category });

  if (categoryIndex >= 0) {
    const categoryLinks = updatedLinks[categoryIndex].links;

    const linkIndex = findIndex(categoryLinks, { linkId });

    if (linkIndex !== 0) {
      categoryLinks.splice(linkIndex, 1);
      updatedLinks[categoryIndex] = { category, links: categoryLinks };
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
