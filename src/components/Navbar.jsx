// @flow
import * as React from "react";

class Navbar extends React.PureComponent<{}> {
  render() {
    return (
      <div id="wrapper" className="wrapper">
        <nav className="navbar">
          <div className="navbar-header">
            <a href="index.html" className="navbar-brand">
              <p>GEDCOM</p>
              <p>
                <small>analyzer</small>
              </p>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
