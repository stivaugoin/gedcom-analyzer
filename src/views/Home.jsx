import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { getFilename, uploadFile } from "../helpers/localstorage";

const propTypes = {
  history: PropTypes.shape().isRequired,
};

const onFileLoaded = (event, history) => {
  uploadFile(event, () => {
    history.push("/dashboard");
  });
};

const Home = ({ history }) => {
  if (getFilename()) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <main className="main-wrapper clearfix" style={{ marginLeft: 0 }}>
      <div className="widget-list" style={{ marginTop: "35px" }}>
        <div className="row">
          <div className="col-md-12 widget-holder">
            <div className="widget-bg">
              <div className="widget-body clearfix">
                <h5 className="box-title mr-b-0">Import your GEDCOM file</h5>
                <p className="text-muted">Choose a .ged file</p>
                <input
                  type="file"
                  onChange={event => {
                    onFileLoaded(event, history);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

Home.propTypes = propTypes;

export default Home;
