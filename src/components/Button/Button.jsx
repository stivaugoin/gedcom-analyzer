// @flow
import * as React from "react";
import classnames from "classnames";

type Props = {
  color?: string,
  icon?: string,
  onClick: Function,
  rounded?: boolean,
  small?: boolean,
  title?: string,
};

class Button extends React.PureComponent<Props> {
  static defaultProps = {
    color: "default",
    icon: "",
    rounded: false,
    small: false,
    title: "",
  };

  render() {
    const {
      color = "default",
      icon,
      onClick,
      rounded,
      small,
      title,
    } = this.props;

    const smallClass = "btn-sm fs-11 fw-400";

    const classNames = classnames(`btn btn-${color}`, small && smallClass, {
      "btn-rounded": rounded,
    });

    return (
      <button className={classNames} onClick={onClick}>
        {!!icon && <i className={`feather feather-${icon} mr-r-5`} />}
        {!!title && title}
      </button>
    );
  }
}

export default Button;
