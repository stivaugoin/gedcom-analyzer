import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import accents from 'remove-accents';

import { Person } from '../../classes';

const propTypes = {
  people: PropTypes.shape({
    people: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
};

class List extends Component {
  constructor(props) {
    super(props);

    this.people = props.people.people;

    this.state = {
      list: this.people,
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
  }

  onChangeFilter(event) {
    const filter = accents.remove(event.target.value.toLowerCase());

    if (filter) {
      const list = this.people.filter((p) => {
        const person = new Person(p);

        const name = accents.remove(person.name.toLowerCase());
        const birthPlace = person.birthPlace && accents.remove(person.birthPlace.toLowerCase());
        const deathPlace = person.deathPlace && accents.remove(person.deathPlace.toLowerCase());
        return name.includes(filter) ||
          (birthPlace && birthPlace.includes(filter)) ||
          (deathPlace && deathPlace.includes(filter));
      });
      this.setState({ list });
    } else {
      this.setState({ list: this.people });
    }
  }

  render() {
    return (
      <div className="widget-list">
        <div className="row">
          <div className="col-md-12 widget-holder">
            <div className="widget-bg">
              <div className="widget-heading clearfix">
                <h5>List of people</h5>
              </div>

              <div className="widget-body clearfix">

                <div className="form-group row">
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      placeholder="Search"
                      onChange={this.onChangeFilter}
                    />
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Birth</th>
                      <th>Death</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.list.map((p) => {
                      const person = new Person(p);

                      return (
                        <tr
                          key={person.pointer}
                          onClick={() => {
                            this.props.history.push(`/person/${person.pointer}`);
                          }}
                        >
                          <td>
                            {person.name}
                            <br />
                            <span className="text-muted">
                              {person.sex === 'M' ? 'Men' : 'Women'}
                              {person.age() && ` - ${person.age()} years`}
                            </span>
                          </td>
                          <td>
                            {person.birthDate && moment(person.birthDate).format('LL')}
                            <br />
                            <span className="text-muted">{person.birthPlace}</span>
                          </td>
                          <td>
                            {person.deathDate && moment(person.deathDate).format('LL')}
                            <br />
                            <span className="text-muted">{person.deathPlace}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = propTypes;

export default List;
