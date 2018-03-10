// @flow
import React from "react";
import { Redirect } from "react-router-dom";

import db from "../api/db";
import uploadFile from "../api/uploadFile";

type Props = {
  history: {
    push: Function,
  },
};

type State = {
  isLoading: boolean,
  redirect: boolean,
};

const Home = class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    (this: any).onFileLoaded = this.onFileLoaded.bind(this);
  }

  state = {
    isLoading: true,
    redirect: false,
  };

  componentDidMount() {
    db.meta.get("filename").then(result => {
      if (!result) {
        this.setState({ isLoading: false });
      } else {
        this.setState({ isLoading: false, redirect: true });
      }
    });
  }

  onFileLoaded(event: any) {
    this.setState({ isLoading: true });
    uploadFile(event.target, () => {
      this.setState({ isLoading: false });
      this.props.history.push("/dashboard");
    });
  }

  render() {
    console.log("Home - state", this.state);
    const { isLoading, redirect } = this.state;

    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    if (redirect) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <main className="main-wrapper clearfix" style={{ marginLeft: 0 }}>
        <div className="widget-list" style={{ marginTop: "35px" }}>
          <div className="row">
            <div className="col-md-12 widget-holder">
              <div className="widget-bg">
                <div className="widget-body clearfix">
                  <h5 className="box-title mr-b-0">Import your GEDCOM file</h5>
                  <p className="text-muted">Choose a .ged file</p>
                  <input type="file" onChange={this.onFileLoaded} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default Home;
