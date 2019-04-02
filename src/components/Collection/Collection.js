import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardBody } from '@/components/Card/Card';
import { collection, link } from './Collection.module.scss';

const Collection = ({ category, links }) => {
  return (
    <Card>
      <CardBody className={collection}>
        {links.map(({ title, url, linkId }) => (
          <a key={linkId} className={link} href={url}>
            {title}
          </a>
        ))}
      </CardBody>
    </Card>
  );
};

Collection.propTypes = {
  category: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Collection;
