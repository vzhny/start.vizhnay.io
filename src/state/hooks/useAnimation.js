import { useState } from 'react';

export default (state, updater, delay = 500) => {
  const [animate, setAnimation] = useState(false);

  const toggleAnimation = () => {
    if (state) {
      setAnimation(false);
      setTimeout(() => updater(false), delay);
    } else {
      updater(true);
      setTimeout(() => setAnimation(true), 0);
    }
  };

  return [animate, toggleAnimation];
};
