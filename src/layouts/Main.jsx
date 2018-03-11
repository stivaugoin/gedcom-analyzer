// @flow
import * as React from "react";
import { Redirect } from "react-router-dom";

import db from "../api/db";

import Button from "../components/Button";
import Sidebar from "../components/Sidebar";

type Props = {
  component: any,
  history: { replace: Function },
};

type State = {
  filename: string,
  isLoading: boolean,
  redirect: boolean,
};

const Main = class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    (this: any).clearFile = this.clearFile.bind(this);
  }

  state = {
    filename: "",
    isLoading: true,
    redirect: false,
  };

  componentDidMount() {
    db.meta.get("filename").then(result => {
      const filename = result.value;

      if (!filename) {
        this.setState({ redirect: true, isLoading: false });
      } else {
        this.setState({ filename, isLoading: false });
      }
    });
  }

  clearFile() {
    db.meta
      .clear()
      .then(() => db.people.clear())
      .then(() => db.places.clear())
      .finally(() => this.props.history.replace("/"));
  }

  render() {
    const { component, ...otherProps } = this.props;
    const { filename, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <Sidebar />

        <main className="main-wrapper clearfix">
          <div className="row page-title clearfix">
            <div className="page-title-left">
              <p className="page-title-description mr-0 mr-r-20 d-none d-md-inline-block">
                Current file
              </p>
              <h6 className="page-title-heading mr-0">{filename}</h6>
            </div>
            <div className="page-title-right d-none d-sm-inline-flex">
              <div className="d-none d-md-inline-flex justify-center align-items-center">
                <Button
                  color="primary"
                  icon="x"
                  onClick={this.clearFile}
                  title="Close"
                  small
                />
              </div>
            </div>
          </div>

          {React.cloneElement(component, otherProps)}
        </main>
      </React.Fragment>
    );
  }
};

export default Main;
