import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Body = ({ children }) => (
  <div
    className="widget-body"
    style={{
      height: "127px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div className="counter-w-info">{children}</div>
  </div>
);

Body.propTypes = propTypes;

export default Body;
