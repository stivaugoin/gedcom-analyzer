// @flow
import React from "react";

import db from "../../api/db";
import type { Person as PersonType } from "../../api/person/types";

import Details from "./Details";
import Pager from "../../components/Pager";
import Total from "./Total";

type Props = {};

type State = {
  currentPage: number,
  isLoading: boolean,
  itemsPerPage: number,
  list: Array<PersonType>,
  people: Array<PersonType>,
};

class PeopleList extends React.Component<Props, State> {
  state = {
    currentPage: 1,
    isLoading: true,
    itemsPerPage: 10,
    people: [],
    list: [],
  };

  componentDidMount() {
    this.searchAll();
  }

  searchAll = () => {
    const { currentPage, itemsPerPage } = this.state;

    db.people.reverse().toArray(people => {
      const sortedPeople = people.sort((a, b) => {
        if (!a.birthDate && b.birthDate) {
          return 1;
        }
        if (a.birthDate && !b.birthDate) {
          return -1;
        }
        if (a.birthDate < b.birthDate) {
          return 1;
        }
        if (a.birthDate > b.birthDate) {
          return -1;
        }

        return 0;
      });

      this.setState({
        isLoading: false,
        people: sortedPeople,
        list: sortedPeople.slice(currentPage - 1, itemsPerPage),
      });
    });
  };

  handlePageDown = () => {
    const { currentPage, itemsPerPage } = this.state;

    const newPage = currentPage - 1;

    this.setState({
      currentPage: newPage,
      list: this.state.people.slice(
        (newPage - 1) * itemsPerPage,
        newPage * itemsPerPage
      ),
    });
  };

  handlePageUp = () => {
    const { currentPage, itemsPerPage } = this.state;

    const newPage = currentPage + 1;

    this.setState({
      currentPage: newPage,
      list: this.state.people.slice(
        (newPage - 1) * itemsPerPage,
        newPage * itemsPerPage
      ),
    });
  };

  render() {
    const { currentPage, isLoading, itemsPerPage, list, people } = this.state;

    return (
      <div className="widget-list row">
        <div className="col-md-12 widget-holder">
          <div className="widget-bg">
            <div className="widget-heading">
              <h5>Person&apos;s list</h5>
            </div>

            <div className="widget-body">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th style={{ textAlign: "center" }}>Birth</th>
                    <th style={{ textAlign: "center" }}>Marriage</th>
                    <th style={{ textAlign: "center" }}>Death</th>
                    <th style={{ textAlign: "center" }}>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan="5">Loading...</td>
                    </tr>
                  )}
                  {list.map(person => (
                    <tr key={person.pointer}>
                      <td
                        className="fs-18 vertical-middle"
                        style={{ width: 500 }}
                      >
                        {person.lname.toUpperCase()}, {person.fname}
                      </td>
                      <td className="vertical-middle">
                        <Details data={person.birth} />
                      </td>
                      <td className="vertical-middle">
                        <Details data={person.weddings} />
                      </td>
                      <td className="vertical-middle">
                        <Details data={person.death || {}} />
                      </td>
                      <td>
                        <Total person={person} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pager
                disableNext={people.length / itemsPerPage < currentPage}
                disablePrevious={currentPage === 1}
                onClickNext={this.handlePageUp}
                onClickPrevious={this.handlePageDown}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PeopleList;
