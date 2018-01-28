import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Title = ({ children }) => (
  <div className="counter-title color-color-scheme">
    {children}
  </div>
);

Title.propTypes = propTypes;

export default Title;
