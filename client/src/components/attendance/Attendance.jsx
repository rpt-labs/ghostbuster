import React, { Component } from 'react';
import RadioButtonList from './RadioButtonList';

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
    this.handleRadioButtonChangeChange = this.handleRadioButtonChangeChange.bind(this);
  }

  handleRadioButtonChangeChange(cohort) {
    const { cohorts } = this.state;
    const newCohortList = cohorts.slice();
    newCohortList.forEach(e => {
      if (e.name === cohort) {
        e.isChecked = true;
      } else {
        e.isChecked = false;
      }
    });
    this.setState({ cohorts: newCohortList });
  }

  render() {
    const { cohorts } = this.state;

    return (
      <div>
        <RadioButtonList
          cohorts={cohorts}
          handleRadioButtonChangeChange={this.handleRadioButtonChangeChange}
        />
      </div>
    );
  }
}

export default Attendance;
