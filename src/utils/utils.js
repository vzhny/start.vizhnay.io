import store from 'store';

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

export { getGreeting, setInitialLocalStorage };
