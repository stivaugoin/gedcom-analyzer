// @flow
import * as React from "react";

import db from "../../api/db";

import Loading from "../../components/Loading";
import Widget, { Body, Header, Subtitle, Title } from "../../components/Widget";

type State = {
  isLoading: boolean,
  name: string,
  value: number,
};

class MostPopularPlace extends React.Component<{}, State> {
  state = {
    isLoading: true,
    name: "",
    value: 0,
  };

  componentDidMount() {
    db.places
      .orderBy("count")
      .last()
      .then(place =>
        this.setState({
          isLoading: false,
          name: place.name,
          value: place.count,
        })
      );
  }

  render() {
    const { isLoading, name, value } = this.state;
    return (
      <Widget size="col-md-6">
        <Header title="Most popular place" icon="feather feather-user" dark />
        <Body>
          {isLoading ? (
            <Title>
              <Loading />
            </Title>
          ) : (
            <React.Fragment>
              <Title>{name}</Title>
              <Subtitle>{value} events took place there</Subtitle>
            </React.Fragment>
          )}
        </Body>
      </Widget>
    );
  }
}

export default MostPopularPlace;
