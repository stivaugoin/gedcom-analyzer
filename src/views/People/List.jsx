// @flow
import * as React from "react";
import moment from "moment";
import accents from "remove-accents";

import { Person } from "../../classes";
import { getPeople } from "../../helpers/localstorage";

type Props = {
  history: {
    push: Function
  }
};

type State = {
  isLoading: boolean,
  list: Array<{}>,
  people: Array<{}>
};

class List extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    (this: any).onChangeFilter = this.onChangeFilter.bind(this);
  }

  state = {
    isLoading: true,
    people: [],
    list: []
  };

  async componentDidMount() {
    await this.fetchData();
  }

  onChangeFilter(event: SyntheticInputEvent<>) {
    const filter = accents.remove(event.target.value.toLowerCase());

    if (filter) {
      const list = this.state.people.filter(p => {
        const person = new Person(p);

        const name = accents.remove(person.name.toLowerCase());
        const birthPlace =
          person.birthPlace && accents.remove(person.birthPlace.toLowerCase());
        const deathPlace =
          person.deathPlace && accents.remove(person.deathPlace.toLowerCase());

        return (
          name.includes(filter) ||
          (birthPlace && birthPlace.includes(filter)) ||
          (deathPlace && deathPlace.includes(filter))
        );
      });

      this.setState({ list });
    } else {
      this.setState({ list: this.state.people });
    }
  }

  async fetchData() {
    const people = await getPeople();

    this.setState({
      isLoading: false,
      people: people.people,
      list: people.people
    });
  }

  render() {
    const { isLoading, list } = this.state;

    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="widget-list row">
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
                  {list.map(p => {
                    const person = new Person(p);

                    return (
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
                            {person.sex === "M" ? "Men" : "Women"}
                            {person.age() && ` - ${person.age()} years`}
                          </span>
                        </td>
                        <td>
                          {person.birthDate &&
                            moment(person.birthDate).format("LL")}
                          <br />
                          <span className="text-muted">
                            {person.birthPlace}
                          </span>
                        </td>
                        <td>
                          {person.deathDate &&
                            moment(person.deathDate).format("LL")}
                          <br />
                          <span className="text-muted">
                            {person.deathPlace}
                          </span>
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
    );
  }
}

export default List;
