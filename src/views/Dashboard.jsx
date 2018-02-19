import React from 'react';

import { getPeople } from '../helpers/localstorage';

const Dashboard = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    const people = getPeople();
    console.log(people.getAverageAge());

    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    return <h1>Dashboard</h1>;
  }
};

export default Dashboard;
