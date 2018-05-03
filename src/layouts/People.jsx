// @flow
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { List, Profile } from "../views/People";

class People extends React.Component<any> {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route path={`${match.path}/list`} component={List} />
        <Route path={`${match.path}/profile/:pointer`} component={Profile} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default People;
