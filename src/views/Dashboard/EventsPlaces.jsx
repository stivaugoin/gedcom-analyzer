// @flow
import * as React from "react";

import db from "../../api/db";

import HeatMap from "../../components/HeatMap";
import Loading from "../../components/Loading";
import Widget, { Header, Title } from "../../components/Widget";

type State = {
  isLoading: boolean,
  points: Array<{ lat: number, lng: number }>,
};

class BirthPlace extends React.Component<{}, State> {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11,
  };

  state = {
    isLoading: true,
    points: [],
  };

  componentDidMount() {
    db.places.toArray().then(places => {
      const points = [];
      places.filter(place => place.lat && place.lng).forEach(place => {
        points.push({ ...place });
      });

      this.setState({
        isLoading: false,
        points,
      });
    });
  }

  render() {
    const { isLoading, points } = this.state;
    return (
      <Widget size="col-md-12">
        <Header title="Events places" icon="feather feather-map" />
        <div className="widget-body">
          {isLoading && (
            <Title>
              <Loading />
            </Title>
          )}

          {!isLoading && <HeatMap points={points} />}
        </div>
      </Widget>
    );
  }
}

export default BirthPlace;
