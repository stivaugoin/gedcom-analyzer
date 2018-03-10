// @flow
import React, { Fragment } from "react";
import moment from "moment";

import db from "../../api/db";
import type { Person as PersonType } from "../../types/person";

import Button from "../../components/Button";

type Props = {
  history: {
    push: Function,
  },
};

type State = {
  isLoading: boolean,
  people: Array<PersonType>,
};

class List extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    (this: any).onClear = this.onClear.bind(this);
    (this: any).onSearch = this.onSearch.bind(this);
    (this: any).searchAll = this.searchAll.bind(this);
  }

  state = {
    isLoading: true,
    people: [],
  };

  componentDidMount() {
    this.search.focus();
    this.searchAll();
  }

  onClear() {
    this.search.value = "";
    this.search.focus();
    this.searchAll();
  }

  onSearch(event: any) {
    event.preventDefault();
    const { value } = this.search;

    this.setState({ isLoading: true });

    if (!value) {
      this.searchAll();
    } else {
      Promise.all([
        db.people
          .where("fname")
          .startsWithIgnoreCase(value)
          .toArray(),
        db.people
          .where("lname")
          .startsWithIgnoreCase(value)
          .toArray(),
        db.people
          .where("name")
          .startsWithIgnoreCase(value)
          .toArray(),
      ]).then(results => {
        const [fname, lname, name] = results;
        const peopleMap = new Map();
        const people = [];

        [...fname, ...lname, ...name].forEach(result =>
          peopleMap.set(result.pointer, result)
        );
        peopleMap.forEach(person => people.push({ ...person }));
        this.setState({ isLoading: false, people });
      });
    }
  }

  search: any;

  searchAll() {
    db.people
      .orderBy("birthDate")
      .reverse()
      .toArray(people => this.setState({ isLoading: false, people }));
  }

  render() {
    console.log("List - State", this.state);
    const { isLoading, people } = this.state;

    return (
      <div className="widget-list row">
        <div className="col-md-12 widget-holder">
          <div className="widget-bg">
            <div className="widget-heading clearfix">
              <h5>Person&apos;s list</h5>
            </div>

            <div className="widget-body clearfix">
              <form onSubmit={this.onSearch}>
                <div className="form-group row">
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      placeholder="Search"
                      ref={input => {
                        this.search = input;
                      }}
                    />
                  </div>
                  <div className="col-md-2">
                    <Button
                      title="Search"
                      onClick={this.onSearch}
                      color="primary"
                    />{" "}
                    <Button title="Clear" onClick={this.onClear} />
                  </div>
                </div>
              </form>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Birth</th>
                    <th>Death</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan="3">Loading...</td>
                    </tr>
                  )}
                  {people.map((person: PersonType) => (
                    <tr
                      key={person.pointer}
                      onClick={() => {
                        this.props.history.push(
                          `/people/profile/${person.pointer}`
                        );
                      }}
                    >
                      <td>
                        {person.name}
                        <br />
                        <span className="text-muted">
                          <Fragment>
                            {person.sex === "M" ? "Men" : "Women"}
                            {person.age && ` - ${person.age} years`}
                          </Fragment>
                        </span>
                      </td>
                      <td>
                        <Fragment>
                          {person.birthDate &&
                            moment(person.birthDate).format("LL")}
                          <br />
                          <span className="text-muted">
                            {person.birth.place}
                          </span>
                        </Fragment>
                      </td>
                      <td>
                        <Fragment>
                          {person.deathDate &&
                            moment(person.deathDate).format("LL")}
                          <br />
                          <span className="text-muted">
                            {person.death.place}
                          </span>
                        </Fragment>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
