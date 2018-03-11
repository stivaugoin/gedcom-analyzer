// @flow
import * as React from "react";

import LongestLifetime from "./LongestLifetime";
import UniquePeople from "./UniquePeople";
import UniquePlaces from "./UniquePlaces";
import ShortestLifetime from "./ShortestLifetime";
import MostPopularPlace from "./MostPopularPlace";

const Dashboard = () => (
  <div className="widget-list row">
    <UniquePeople />
    <UniquePlaces />
    <LongestLifetime />
    <ShortestLifetime />
    <MostPopularPlace />
  </div>
);

export default Dashboard;
