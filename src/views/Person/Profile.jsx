/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { getPerson } from '../../helpers/classes';

import Timeline from './Timeline';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pointer: PropTypes.string,
    }),
  }).isRequired,
};

const renderParentInfo = (pointer, name, birthYear = '????', deathYear = '????') => (
  <div>
    <Link to={`/person/${pointer}`}>
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

const Profile = class extends React.Component {
  constructor(props) {
    super(props);

    this.person = getPerson(props.match.params.pointer);

    this.tabItems = ['History'];

    this.state = {
      selectedTab: 0,
    };

    this.onChangeTab = this.onChangeTab.bind(this);
    this.isTabSelected = this.isTabSelected.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.person = getPerson(nextProps.match.params.pointer);
  }

  onChangeTab(index) {
    this.setState({ selectedTab: index });
  }

  isTabSelected(tabIndex) {
    return tabIndex === this.state.selectedTab;
  }

  render() {
    const father = this.person.father && getPerson(this.person.father.pointer.slice(1, -1));
    const fatherLink = father && renderParentInfo(
      father.pointer,
      father.name,
      father.birthYear,
      father.deathYear,
    );

    const mother = this.person.mother && getPerson(this.person.mother.pointer.slice(1, -1));
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
                    <img src={require('../../assets/user-widget-bg.jpeg')} alt="User Wall" />
                  </figure>

                  <div className="profile-body pd-b-20">
                    <figure className="profile-user-avatar thumb-md">
                      <img src={require('../../assets/user1.jpg')} alt={this.person.sex} />
                    </figure>
                    <h6 className="h3 profile-user-name">{this.person.name}</h6>
                    <small>
                      ({this.person.birthYear || '????'} - {this.person.deathYear || '????'})
                    </small>
                  </div>

                  {this.person.father && (
                    <div className="row columns-border-bw border-top">
                      {indicator(fatherLink, 'Father', 'col-12')}
                    </div>
                  )}

                  {this.person.mother && (
                    <div className="row columns-border-bw border-top">
                      {indicator(motherLink, 'Mother', 'col-12')}
                    </div>
                  )}

                  <div className="row columns-border-bw border-top">
                    {indicator('--', 'Unique Place', 'col-4')}
                    {indicator('--', 'Sources', 'col-4')}
                    {indicator('--', 'Accuracy', 'col-4')}
                  </div>
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
                <Timeline person={this.person} />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
};

Profile.propTypes = propTypes;

export default Profile;
