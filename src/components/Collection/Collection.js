import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardBody } from '@/components/Card/Card';
import Link from '@/containers/Link/Link';

/* eslint-disable jsx-a11y/anchor-is-valid */

const Collection = ({ category, links }) => {
  return (
    <Card>
      <CardBody>
        {links.map(({ title, url, linkId }) => (
          <Link key={linkId} category={category} linkId={linkId} title={title} url={url} />
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
