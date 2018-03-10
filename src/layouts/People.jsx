// @flow
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { List, Profile } from "../views/People";

const People = (props: any) => (
  <Switch>
    <Route path={`${props.match.path}/list`} component={List} />
    <Route path={`${props.match.path}/profile/:pointer`} component={Profile} />
    <Redirect to="/" />
  </Switch>
);

export default People;
