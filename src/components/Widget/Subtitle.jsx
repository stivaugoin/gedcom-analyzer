import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Subtitle = ({ children }) => (
  <div className="counter-info">
    {children}
  </div>
);

Subtitle.propTypes = propTypes;

export default Subtitle;
