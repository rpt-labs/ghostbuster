import React, { Component } from 'react';
import CheckboxList from './CheckboxList';

const cohortsList = ['RPT09', 'RPT10', 'RTP11', 'RPT12', 'RTP13', 'RPT14'];

class Attendance extends Component {
  constructor() {
    super();
    this.state = {
      cohorts: cohortsList.map(e => ({
        name: e,
        isChecked: false,
      })),
    };
  }

  render() {
    const {
      cohorts,
    } = this.state;

    return (
      <div>
        <CheckboxList
          cohorts={cohorts}
        />
      </div>
    );
  }
}

export default Attendance;
