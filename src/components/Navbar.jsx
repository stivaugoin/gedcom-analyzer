import React from 'react';

const Navbar = () => (
  <div id="wrapper" className="wrapper">
    <nav className="navbar">
      <div className="navbar-header">
        <a href="index.html" className="navbar-brand">
          <p>GEDCOM</p>
          <p><small>analyzer</small></p>
        </a>
      </div>
      <ul className="nav navbar-nav">
        <li>
          <a href="javascript:void(0);" className="ripple">
            Pricing
          </a>
        </li>
        <li>
          <a href="javascript:void(0);" className="ripple">
            About
          </a>
        </li>
        <li>
          <a href="javascript:void(0);" className="ripple">
            Help
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Navbar;
