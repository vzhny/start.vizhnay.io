const getGreeting = currentHour => {
  let greeting = 'Good Evening!';

  if (currentHour >= 6 && currentHour < 12) {
    greeting = 'Good Morning!';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon!';
  }

  return greeting;
};

/* eslint-disable */

export { getGreeting };
