// @flow
import * as React from "react";

const Widget = (props: { children: React.Node, size: string }) => (
  <div className={`widget-holder widget-sm widget-border-radius ${props.size}`}>
    <div className="widget-bg">{props.children}</div>
  </div>
);

export default Widget;
