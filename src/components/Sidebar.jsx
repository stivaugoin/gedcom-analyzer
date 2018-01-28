/* eslint-disable jsx-a11y/anchor-is-valid, no-script-url */

import React from 'react';
import PropTypes from 'prop-types';

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
            <a href="javascript:void(0);">
              <i className="list-icon feather feather-home" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="">
            <a href="javascript:void(0);">
              <i className="list-icon feather feather-user" />
              <span>People</span>
            </a>
            <ul className="list-unstyled sub-menu">
              <li>
                <a href="../default/index.html">List</a>
              </li>
              <li>
                <a href="../real-estate/index.html">Errors</a>
              </li>
            </ul>
          </li>
          <li className="">
            <a href="javascript:void(0);">
              <i className="list-icon feather feather-map-pin" />
              <span>Map</span>
            </a>
          </li>
          <li className="">
            <a href="javascript:void(0);">
              <i className="list-icon feather feather-activity" />
              <span>Timeline</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
