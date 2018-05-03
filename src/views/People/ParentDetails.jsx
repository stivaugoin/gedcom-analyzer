// @flow
import React from "react";
import { Link } from "react-router-dom";

import moment from "moment";

import db from "../../api/db";

type Props = {
  pointer: string,
  title: string,
};

type State = {
  isLoading: boolean,
  person: {
    name: string,
    pointer: string,
    birthDate: string,
    deathDate: string,
  },
};

class ParentDetails extends React.Component<Props, State> {
  state = {
    isLoading: true,
    person: {
      name: "",
      pointer: "",
      birthDate: "",
      deathDate: "",
    },
  };

  componentDidMount() {
    db.people
      .get(this.props.pointer)
      .then(person => this.setState({ isLoading: false, person }));
  }

  render() {
    const { title } = this.props;
    const { isLoading, person } = this.state;

    const birthYear =
      person.birthDate && moment(person.birthDate).format("YYYY");
    const deathYear =
      person.deathDate && moment(person.deathDate).format("YYYY");

    return (
      <div className="row columns-border-bw border-top">
        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center py-4">
          <h6 className="my-0">
            <span className="counter">
              {isLoading && <h4>Loading...</h4>}
              {!isLoading && (
                <div>
                  <Link to={`/people/profile/${person.pointer}`}>
                    {person.name}
                  </Link>
                  <small className="mr-l-5">
                    ({birthYear || "????"} - {deathYear || "????"})
                  </small>
                </div>
              )}
            </span>
          </h6>
          <small>{title}</small>
        </div>
      </div>
    );
  }
}

export default ParentDetails;
