// @flow
import * as React from "react";
import moment from "moment";

import { capitalize } from "../../helpers/string";

const Event = (props: { name: string, place: string, date: string }) => (
  <div key={props.name} className="single media">
    <i className="feather feather-chevron-right fs-40 mr-r-10 text-primary" />
    <div className="media-body">
      <div className="single-header clearfix">
        <div className="float-left">
          <span className="single-event-name">{capitalize(props.name)}</span>
          <span className="single-event-place">{props.place}</span>
        </div>
        <span className="single-event-date float-right">
          <span>{moment(props.date).format("LL")}</span>
        </span>
      </div>
    </div>
  </div>
);

export default Event;
