import store from 'store';
import get from 'lodash/get';
import pick from 'lodash/pick';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

/* eslint-disable array-callback-return */

const getGreeting = currentHour => {
  let greeting = 'Good Evening!';

  if (currentHour >= 6 && currentHour < 12) {
    greeting = 'Good Morning!';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon!';
  }

  return greeting;
};

const retrieveCategories = links => {
  const categories = [];

  links.map(link => {
    const category = get(link, 'category');

    if (findIndex(categories, category) === -1) {
      categories.push(category);
    }
  });

  return categories;
};

const addCategory = category => {
  const storedCategories = store.get('categories');

  if (find(storedCategories, category)) {
    storedCategories.push(category);
  }
};

const saveLinkToLocalStorage = link => {
  const { category: linkCategory } = link;
  const linkWithoutCategory = pick(link, ['title', 'url', 'linkId']);
  const storedLinks = store.get('links');

  const categoryIndex = findIndex(storedLinks, { category: linkCategory });

  if (categoryIndex >= 0) {
    storedLinks[categoryIndex].links.push(linkWithoutCategory);
  } else {
    storedLinks.push({
      category: linkCategory,
      links: [linkWithoutCategory],
    });
  }

  store.set('links', storedLinks);
};

export { getGreeting, retrieveCategories, addCategory, saveLinkToLocalStorage };
