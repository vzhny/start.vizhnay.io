import React, { useEffect, useContext } from 'react';
import clsx from 'clsx';
import useAnimation from '@/state/hooks/useAnimation';
import { AuthContext } from '@/state/context/AuthContext';
import { LinksContext } from '@/state/context/LinksContext';
import { EditLinksContext } from '@/state/context/EditLinksContext';
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
  const [[sideMenuVisible, animateSideMenu], toggleSideMenu] = useAnimation();
  const [[modalVisible, animateModal], toggleModal] = useAnimation();
  const [auth] = useContext(AuthContext);
  const [{ links }] = useContext(LinksContext);
  const [, toggleEditLinks] = useContext(EditLinksContext);

  const handleEscKey = event => {
    const { keyCode } = event;
    const escKey = 27;

    if (keyCode === escKey) {
      event.preventDefault();

      if (sideMenuVisible === true) {
        toggleSideMenu();
        window.removeEventListener('keyup', handleEscKey);
      }
    }
  };

  const closeAfterClick = (options = { toggleModal: true }) => {
    if (options.toggleModal) {
      toggleModal();
    } else {
      toggleEditLinks(true);
    }

    toggleSideMenu();
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
        className={clsx(hamburgerMenu, animateSideMenu && closeHamburgerMenu)}
        onClick={() => toggleSideMenu()}
        type="button"
      >
        <div className={line} />
        <div className={line} />
        <div className={line} />
      </button>
      {sideMenuVisible && (
        <>
          <Backdrop animate={animateSideMenu} toggleClose={toggleSideMenu} />
          <div className={clsx(sideMenu, animateSideMenu && open)}>
            <div className={sideMenuList}>
              {auth ? (
                <>
                  <button className={sideMenuButton} onClick={() => closeAfterClick()} type="button">
                    Add a New Link
                  </button>
                  <button
                    className={sideMenuButton}
                    disabled={links.length === 0}
                    onClick={() => closeAfterClick({ toggleModal: false })}
                    type="button"
                  >
                    Edit/Delete Links
                  </button>
                </>
              ) : (
                <button className={sideMenuButton} onClick={() => closeAfterClick()} type="button">
                  Login/Register
                </button>
              )}
            </div>
          </div>
        </>
      )}
      {modalVisible && (
        <Modal animate={animateModal} toggleClose={toggleModal}>
          {auth ? <AddLinkForm toggleClose={toggleModal} /> : <UserForm toggleClose={toggleModal} />}
        </Modal>
      )}
    </>
  );
};

export default SideMenu;
