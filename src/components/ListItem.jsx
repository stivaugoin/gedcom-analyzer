// @flow
import * as React from "react";

type Props = {
  children: React.Node,
};

class ListItem extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;

    return <li>{children}</li>;
  }
}

export default ListItem;
