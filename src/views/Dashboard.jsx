import React from "react";
import CountUp from "react-countup";

import { Person } from "../classes";
import { getPeople } from "../helpers/localstorage";

import Widget from "../components/Widget";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  async fetchData() {
    const people = await getPeople();

    this.setState({
      isLoading: false,
      people,
      longestLife: {
        name: new Person(people.getLongestLife()).format,
        age: people.getLongestLife().age,
      },
      shortestLife: {
        name: new Person(people.getShortestLife()).format,
        age: people.getShortestLife().age,
      },
      mostPopularPlace: {
        name: people.getMostPopularPlace().name,
        count: people.getMostPopularPlace().count,
      },
    });
  }

  render() {
    const { isLoading, longestLife, mostPopularPlace, people, shortestLife } = this.state;

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
                      end={people.size}
                      duration={1.5}
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
                      end={people.getPlacesCount().length}
                      duration={1.5}
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
          <Widget.Header title="Longest lifetime" icon="feather feather-user" dark />
          <Widget.Body>
            <Widget.Title>
              <span className="counter">
                <CountUp
                  start={0}
                  end={longestLife.age}
                  duration={1.5}
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
          <Widget.Header title="Shortest lifetime" icon="feather feather-user" dark />
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
          <Widget.Header title="Most popular place" icon="feather feather-map-pin" dark />
          <Widget.Body>
            <Widget.Title>{mostPopularPlace.name}</Widget.Title>
            <Widget.Subtitle>{mostPopularPlace.count} events took place there</Widget.Subtitle>
          </Widget.Body>
        </Widget>
      </div>
    );
  }
}

export default Dashboard;
