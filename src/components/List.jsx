import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const List = ({ children }) => (
  <ul
    style={{
      listStyle: 'none',
      padding: '0',
    }}
  >
    {children}
  </ul>
);

List.propTypes = propTypes;

export default List;
