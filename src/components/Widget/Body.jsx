// @flow
import * as React from "react";

type Props = {
  children: React.Node,
};

class Body extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;

    return (
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
  }
}

export default Body;
