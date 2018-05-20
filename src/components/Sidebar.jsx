// @flow
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  hide?: boolean,
};

class Sidebar extends React.Component<Props> {
  static defaultProps = {
    hide: false,
  };

  render() {
    const { hide } = this.props;

    if (hide) {
      return "";
    }

    return (
      <aside className="site-sidebar">
        <nav className="sidebar-nav">
          <ul className="nav in side-menu">
            <li>
              <Link to="/dashboard">
                <i className="list-icon feather feather-home" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/reports">
                <i className="list-icon feather feather-activity" />
                <span>Reports</span>
              </Link>
            </li>
            <li>
              <Link to="/people/list">
                <i className="list-icon feather feather-user" />
                <span>People</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
}

export default Sidebar;
