import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Backdrop from '@/components/Backdrop/Backdrop';
import { sideMenuDrawer, open, closed, hamburgerMenu, line } from './SideMenu.module.scss';

const SideMenu = () => {
  const [sideMenuVisible, toggleSideMenu] = useState(false);

  const handleEscKey = e => {
    const { keyCode } = e;
    const escKey = 27;

    if (keyCode === escKey) {
      e.preventDefault();
      toggleSideMenu(false);
      window.removeEventListener('keyup', handleEscKey);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleEscKey);

    return () => {
      window.removeEventListener('keyup', handleEscKey);
    };
  });

  return (
    <>
      <button className={hamburgerMenu} onClick={() => toggleSideMenu(!sideMenuVisible)} type="button">
        <div className={line} />
        <div className={line} />
        <div className={line} />
      </button>
      <Backdrop isVisible={sideMenuVisible} toggleVisibility={toggleSideMenu} />
      <div className={clsx(sideMenuDrawer, sideMenuVisible ? open : closed)}>
        <p>This is the side menu drawer.</p>
      </div>
    </>
  );
};

export default SideMenu;
