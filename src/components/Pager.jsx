import React from "react";
import classnames from "classnames";

type Props = {
  disableNext: () => void,
  disablePrevious: () => void,
  onClickNext: () => void,
  onClickPrevious: () => void,
};

class Pager extends React.Component<Props> {
  render() {
    return (
      <nav aria-label="...">
        <ul className="pager">
          <li
            className={classnames({
              disabled: this.props.disablePrevious,
            })}
          >
            <button
              className="btn btn-rounded btn-outline-color-scheme btn-sm"
              onClick={this.props.onClickPrevious}
            >
              <span aria-hidden="true">
                <i className="feather feather-chevron-left" />
              </span>{" "}
              Previous
            </button>
          </li>
          <li className="spacer" />
          <li
            className={classnames({
              disabled: this.props.disableNext,
            })}
          >
            <button
              className="btn btn-rounded btn-outline-color-scheme btn-sm"
              onClick={this.props.onClickNext}
            >
              Next{" "}
              <span aria-hidden="true">
                <i className="feather feather-chevron-right" />
              </span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pager;
