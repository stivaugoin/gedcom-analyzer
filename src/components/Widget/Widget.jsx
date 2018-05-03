// @flow
import * as React from "react";

type Props = {
  children: React.Node,
  size: string,
};

class Widget extends React.PureComponent<Props> {
  render() {
    const { children, size } = this.props;

    return (
      <div className={`widget-holder widget-sm widget-border-radius ${size}`}>
        <div className="widget-bg">{children}</div>
      </div>
    );
  }
}

export default Widget;
