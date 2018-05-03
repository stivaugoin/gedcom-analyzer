// @flow
import * as React from "react";
import styled from "styled-components";

type Props = {
  children: React.Node,
};

const UnorderedList = styled.ul`
  list-style: none,
  padding: 0
`;

class List extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;

    return <UnorderedList>{children}</UnorderedList>;
  }
}

export default List;
