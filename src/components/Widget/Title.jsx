// @flow
import * as React from "react";

type Props = {
  children: React.Node,
};

class Title extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;

    return <div className="counter-title color-color-scheme">{children}</div>;
  }
}

export default Title;
