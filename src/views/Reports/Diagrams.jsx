// @flow
import * as React from "react";

const Diagrams = class extends React.PureComponent<{}> {
  render() {
    return (
      <div className="widget-holder widget-full-content widget-full-height col-xl-6">
        <div className="widget-bg">
          <div
            className="widget-body d-flex flex-column justify-content-center align-items-center fs-42"
            style={{ height: "100%" }}
          >
            Diagrams
          </div>
        </div>
      </div>
    );
  }
};

export default Diagrams;
