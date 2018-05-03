// @flow
import * as React from "react";

import { Person } from "../../classes";
import type { Person as PersonType } from "../../api/person/types";

import Event from "./Event";

type Props = {
  person: PersonType,
};

const getEvents = (person: PersonType) => new Person(person).events;

const Timeline = class extends React.Component<Props> {
  render() {
    const { person } = this.props;

    return (
      <div className="tab-content">
        <div className="tab-pane active">
          <div className="widget-user-activities">
            {getEvents(person).map(event => {
              const { name, place, date } = event;
              return (
                <Event
                  key={`${name}-${date || ""}`}
                  {...{ name, place, date }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Timeline;
