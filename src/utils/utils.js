import store from 'store';

/* eslint-disable no-restricted-globals */

const getGreeting = currentHour => {
  let greeting = 'Good Evening!';

  if (currentHour >= 6 && currentHour < 12) {
    greeting = 'Good Morning!';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon!';
  }

  return greeting;
};

const setInitialLocalStorage = () => {
  const links = store.get('links');

  if (links === undefined) {
    store.set('links', []);
  }
};

const getStatusCode = message => {
  const split = message.split(' ');
  const { length } = split;
  const statusCode = parseInt(split[length - 1], 10);

  if (isNaN(statusCode)) {
    return 0;
  }

  return statusCode;
};

export { getGreeting, setInitialLocalStorage, getStatusCode };
