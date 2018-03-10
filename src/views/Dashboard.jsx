// @flow
import * as React from "react";
import CountUp from "react-countup";

import { Person } from "../classes";

import Widget from "../components/Widget";
import db from "../api/db";

type Props = {};

type State = {
  isLoading: boolean,
  peopleCount: number,
  placesCount: number,
  longestLife: { name: string, age: number },
  shortestLife: { name: string, age: number },
  mostPopularPlace: { name: string, count: number },
};

class Dashboard extends React.Component<Props, State> {
  state = {
    isLoading: true,
    peopleCount: 0,
    placesCount: 0,
    longestLife: { name: "", age: 0 },
    shortestLife: { name: "", age: 0 },
    mostPopularPlace: { name: "", count: 0 },
  };

  componentDidMount() {
    Promise.all([
      db.people.count(),
      db.places.count(),
      db.people.orderBy("age").first(),
      db.people.orderBy("age").last(),
      db.places.orderBy("count").last(),
    ]).then(results => {
      const [
        peopleCount,
        placesCount,
        youngestPerson,
        oldestPerson,
        mostPopularPlace,
      ] = results;

      this.setState({
        isLoading: false,
        peopleCount,
        placesCount,
        longestLife: {
          name: new Person(oldestPerson).format,
          age: oldestPerson.age,
        },
        shortestLife: {
          name: new Person(youngestPerson).format,
          age: youngestPerson.age,
        },
        mostPopularPlace,
      });
    });
  }

  render() {
    console.log("Dashboard - State", this.state);
    const {
      isLoading,
      peopleCount,
      placesCount,
      longestLife,
      shortestLife,
      mostPopularPlace,
    } = this.state;

    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="widget-list row">
        <div className="widget-holder widget-full-content widget-full-height col-md-6">
          <div className="widget-bg">
            <div className="widget-body">
              <div className="counter-gradient">
                <h3 className="fs-60 fw-600 mt-3 pt-1 h1 letter-spacing-plus">
                  <span className="counter">
                    <CountUp
                      start={0}
                      end={peopleCount}
                      duration={1}
                      useEasing
                      useGrouping
                      separator=" "
                    />
                  </span>
                </h3>
                <h5 className="mb-4 fw-500">Unique people</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="widget-holder widget-full-content widget-full-height col-md-6">
          <div className="widget-bg">
            <div className="widget-body">
              <div className="counter-gradient">
                <h3 className="fs-60 fw-600 mt-3 pt-1 h1 letter-spacing-plus">
                  <span className="counter">
                    <CountUp
                      start={0}
                      end={placesCount}
                      duration={1}
                      useEasing
                      useGrouping
                      separator=" "
                    />
                  </span>
                </h3>
                <h5 className="mb-4 fw-500">Unique places</h5>
              </div>
            </div>
          </div>
        </div>

        {/* LONGEST LIFETIME */}
        <Widget size="col-md-3">
          <Widget.Header
            title="Longest lifetime"
            icon="feather feather-user"
            dark
          />
          <Widget.Body>
            <Widget.Title>
              <span className="counter">
                <CountUp
                  start={0}
                  end={longestLife.age}
                  duration={1}
                  useEasing
                  useGrouping
                  separator=" "
                />
              </span>{" "}
              years
            </Widget.Title>
            <Widget.Subtitle>{longestLife.name}</Widget.Subtitle>
          </Widget.Body>
        </Widget>

        {/* SHORTEST LIFETIME */}
        <Widget size="col-md-3">
          <Widget.Header
            title="Shortest lifetime"
            icon="feather feather-user"
            dark
          />
          <Widget.Body>
            <Widget.Title>
              <span className="counter">
                <CountUp
                  start={0}
                  end={shortestLife.age}
                  duration={1.5}
                  useEasing
                  useGrouping
                  separator=" "
                />
              </span>{" "}
              years
            </Widget.Title>
            <Widget.Subtitle>{shortestLife.name}</Widget.Subtitle>
          </Widget.Body>
        </Widget>

        {/* POPULAR PLACE */}
        <Widget size="col-md-6">
          <Widget.Header
            title="Most popular place"
            icon="feather feather-map-pin"
            dark
          />
          <Widget.Body>
            <Widget.Title>{mostPopularPlace.name}</Widget.Title>
            <Widget.Subtitle>
              {mostPopularPlace.count} events took place there
            </Widget.Subtitle>
          </Widget.Body>
        </Widget>
      </div>
    );
  }
}

export default Dashboard;
