// @flow
import * as React from "react";

type Props = {
  children: React.Node,
};

class Subtitle extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;

    return <div className="counter-info">{children}</div>;
  }
}

export default Subtitle;
