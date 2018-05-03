// @flow
import * as React from "react";
import moment from "moment";

import { capitalize } from "../../helpers/string";

type Props = {
  name: string,
  place?: { name: string },
  date: string,
};

class Event extends React.PureComponent<Props> {
  defaultProps = {
    place: {},
  };

  render() {
    const { date, name, place } = this.props;

    return (
      <div key={name} className="single media">
        <i className="feather feather-chevron-right fs-40 mr-r-10 text-primary" />
        <div className="media-body">
          <div className="single-header clearfix">
            <div className="float-left">
              <span className="single-event-name">{capitalize(name)}</span>
              <span className="single-event-place">{place && place.name}</span>
            </div>
            <span className="single-event-date float-right">
              <span>{moment(date).format("LL")}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Event;
