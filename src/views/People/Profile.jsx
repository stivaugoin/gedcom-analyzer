// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classnames from "classnames";

import db from "../../api/db";
import { Person } from "../../classes";
import personDefaultValue from "../../api/person/defaultValues";
import type { Person as PersonType } from "../../api/person/types";

import Timeline from "../../components/Timeline";
import ParentDetails from "./ParentDetails";

import profileBg from "../../assets/profile-bg.jpg";
import iconMen from "../../assets/men.jpg";
import iconWomen from "../../assets/women.jpg";

type Props = {
  match: { params: { pointer: string } },
};

type State = {
  isLoading: boolean,
  selectedTab: number,
  person: PersonType,
};

class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    (this: any).tabItems = ["History"];

    (this: any).onChangeTab = this.onChangeTab.bind(this);
    (this: any).tabIsSelected = this.tabIsSelected.bind(this);
    (this: any).getPerson = this.getPerson.bind(this);
  }

  state = {
    isLoading: true,
    selectedTab: 0,
    person: personDefaultValue,
  };

  componentDidMount() {
    const { pointer } = this.props.match.params;
    this.getPerson(pointer);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ isLoading: true });

    const { pointer } = nextProps.match.params;
    this.getPerson(pointer);
  }

  onChangeTab(index: number) {
    this.setState({ selectedTab: index });
  }

  getPerson(pointer: string) {
    db.people.get(pointer).then((person: PersonType) => {
      this.setState({ isLoading: false, person });
    });
  }

  tabItems: Array<string>;

  tabIsSelected(tabIndex: number) {
    return tabIndex === this.state.selectedTab;
  }

  render() {
    console.log("Profile - State", this.state);
    const { isLoading, person } = this.state;

    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    const icon = person.sex === "M" ? iconMen : iconWomen;

    const { birthYear, deathYear } = new Person(person);

    const mother = person.parents.find(parent => parent.relation === "mother");
    const motherPointer = mother && mother.pointer;
    const father = person.parents.find(parent => parent.relation === "father");
    const fatherPointer = father && father.pointer;

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
                      ({birthYear} - {deathYear})
                    </small>
                  </div>

                  {motherPointer && (
                    <ParentDetails pointer={motherPointer} title="Mother" />
                  )}

                  {fatherPointer && (
                    <ParentDetails pointer={fatherPointer} title="Father" />
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
                    <a
                      className={classnames("nav-link", {
                        active: this.tabIsSelected(index),
                      })}
                    >
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

export default Profile;
