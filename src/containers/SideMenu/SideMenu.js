import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Backdrop from '@/components/Backdrop/Backdrop';
import Modal from '@/components/Modal/Modal';
import UserForm from '@/containers/UserForm/UserForm';
import { sideMenuDrawer, sideMenuButton, open, closed, hamburgerMenu, line } from './SideMenu.module.scss';

const SideMenu = () => {
  const [sideMenuVisible, toggleSideMenu] = useState(false);
  const [modalVisible, toggleModal] = useState(false);

  const handleEscKey = e => {
    const { keyCode } = e;
    const escKey = 27;

    if (keyCode === escKey) {
      e.preventDefault();
      toggleSideMenu(false);
      window.removeEventListener('keyup', handleEscKey);
    }
  };

  const closeAfterClick = () => {
    toggleModal(true);
    toggleSideMenu(false);
  };

  useEffect(() => {
    window.addEventListener('keyup', handleEscKey);

    return () => {
      window.removeEventListener('keyup', handleEscKey);
    };
  });

  return (
    <>
      <button className={hamburgerMenu} onClick={() => toggleSideMenu(true)} type="button">
        <div className={line} />
        <div className={line} />
        <div className={line} />
      </button>
      <Backdrop isVisible={sideMenuVisible} toggleVisibility={toggleSideMenu} />
      <div className={clsx(sideMenuDrawer, sideMenuVisible ? open : closed)}>
        <button className={sideMenuButton} onClick={() => closeAfterClick()} type="button">
          Login/Register
        </button>
      </div>
      <Modal isVisible={modalVisible} toggleVisibility={toggleModal}>
        <UserForm toggleVisibility={toggleModal} />
      </Modal>
    </>
  );
};

export default SideMenu;
