import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import to from 'await-to-js';
import store from 'store';
import useAnimation from '@/state/hooks/useAnimation';
import { RefreshContext } from '@/state/context/RefreshContext';
import { LinksContext } from '@/state/context/LinksContext';
import { EditLinksContext } from '@/state/context/EditLinksContext';
import EditIcon from '@/images/edit.svg';
import DeleteIcon from '@/images/close.svg';
import Modal from '@/components/Modal/Modal';
import Card, { CardHeader, CardBody } from '@/components/Card/Card';
import {
  linkContainer,
  link,
  buttonGroup,
  button,
  editButtonIcon,
  deleteButtonIcon,
  modalButtonGroup,
  cancelButton,
  submitButton,
} from './Link.module.scss';
import EditLinkForm from '../EditLinkForm/EditLinkForm';

const Link = ({ linkId, title, url, category, ...props }) => {
  const [[modalVisible, animateModal], toggleModal] = useAnimation();
  const [canEditLinks] = useContext(EditLinksContext);
  const [refresh, toggleRefresh] = useContext(RefreshContext);
  const [editMode, setEditMode] = useState('edit');
  const [, dispatch] = useContext(LinksContext);

  const deleteLink = async () => {
    const token = store.get('token');

    const [error] = await to(
      axios.delete(`/links/${linkId}`, {
        headers: { Authorization: token },
      })
    );

    if (error) {
      return;
    }

    dispatch({ type: 'DELETE_LINK', payload: { linkId, category } });
    toggleRefresh(!refresh);
  };

  const handleEditLink = () => {
    setEditMode('edit');
    toggleModal();
  };

  const handleDeleteLink = () => {
    setEditMode('delete');
    toggleModal();
  };

  return (
    <div className={linkContainer}>
      <a className={link} {...props} href={url} rel="noopener noreferrer" target="_blank">
        {title}
      </a>
      {canEditLinks && (
        <div className={buttonGroup}>
          <button className={button} onClick={() => handleEditLink()} type="button">
            <img alt="Edit Icon" className={editButtonIcon} src={EditIcon} />
          </button>
          <button className={button} onClick={() => handleDeleteLink()} type="button">
            <img alt="Delete Icon" className={deleteButtonIcon} src={DeleteIcon} />
          </button>
        </div>
      )}
      {modalVisible && (
        <Modal animate={animateModal} toggleClose={toggleModal}>
          {editMode === 'edit' ? (
            <EditLinkForm category={category} linkId={linkId} title={title} toggleClose={toggleModal} url={url} />
          ) : (
            <Card>
              <CardHeader>
                <h3>Delete Link</h3>
              </CardHeader>
              <CardBody>
                <p style={{ marginBottom: '1rem' }}>Are you sure you want to delete this link?</p>
                <p style={{ fontWeight: '600' }}>{url}</p>
                <div className={modalButtonGroup}>
                  <button className={cancelButton} onClick={() => toggleModal()} type="button">
                    No
                  </button>
                  <button className={submitButton} onClick={() => deleteLink()} type="button">
                    Yes
                  </button>
                </div>
              </CardBody>
            </Card>
          )}
        </Modal>
      )}
    </div>
  );
};

Link.propTypes = {
  linkId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Link;
