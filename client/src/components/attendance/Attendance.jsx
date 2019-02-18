import React, { Component } from 'react';
import CheckboxList from './CohortCheckboxList';

const cohortsList = ['RPT09', 'RPT10', 'RTP11', 'RPT12', 'RTP13', 'RPT14'];

class Attendance extends Component {
  constructor() {
    super();
    this.state = {
      cohorts: cohortsList.map(e => ({
        name: e,
        isChecked: false
      }))
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(cohort) {
    const { cohorts } = this.state;
    const newCohortList = cohorts.slice();
    newCohortList.forEach(e => {
      const currentCohort = e;
      if (currentCohort.name === cohort) {
        currentCohort.isChecked = !currentCohort.isChecked;
      }
    });
    this.setState({ cohorts: newCohortList });
  }

  render() {
    const { cohorts } = this.state;

    return (
      <div>
        <CheckboxList cohorts={cohorts} handleCheckboxChange={this.handleCheckboxChange} />
      </div>
    );
  }
}

export default Attendance;
