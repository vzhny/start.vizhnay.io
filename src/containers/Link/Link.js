import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import to from 'await-to-js';
import store from 'store';
import { RefreshContext } from '@/state/context/RefreshContext';
import { LinksContext } from '@/state/context/LinksContext';
import { EditLinksContext } from '@/state/context/EditLinksContext';
import EditIcon from '@/images/edit.svg';
import DeleteIcon from '@/images/close.svg';
import { linkContainer, link, buttonGroup, button, editButtonIcon, deleteButtonIcon } from './Link.module.scss';

const Link = ({ linkId, title, url, category, ...props }) => {
  const [canEditLinks] = useContext(EditLinksContext);
  const [refresh, toggleRefresh] = useContext(RefreshContext);
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

  return (
    <div className={linkContainer}>
      <a className={link} {...props} href={url} rel="noopener noreferrer" target="_blank">
        {title}
      </a>
      {canEditLinks && (
        <div className={buttonGroup}>
          <button className={button} onClick={() => {}} type="button">
            <img alt="Edit Icon" className={editButtonIcon} src={EditIcon} />
          </button>
          <button className={button} onClick={() => deleteLink()} type="button">
            <img alt="Delete Icon" className={deleteButtonIcon} src={DeleteIcon} />
          </button>
        </div>
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
