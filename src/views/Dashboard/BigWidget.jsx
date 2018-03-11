// @flow
import React from "react";
import CountUp from "react-countup";

import Loading from "../../components/Loading";

const BigWidget = (props: {
  isLoading: boolean,
  size: string,
  title: string,
  value: number,
}) => (
  <div
    className={`widget-holder widget-full-content widget-full-height ${
      props.size
    }`}
  >
    <div className="widget-bg">
      <div className="widget-body">
        <div className="counter-gradient">
          {props.isLoading ? (
            <h3 className="fs-60 fw-600 mt-3 pt-1 h1 letter-spacing-plus">
              <Loading />
            </h3>
          ) : (
            <h3 className="fs-60 fw-600 mt-3 pt-1 h1 letter-spacing-plus">
              <span className="counter">
                <CountUp
                  start={0}
                  end={props.value}
                  duration={1}
                  useEasing
                  useGrouping
                  separator=" "
                />
              </span>
            </h3>
          )}
          <h5 className="mb-4 fw-500">{props.title}</h5>
        </div>
      </div>
    </div>
  </div>
);

export default BigWidget;
