import React from "react";

import Diagrams from "./Diagrams";
import Indicator from "./Indicator";
import MainIndicators from "./MainIndicators";

type Props = {
  isLoading: boolean,
  name: string,
  nbPeople: number,
  indicator: {
    total: number,
    men: number,
    women: number,
    place: number,
    date: number,
    atLeastOneSource: number,
    moreThanOneSource: number,
  },
};

class EventIndicators extends React.PureComponent<Props> {
  render() {
    const { isLoading, name, nbPeople, indicator } = this.props;

    return (
      <div className="widget-list row mr-b-30">
        <MainIndicators
          isLoading={isLoading}
          name={name}
          nbEvents={indicator.total}
          nbMen={indicator.men}
          nbPeople={nbPeople}
          nbWomen={indicator.women}
        />
        <Diagrams />
        <Indicator
          icon="calendar"
          isLoading={isLoading}
          name="date"
          nbEvents={indicator.date}
          nbTotal={indicator.total}
        />
        <Indicator
          icon="map-pin"
          isLoading={isLoading}
          name="place"
          nbEvents={indicator.place}
          nbTotal={indicator.total}
        />
        <Indicator
          icon="bookmark"
          isLoading={isLoading}
          name="at least one source"
          nbEvents={indicator.atLeastOneSource}
          nbTotal={indicator.total}
        />
        <Indicator
          icon="bookmark"
          isLoading={isLoading}
          name="more than one source"
          nbEvents={indicator.moreThanOneSource}
          nbTotal={indicator.total}
        />
      </div>
    );
  }
}

export default EventIndicators;
