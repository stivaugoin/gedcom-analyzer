/* eslint-disable jsx-a11y/anchor-is-valid, no-script-url */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

import { Person } from '../classes';
import Widget from '../components/Widget';

const propTypes = {
  people: PropTypes.shape({
    getLongestLife: PropTypes.func.isRequired,
    getMostPopularPlace: PropTypes.func.isRequired,
    getPlacesCount: PropTypes.func.isRequired,
    getShortestLife: PropTypes.func.isRequired,
    people: PropTypes.arrayOf(PropTypes.shape).isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
};

class Home extends PureComponent {
  constructor(props) {
    super(props);

    // Longest life
    const longestLife = props.people.getLongestLife();
    this.longestLife = {
      name: new Person(longestLife).format,
      age: longestLife.age,
    };

    // Shortest life
    const shortestLife = props.people.getShortestLife();
    this.shortestLife = {
      name: new Person(shortestLife).format,
      age: shortestLife.age,
    };

    // Most popular place
    const mostPopularPlace = props.people.getMostPopularPlace();
    this.mostPopularPlace = {
      name: mostPopularPlace.name,
      count: mostPopularPlace.count,
    };
  }

  render() {
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
                      end={this.props.people.size}
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
                      end={this.props.people.getPlacesCount().length}
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
                  end={this.longestLife.age}
                  duration={1.5}
                  useEasing
                  useGrouping
                  separator=" "
                />
              </span> years
            </Widget.Title>
            <Widget.Subtitle>
              {this.longestLife.name}
            </Widget.Subtitle>
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
                  end={this.shortestLife.age}
                  duration={1.5}
                  useEasing
                  useGrouping
                  separator=" "
                />
              </span> years
            </Widget.Title>
            <Widget.Subtitle>
              {this.shortestLife.name}
            </Widget.Subtitle>
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
            <Widget.Title>
              {this.mostPopularPlace.name}
            </Widget.Title>
            <Widget.Subtitle>
              {this.mostPopularPlace.count} events took place there
            </Widget.Subtitle>
          </Widget.Body>
        </Widget>
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default Home;
