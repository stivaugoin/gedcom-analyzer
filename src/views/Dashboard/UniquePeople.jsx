// @flow
import * as React from "react";

import db from "../../api/db";

import BigWidget from "./BigWidget";

type State = {
  isLoading: boolean,
  value: number,
};

class UniquePeople extends React.Component<{}, State> {
  state = {
    isLoading: true,
    value: 0,
  };

  componentDidMount() {
    db.people.count().then(value => this.setState({ isLoading: false, value }));
  }

  render() {
    const { isLoading, value } = this.state;
    return (
      <BigWidget
        size="col-md-6"
        title="Unique people"
        value={value}
        isLoading={isLoading}
      />
    );
  }
}

export default UniquePeople;
