import React, { useContext } from 'react';
import clsx from 'clsx';
import { EditLinksContext } from '@/state/context/EditLinksContext';
import { floatingButton, visible } from './FloatingButton.module.scss';

const FloatingButton = () => {
  const [canEditLinks, toggleEditLinks] = useContext(EditLinksContext);

  return (
    <button
      className={clsx(floatingButton, canEditLinks && visible)}
      onClick={() => toggleEditLinks(false)}
      type="button"
    >
      Done Editing
    </button>
  );
};

FloatingButton.propTypes = {};

export default FloatingButton;
