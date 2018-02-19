/* eslint-disable jsx-a11y/anchor-is-valid, no-script-url */

import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const propTypes = {
  filename: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  onClickClose: PropTypes.func.isRequired,
};

const defaultProps = {
  isLoading: false,
};

const CurrentFile = ({ filename, isLoading, onClickClose }) => (
  <div className="row page-title clearfix">
    <div className="page-title-left">
      <p className="page-title-description mr-0 mr-r-20 d-none d-md-inline-block">
        Current file
      </p>
      <h6 className="page-title-heading mr-0">{isLoading ? 'Loading...' : filename}</h6>
    </div>
    <div className="page-title-right d-none d-sm-inline-flex">
      <div className="d-none d-md-inline-flex justify-center align-items-center">
        <Button
          color="primary"
          icon="x"
          onClick={onClickClose}
          title="Close"
          small
        />
      </div>
    </div>
  </div>
);

CurrentFile.propTypes = propTypes;
CurrentFile.defaultProps = defaultProps;

export default CurrentFile;
