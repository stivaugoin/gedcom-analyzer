// @flow
import React, { Component } from "react";
import moment from "moment";
import classnames from "classnames";
import uuidv4 from "uuid/v4";

import IconWithTooltip from "./IconWithTooltip";

// TODO Improve this
type Props = {
  data: any,
};

type State = {
  isLoading: boolean,
  icons: Array<Object>,
};

const color = {
  green: "color-color-scheme",
  yellow: "color-warning",
  red: "color-danger",
};

function getColorBySources(sources) {
  if (!sources || sources.length === 0) {
    return color.red;
  }

  if (sources.length === 1) {
    return color.yellow;
  }

  return color.green;
}

class Details extends Component<Props, State> {
  state = {
    isLoading: true,
    icons: [],
  };

  componentWillMount() {
    this.calculate();
  }

  calculate = () => {
    const { data } = this.props;
    const isArray = Array.isArray(data) && data.length > 0;

    const date = isArray ? data[0].date : data.date;
    const place = isArray ? data[0].place : data.place;
    const sources = isArray ? data[0].sources : data.sources;

    this.setState({
      isLoading: false,
      icons: [
        // DATE
        {
          id: uuidv4(),
          className: classnames(
            "feather",
            "feather-calendar",
            date ? color.green : color.red
          ),
          value: date ? moment(date).format("LL") : "---",
        },

        // PLACE
        {
          id: uuidv4(),
          className: classnames(
            "feather",
            "feather-map-pin",
            place ? color.green : color.red
          ),
          value: place ? place.name : "---",
        },

        // SOURCES
        {
          id: uuidv4(),
          className: classnames(
            "feather",
            "feather-file",
            getColorBySources(sources)
          ),
          value:
            !sources || sources.length === 0
              ? "0 source"
              : `${sources.length} sources`,
        },
      ],
    });
  };

  render() {
    const { icons, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="fs-30 d-flex justify-content-around">
        {icons.map(icon => (
          <div key={icon.id} className="fs-30 d-flex justify-content-around">
            <IconWithTooltip {...icon} />
          </div>
        ))}
      </div>
    );
  }
}

export default Details;
