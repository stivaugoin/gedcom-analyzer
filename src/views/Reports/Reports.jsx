// @flow
import React, { Component, Fragment } from "react";

import db from "../../api/db";

import EventIndicators from "./EventIndicators";

type Props = {};

type State = {
  baptism: Object,
  birth: Object,
  buried: Object,
  death: Object,
  isLoading: boolean,
  nbPeople: number,
  weddings: Object,
};

class Report extends Component<Props, State> {
  state = {
    baptism: {},
    birth: {},
    buried: {},
    death: {},
    isLoading: true,
    nbPeople: 0,
    weddings: {},
  };

  async componentDidMount() {
    Promise.all([db.statistics.get(1), db.people.count()]).then(
      ([statistics, nbPeople]) => {
        const { baptism, birth, buried, death, weddings } = statistics.events;
        this.setState({
          baptism,
          birth,
          buried,
          death,
          isLoading: false,
          nbPeople,
          weddings,
        });
      }
    );
  }

  render() {
    const {
      birth,
      baptism,
      buried,
      death,
      isLoading,
      nbPeople,
      weddings,
    } = this.state;

    return (
      <Fragment>
        {/* BIRTH */}
        <EventIndicators
          isLoading={isLoading}
          name="birth"
          nbPeople={nbPeople}
          indicator={birth}
        />

        {/* BAPTISM */}
        <EventIndicators
          isLoading={isLoading}
          name="baptism"
          nbPeople={nbPeople}
          indicator={baptism}
        />

        {/* MARRIAGE */}
        <EventIndicators
          isLoading={isLoading}
          name="marriage"
          nbPeople={nbPeople}
          indicator={weddings}
        />

        {/* DEATH */}
        <EventIndicators
          isLoading={isLoading}
          name="death"
          nbPeople={nbPeople}
          indicator={death}
        />

        {/* BURIED */}
        <EventIndicators
          isLoading={isLoading}
          name="buried"
          nbPeople={nbPeople}
          indicator={buried}
        />
      </Fragment>
    );
  }
}

export default Report;
