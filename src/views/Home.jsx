import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import {
  getFilename,
  uploadFile,
} from '../helpers/localstorage';

const propTypes = {
  history: PropTypes.shape().isRequired,
};

const onFileLoaded = (event, history) => {
  uploadFile(event, () => {
    history.push('/dashboard');
  });
};

const Home = ({ history }) => {
  if (getFilename()) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <h1>Home</h1>
      <input type="file" onChange={(event) => { onFileLoaded(event, history); }} />
    </div>
  );
};

Home.propTypes = propTypes;

export default Home;
