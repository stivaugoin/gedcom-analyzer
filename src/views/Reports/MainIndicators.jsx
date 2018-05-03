// @flow
import React, { Fragment } from "react";

import { capitalize } from "../../helpers/string";
import { getClassNamePercent } from "../../helpers/colors";
import { percent } from "../../helpers/number";

import Loading from "../../components/Loading";

type Props = {
  isLoading?: boolean,
  name: string,
  nbEvents: number,
  nbMen: number,
  nbPeople: number,
  nbWomen: number,
};

const MainIndicators = class extends React.Component<Props> {
  defaultProps = {
    isLoading: false,
  };

  render() {
    const { isLoading, name, nbEvents, nbMen, nbPeople, nbWomen } = this.props;

    return (
      <div className="widget-holder widget-full-content widget-full-height col-xl-6">
        <div className="widget-bg">
          <div className="widget-heading widget-heading-border">
            <h5 className="widget-title">{capitalize(name)} mentions</h5>
            <div className="widget-actions">
              <a
                href="/todo"
                className="badge bg-primary-contrast px-3 cursor-pointer heading-font-family"
              >
                See all mentions
              </a>
            </div>
          </div>
          <div className="widget-body">
            <div className="counter-gradient" style={{ height: "188px" }}>
              {isLoading ? (
                <h3 className="fs-60 fw-600 mt-3 pt-1 h1 letter-spacing-plus">
                  <Loading />
                </h3>
              ) : (
                <Fragment>
                  <h3 className="fs-60 mt-3 pt-1 h1 letter-spacing-plus">
                    <span
                      className={getClassNamePercent(
                        percent(nbEvents, nbPeople)
                      )}
                    >
                      {percent(nbEvents, nbPeople)}
                      <span className="fs-40">%</span>
                    </span>
                  </h3>
                  <h5 className="mb-3 fw-500">
                    {nbEvents || 0} / {nbPeople} people
                  </h5>
                </Fragment>
              )}
            </div>
            <div className="row columns-border-bw border-top">
              <div className="col-6 d-flex flex-column justify-content-center pd-tb-20">
                <div className="counter-w-info mr-b-0">
                  <div className="counter-title color-color-scheme">
                    <span className="counter fs-30">
                      {isLoading ? <Loading /> : percent(nbMen, nbEvents)}
                    </span>%
                  </div>
                  <div className="counter-info">Men</div>
                </div>
              </div>
              <div className="col-6 d-flex flex-column justify-content-center pd-tb-20">
                <div className="counter-w-info mr-b-0">
                  <div className="counter-title color-color-scheme">
                    <span className="counter fs-30">
                      {isLoading ? <Loading /> : percent(nbWomen, nbEvents)}
                    </span>%
                  </div>
                  <div className="counter-info">Women</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MainIndicators;
