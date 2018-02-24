// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props: { hide?: boolean }) => {
  if (props.hide) {
    return "";
  }

  return (
    <aside className="site-sidebar">
      <nav className="sidebar-nav">
        <ul className="nav in side-menu">
          <li className="current-page">
            <Link to="/dashboard">
              <i className="list-icon feather feather-home" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="">
            <a href="/">
              <i className="list-icon feather feather-user" />
              <span>People</span>
            </a>
            <ul className="list-unstyled sub-menu">
              <li>
                <Link to="/people/list">List</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.defaultProps = {
  hide: false,
};

export default Sidebar;
