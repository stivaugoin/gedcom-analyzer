import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  title: PropTypes.string,
};

const defaultProps = {
  color: 'default',
  icon: '',
  rounded: false,
  small: false,
  title: '',
};

const Button = ({ color, icon, onClick, rounded, small, title }) => {
  const smallClass = 'btn-sm fs-11 fw-400';

  const classNames = classnames(
    `btn btn-${color}`,
    small && smallClass,
    {
      'btn-rounded': rounded,
    },
  );

  return (
    <button className={classNames} onClick={onClick}>
      {!!icon && <i className={`feather feather-${icon} mr-r-5`} />}
      {!!title && title}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
