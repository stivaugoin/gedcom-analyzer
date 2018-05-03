// @flow
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Main, People } from "./layouts";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Reports from "./views/Reports";

import "./styles/style.css";
import "./styles/vendors/feather-icons/feather.css";

const App = class extends React.Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <div className="header-dark sidebar-light sidebar-expand">
          <div id="wrapper" className="wrapper">
            <Navbar />
            <div className="content-wrapper">
              <Switch>
                <Route
                  path="/dashboard"
                  render={routeProps => (
                    <Main {...routeProps} component={<Dashboard />} />
                  )}
                />
                <Route
                  path="/reports"
                  render={routeProps => (
                    <Main {...routeProps} component={<Reports />} />
                  )}
                />
                <Route
                  path="/people"
                  render={routeProps => (
                    <Main {...routeProps} component={<People />} />
                  )}
                />
                <Route path="/" component={Home} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;
