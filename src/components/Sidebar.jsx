/* eslint-disable no-script-url */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  hide: PropTypes.bool,
};

const defaultProps = {
  hide: false,
};

const Sidebar = ({ hide }) => {
  if (hide) {
    return '';
  }

  return (
    <aside className="site-sidebar">
      <nav className="sidebar-nav">
        <ul className="nav in side-menu">
          <li className="current-page">
            <Link to="/">
              <i className="list-icon feather feather-home" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="">
            <a href="javascript:void(0);">
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

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
