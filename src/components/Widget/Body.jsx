// @flow
import * as React from "react";

const Body = (props: { children: React.Node }) => (
  <div
    className="widget-body"
    style={{
      height: "127px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div className="counter-w-info">{props.children}</div>
  </div>
);

export default Body;
