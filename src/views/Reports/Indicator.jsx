// @flow
import React from "react";

import { capitalize } from "../../helpers/string";
import { getClassNamePercent } from "../../helpers/colors";
import { percent } from "../../helpers/number";

import Loading from "../../components/Loading";

type Props = {
  icon: string,
  isLoading?: boolean,
  name: string,
  nbTotal: number,
  nbEvents: number,
};

const Indicator = class extends React.PureComponent<Props> {
  defaultProps = {
    isLoading: false,
  };

  render() {
    const { icon, isLoading, name, nbEvents, nbTotal } = this.props;

    return (
      <div className="widget-holder widget-sm widget-border-radius col-md-6 col-xl-3">
        <div className="widget-bg">
          <div className="widget-heading bg-color-scheme">
            <span className="widget-title my-0 fs-16 fw-600">
              {capitalize(name)}
            </span>
            <i className={`widget-heading-icon feather feather-${icon}`} />
          </div>

          <div className="widget-body">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="counter-w-info">
                <div
                  className={`counter-title ${getClassNamePercent(
                    percent(nbEvents, nbTotal)
                  )}`}
                >
                  <span className="counter" id="counter-1">
                    {nbTotal === 0 ? 0 : percent(nbEvents, nbTotal)}
                  </span>%
                </div>
                <div className="counter-info">
                  {nbEvents || 0} / {nbTotal || 0} people
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Indicator;
