// @flow
import * as React from "react";

import EventsPlaces from "./EventsPlaces";
import LongestLifetime from "./LongestLifetime";
import MostPopularPlace from "./MostPopularPlace";
import ShortestLifetime from "./ShortestLifetime";
import UniquePeople from "./UniquePeople";
import UniquePlaces from "./UniquePlaces";

const Dashboard = () => (
  <React.Fragment>
    <div className="widget-list row">
      <UniquePeople />
      <UniquePlaces />

      <LongestLifetime />
      <ShortestLifetime />
      <MostPopularPlace />
    </div>

    <hr />

    <div className="widget-list row">
      <EventsPlaces />
    </div>
  </React.Fragment>
);

export default Dashboard;
