// @flow
import * as React from "react";

import db from "../../api/db";

import BigWidget from "./BigWidget";

type State = {
  isLoading: boolean,
  value: number,
};

class UniquePlaces extends React.Component<{}, State> {
  state = {
    isLoading: true,
    value: 0,
  };

  componentDidMount() {
    db.places.count().then(value => this.setState({ isLoading: false, value }));
  }

  render() {
    const { isLoading, value } = this.state;
    return (
      <BigWidget
        size="col-md-6"
        title="Unique places"
        value={value}
        isLoading={isLoading}
      />
    );
  }
}

export default UniquePlaces;
