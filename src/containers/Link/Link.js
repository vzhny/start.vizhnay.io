import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EditLinksContext } from '@/state/context/EditLinksContext';
import EditIcon from '@/images/edit.svg';
import DeleteIcon from '@/images/close.svg';
import { linkContainer, link, buttonGroup, button, editButtonIcon, deleteButtonIcon } from './Link.module.scss';

const Link = ({ linkId, title, url, ...props }) => {
  const [canEditLinks] = useContext(EditLinksContext);

  return (
    <div className={linkContainer}>
      <a className={link} {...props} href={url} rel="noopener noreferrer" target="_blank">
        {title}
      </a>
      {canEditLinks && (
        <div className={buttonGroup}>
          <button className={button} onClick={() => console.log(`Edit ${linkId}`)} type="button">
            <img alt="Edit Icon" className={editButtonIcon} src={EditIcon} />
          </button>
          <button className={button} onClick={() => console.log(`Delete ${linkId}`)} type="button">
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
};

export default Link;
