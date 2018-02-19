import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import {
  clearLocalstorage,
  getFilename,
} from '../helpers/localstorage';

import CurrentFile from '../components/CurrentFile';
import Sidebar from '../components/Sidebar';

const propTypes = {
  component: PropTypes.node.isRequired,
  history: PropTypes.shape().isRequired,
};

const Main = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: '',
      isLoading: true,
    };

    this.clearFile = this.clearFile.bind(this);
  }

  componentWillMount() {
    this.setState({
      filename: getFilename(),
      isLoading: false,
    });
  }

  clearFile() {
    this.setState({ filename: '' });
    clearLocalstorage();
    this.props.history.replace('/');
  }

  render() {
    const { component, ...otherProps } = this.props;
    const { filename, isLoading } = this.state;

    if (!getFilename()) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Sidebar />

        <main className="main-wrapper clearfix">
          <CurrentFile
            filename={filename}
            isLoading={isLoading}
            onClickClose={this.clearFile}
          />

          {React.cloneElement(component, otherProps)}
        </main>
      </div>
    );
  }
};

Main.propTypes = propTypes;

export default Main;
