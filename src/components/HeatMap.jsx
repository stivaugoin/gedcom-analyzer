// @flow
import * as React from "react";
import Dimensions from "react-dimensions";
import GoogleMapReact from "google-map-react";

type Props = {
  center: { lat: number, lng: number },
  containerWidth: number,
  points: Array<{ lat: number, lng: number }>,
  zoom: number,
};

class HeatMap extends React.Component<Props, {}> {
  static defaultProps = {
    center: { lat: 35.0243291, lng: -32.3600762 },
    zoom: 3,
  };

  state = {};

  render() {
    const { points } = this.props;
    console.log(points);
    return (
      <div style={{ height: "500px", width: this.props.containerWidth }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: ["AIzaSyDroqUsXml0Nxgyrqw8n1LB5x1Z_aMU7mk"],
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {points.map(point => (
            <i
              key={point.name}
              className="feather feather-map-pin fs-24 color-gray-900"
              lat={point.lat}
              lng={point.lng}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Dimensions()(HeatMap);
