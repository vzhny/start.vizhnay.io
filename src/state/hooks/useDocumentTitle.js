import { useLayoutEffect } from 'react';
import { getGreeting } from '@/utils/utils';

export default () => {
  useLayoutEffect(() => {
    const currentHour = new Date().getHours();
    document.title = getGreeting(currentHour);
  });
};
