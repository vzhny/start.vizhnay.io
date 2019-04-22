import { getGreeting, getStatusCode } from '@/utils/utils';

/* eslint-disable array-callback-return */

describe('getGreeting', () => {
  it('should returns the correct greeting based on the time of day', () => {
    const hoursToTest = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    hoursToTest.map(hour => {
      const greeting = getGreeting(hour);

      if (hour >= 6 && hour < 12) {
        expect(greeting).toBe('Good Morning!');
      } else if (hour >= 12 && hour < 18) {
        expect(greeting).toBe('Good Afternoon!');
      } else {
        expect(greeting).toBe('Good Evening!');
      }
    });
  });
});

describe('getStatusCode', () => {
  it('should return the status code at the end of an error message', () => {
    const withStatusCode = 'This is an error message 404';
    const statusCode = getStatusCode(withStatusCode);

    expect(statusCode).toBe(404);
  });

  it('should return 0 if there is no status code', () => {
    const withoutStatusCode = "This doesn't have a status code";
    const noStatusCode = getStatusCode(withoutStatusCode);

    expect(noStatusCode).toBe(0);
  });
});
