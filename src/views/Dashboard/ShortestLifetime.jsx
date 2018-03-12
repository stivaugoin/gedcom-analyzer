// @flow
import * as React from "react";
import CountUp from "react-countup";

import db from "../../api/db";
import { Person } from "../../classes";

import Loading from "../../components/Loading";
import Widget, { Body, Header, Subtitle, Title } from "../../components/Widget";

type State = {
  isLoading: boolean,
  name: string,
  value: number,
};

class ShortestLifetime extends React.Component<{}, State> {
  state = {
    isLoading: true,
    name: "",
    value: 0,
  };

  componentDidMount() {
    db.people
      .orderBy("age")
      .first()
      .then(person =>
        this.setState({
          isLoading: false,
          name: new Person(person).format,
          value: person.age,
        })
      );
  }

  render() {
    const { isLoading, name, value } = this.state;
    return (
      <Widget size="col-md-3">
        <Header title="Shortest lifetime" icon="feather feather-user" />
        <Body>
          {isLoading && (
            <Title>
              <Loading />
            </Title>
          )}

          {!isLoading && (
            <React.Fragment>
              <Title>
                <span className="counter">
                  <CountUp
                    start={0}
                    end={value}
                    duration={1}
                    useEasing
                    useGrouping
                    separator=" "
                  />
                </span>
                {" years"}
              </Title>
              <Subtitle>{name}</Subtitle>
            </React.Fragment>
          )}
        </Body>
      </Widget>
    );
  }
}

export default ShortestLifetime;
