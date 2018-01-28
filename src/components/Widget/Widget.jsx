import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string.isRequired,
};

const defaultProps = {};

const Widget = ({ children, size }) => (
  <div className={`widget-holder widget-sm widget-border-radius ${size}`}>
    <div className="widget-bg">
      {children}
    </div>
  </div>
);

Widget.propTypes = propTypes;
Widget.defaultProps = defaultProps;

export default Widget;
