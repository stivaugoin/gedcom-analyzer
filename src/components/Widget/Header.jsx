// @flow
import React from "react";
import classnames from "classnames";

type Props = {
  dark?: boolean,
  icon?: string,
  title: string,
};
class Header extends React.PureComponent<Props> {
  defaultProps = {
    dark: false,
    icon: "",
  };

  render() {
    const { dark, icon, title } = this.props;

    return (
      <div
        className={classnames("widget-heading", {
          "bg-color-scheme": dark,
        })}
      >
        <span className="widget-title my-0 fs-12 fw-600">{title}</span>
        {icon && <i className={`widget-heading-icon ${icon}`} />}
      </div>
    );
  }
}

export default Header;
