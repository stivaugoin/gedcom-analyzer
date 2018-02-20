import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import {
  List,
  Profile,
} from '../views/People';

const propTypes = {
  match: PropTypes.shape(),
};

const defaultProps = {
  match: {},
};

const People = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/list`} component={List} />
    <Route path={`${match.path}/profile/:pointer`} component={Profile} />
    <Redirect to="/" />
  </Switch>
);

People.propTypes = propTypes;
People.defaultProps = defaultProps;

export default People;
