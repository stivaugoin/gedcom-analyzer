import React from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { getPerson } from '../../helpers/localstorage';

import Timeline from './Timelime';

import profileBg from '../../assets/profile-bg.jpg';
import iconMen from '../../assets/men.jpg';
import iconWomen from '../../assets/women.jpg';

const renderParentInfo = (pointer, name, birthYear = '????', deathYear = '????') => (
  <div>
    <Link to={`/people/profile/${pointer}`}>
      {name}
    </Link>
    <small className="mr-l-5">({birthYear} - {deathYear})</small>
  </div>
);

const indicator = (title, subtitle, size) => (
  <div className={`${size} d-flex flex-column justify-content-center align-items-center py-4`}>
    <h6 className="my-0">
      <span className="counter">{title}</span>
    </h6>
    <small>{subtitle}</small>
  </div>
);

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pointer: PropTypes.string,
    }),
  }).isRequired,
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.tabItems = ['History'];

    this.state = {
      isLoading: true,
      selectedTab: 0,
    };

    this.onChangeTab = this.onChangeTab.bind(this);
    this.isTabSelected = this.isTabSelected.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ person: getPerson(nextProps.match.params.pointer) });
  }

  onChangeTab(index) {
    this.setState({ selectedTab: index });
  }

  isTabSelected(tabIndex) {
    return tabIndex === this.state.selectedTab;
  }

  async fetchData() {
    const { pointer } = this.props.match.params;

    const person = await getPerson(pointer);

    this.setState({
      isLoading: false,
      person,
    });
  }

  render() {
    const {
      isLoading,
      person,
    } = this.state;

    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    const icon = person.sex === 'M' ? iconMen : iconWomen;

    const { father } = person;
    const fatherLink = father && renderParentInfo(
      father.pointer,
      father.name,
      father.birthYear,
      father.deathYear,
    );

    const { mother } = person;
    const motherLink = mother && renderParentInfo(
      mother.pointer,
      mother.name,
      mother.birthYear,
      mother.deathYear,
    );

    return (
      <div className="widget-list">
        <div className="row">
          <div className="col-12 col-md-4 widget-holder widget-full-content">
            <div className="widget-bg">
              <div className="widget-body clearfix">
                <div className="widget-user-profile">
                  <figure className="profile-wall-img">
                    <img src={profileBg} alt="profile" />
                  </figure>

                  <div className="profile-body pd-b-20">
                    <figure className="profile-user-avatar thumb-md">
                      <img src={icon} alt={person.sex} />
                    </figure>
                    <h6 className="h3 profile-user-name">{person.name}</h6>
                    <small>
                      ({person.birthYear || '????'} - {person.deathYear || '????'})
                    </small>
                  </div>

                  {person.father && (
                    <div className="row columns-border-bw border-top">
                      {indicator(fatherLink, 'Father', 'col-12')}
                    </div>
                  )}

                  {person.mother && (
                    <div className="row columns-border-bw border-top">
                      {indicator(motherLink, 'Mother', 'col-12')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8 mr-b-30">
            <Tabs onSelect={this.onChangeTab}>
              <TabList className="nav nav-tabs contact-details-tab">
                {this.tabItems.map((tab, index) => (
                  <Tab key={tab} className="nav-item">
                    <a className={classnames('nav-link', { active: this.isTabSelected(index) })}>
                      {tab}
                    </a>
                  </Tab>
                ))}
              </TabList>

              <TabPanel>
                <Timeline person={person} />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = propTypes;

export default Profile;
