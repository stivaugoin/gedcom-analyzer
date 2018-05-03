// @flow
import React from "react";

type Props = {
  person: Object,
};

function calculatePercent(person) {
  const count = [
    person.birth.date ? 1 : 0,
    person.birth.place ? 1 : 0,
    person.birth.sources && person.birth.sources.length > 0 ? 1 : 0,
    person.death.date ? 1 : 0,
    person.death.place ? 1 : 0,
    person.death.sources && person.death.sources.length > 0 ? 1 : 0,
  ];

  const total = count.reduce((acc, curr) => acc + curr, 0);

  return Math.floor(total * 100 / count.length);
}

function getColorClass(percent) {
  if (percent > 90) {
    return "bg-success";
  }

  if (percent > 50 && percent <= 89) {
    return "bg-warning";
  }

  return "bg-danger";
}

const Total = class extends React.Component<Props> {
  render() {
    const { person } = this.props;
    const percent = calculatePercent(person);

    return (
      <div className="progress progress-lg">
        <div
          className={`progress-bar ${getColorClass(percent)}`}
          style={{ width: `${percent}%` }}
          role="progressbar"
        >
          {percent}%
        </div>
      </div>
    );
  }
};

export default Total;
