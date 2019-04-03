import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { AuthContext } from '@/state/context/AuthContext';
import Backdrop from '@/components/Backdrop/Backdrop';
import Modal from '@/components/Modal/Modal';
import UserForm from '@/containers/UserForm/UserForm';
import AddLinkForm from '@/containers/AddLinkForm/AddLinkForm';
import {
  sideMenu,
  sideMenuList,
  sideMenuButton,
  open,
  hamburgerMenu,
  closeHamburgerMenu,
  line,
} from './SideMenu.module.scss';

const SideMenu = () => {
  const [sideMenuVisible, toggleSideMenu] = useState(false);
  const [modalVisible, toggleModal] = useState(false);
  const [auth] = useContext(AuthContext);

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
      <button
        className={clsx(hamburgerMenu, sideMenuVisible && closeHamburgerMenu)}
        onClick={() => toggleSideMenu(!sideMenuVisible)}
        type="button"
      >
        <div className={line} />
        <div className={line} />
        <div className={line} />
      </button>
      <Backdrop isVisible={sideMenuVisible} toggleVisibility={toggleSideMenu} />
      <div className={clsx(sideMenu, sideMenuVisible && open)}>
        <div className={sideMenuList}>
          {auth ? (
            <button className={sideMenuButton} onClick={() => closeAfterClick()} type="button">
              Add a New Link
            </button>
          ) : (
            <button className={sideMenuButton} onClick={() => closeAfterClick()} type="button">
              Login/Register
            </button>
          )}
        </div>
      </div>
      <Modal isVisible={modalVisible} toggleVisibility={toggleModal}>
        {auth ? <AddLinkForm toggleVisibility={toggleModal} /> : <UserForm toggleVisibility={toggleModal} />}
      </Modal>
    </>
  );
};

export default SideMenu;
