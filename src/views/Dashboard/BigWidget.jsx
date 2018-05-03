// @flow
import * as React from "react";
import CountUp from "react-countup";

import Loading from "../../components/Loading";

type Props = {
  isLoading: boolean,
  size: string,
  title: string,
  value: number,
};

class BigWidget extends React.PureComponent<Props> {
  render() {
    const { isLoading, size, title, value } = this.props;

    return (
      <div
        className={`widget-holder widget-full-content widget-full-height ${size}`}
      >
        <div className="widget-bg">
          <div className="widget-body">
            <div className="counter-gradient">
              {isLoading ? (
                <h3 className="fs-60 fw-600 mt-3 pt-1 h1 letter-spacing-plus">
                  <Loading />
                </h3>
              ) : (
                <h3 className="fs-60 fw-600 mt-3 pt-1 h1 letter-spacing-plus">
                  <span className="counter">
                    <CountUp
                      start={0}
                      end={value}
                      duration={1}
                      useEasing
                      useGrouping
                      separator=" "
                    />
                  </span>
                </h3>
              )}
              <h5 className="mb-4 fw-500">{title}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BigWidget;
