// @flow
import * as React from "react";

import Event from "./Event";

const Timeline = (props: {
  events: Array<{ name: string, place: string, date: string }>,
}) => (
  <div className="tab-content">
    <div className="tab-pane active">
      <div className="widget-user-activities">
        {props.events.map(event => {
          const { name, place, date } = event;
          return Event({ name, place, date });
        })}
      </div>
    </div>
  </div>
);

export default Timeline;
