import { useState } from 'react';

export default (delay = 500) => {
  const [state, updater] = useState(false);
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

  return [[state, animate], toggleAnimation];
};
