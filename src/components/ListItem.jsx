import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const ListItem = ({ children }) => <li>{children}</li>;

ListItem.propTypes = propTypes;

export default ListItem;
