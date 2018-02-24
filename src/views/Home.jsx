// @flow
import React from "react";
import { Redirect } from "react-router-dom";

import { getFilename, uploadFile } from "../helpers/localstorage";

const onFileLoaded = (event, history: { push: Function }) => {
  uploadFile(event, () => {
    history.push("/dashboard");
  });
};

type Props = {
  history: {
    push: Function,
  },
};

const Home = (props: Props) => {
  const { history } = props;

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

export default Home;
