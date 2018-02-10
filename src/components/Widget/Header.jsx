import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  dark: PropTypes.bool,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  dark: false,
  icon: '',
};

const Header = ({ dark, icon, title }) => (
  <div className={`widget-heading ${!!dark && 'bg-color-scheme'}`}>
    <span className="widget-title my-0 fs-12 fw-600">
      {title}
    </span>
    {!!icon && (
      <i className={`widget-heading-icon ${icon}`} />
    )}
  </div>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
