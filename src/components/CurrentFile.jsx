// @flow
import * as React from "react";

import Button from "./Button";

const CurrentFile = (props: { filename: string, onClickClose: Function }) => (
  <div className="row page-title clearfix">
    <div className="page-title-left">
      <p className="page-title-description mr-0 mr-r-20 d-none d-md-inline-block">
        Current file
      </p>
      <h6 className="page-title-heading mr-0">{props.filename}</h6>
    </div>
    <div className="page-title-right d-none d-sm-inline-flex">
      <div className="d-none d-md-inline-flex justify-center align-items-center">
        <Button
          color="primary"
          icon="x"
          onClick={props.onClickClose}
          title="Close"
          small
        />
      </div>
    </div>
  </div>
);

export default CurrentFile;
