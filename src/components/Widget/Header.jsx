// @flow
import React from "react";
import classnames from "classnames";

const defaultProps = {
  dark: false,
  icon: "",
};

const Header = (props: { dark?: boolean, icon?: string, title: string }) => (
  <div
    className={classnames("widget-heading", { "bg-color-scheme": props.dark })}
  >
    <span className="widget-title my-0 fs-12 fw-600">{props.title}</span>
    {props.icon && <i className={`widget-heading-icon ${props.icon}`} />}
  </div>
);

Header.defaultProps = defaultProps;

export default Header;
