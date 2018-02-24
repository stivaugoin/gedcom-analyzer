// @flow
import * as React from "react";
import styled from "styled-components";

const UnorderedList = styled.ul`
  list-style: none,
  padding: 0
`;

const List = (props: { children: React.Node }) => (
  <UnorderedList>{props.children}</UnorderedList>
);

export default List;
