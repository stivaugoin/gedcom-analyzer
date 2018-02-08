/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { capitalize } from '../../helpers/string';

const propTypes = {
  person: PropTypes.shape().isRequired,
};

const renderEvent = (eventName, place, date) => (
  <div key={eventName} className="single media">
    <figure className="single-user-avatar thumb-xs2">
      <a href="">
        <img
          className="rounded-circle"
          src={require('../../assets/user-widget-bg.jpeg')}
          alt={eventName}
        />
      </a>
    </figure>
    <div className="media-body">
      <div className="single-header clearfix">
        <div className="float-left">
          <span className="single-event-name">{capitalize(eventName)}</span>
          <span className="single-event-place">{place}</span>
        </div>
        <span className="single-event-date float-right">
          <span>{moment(date).format('LL')}</span>
        </span>
      </div>
    </div>
  </div>
);

const Timeline = ({ person }) => (
  <div className="tab-content">
    <div className="tab-pane active">
      <div className="widget-user-activities">
        {person.events().map(event => (
          renderEvent(event.name, event.place, event.date)
        ))}
      </div>
    </div>
  </div>
);

Timeline.propTypes = propTypes;

export default Timeline;
