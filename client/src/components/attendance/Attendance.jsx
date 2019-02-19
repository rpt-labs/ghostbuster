import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import RadioButtonList from './RadioButtonList';
import StudentsList from './StudentsList';

const cohortsList = ['RPT09', 'RPT10', 'RTP11', 'RPT12', 'RTP13', 'RPT14'];
const studentsRecord = [
  { name: 'Jessey', timeJoined: '4:45p.m', cohort: 'RPT09' },
  { name: 'Jon', timeJoined: '4:50p.m', cohort: 'RPT09' },
  { name: 'jonny', timeJoined: '4:55p.m', cohort: 'RPT14' },
  { name: 'Jonn', timeJoined: '4:50p.m', cohort: 'RPT09' }
];

class Attendance extends Component {
  constructor() {
    super();
    this.state = {
      selectedCohortResult: [],
      cohorts: cohortsList.map(e => ({
        name: e,
        isChecked: false
      }))
    };
    this.handleRadioButtonChangeChange = this.handleRadioButtonChangeChange.bind(this);
    this.showAttendance = this.showAttendance.bind(this);
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

  showAttendance() {
    const { cohorts } = this.state;
    const selectedCohort = cohorts.filter(e => e.isChecked === true);
    const selectedCohortData = studentsRecord.filter(e => {
      // console.log('selectedCohortData', e.cohort);
      return e.cohort === selectedCohort[0].name;
    });
    this.setState({ selectedCohortResult: selectedCohortData });
  }

  render() {
    const { cohorts, selectedCohortResult } = this.state;

    return (
      <React.Fragment>
        <Segment style={{ padding: '30px' }}>
          <Grid textAlign="center">
            <RadioButtonList
              cohorts={cohorts}
              handleRadioButtonChangeChange={this.handleRadioButtonChangeChange}
              showAttendance={this.showAttendance}
            />
          </Grid>
        </Segment>
        {selectedCohortResult.length ? <StudentsList students={selectedCohortResult} /> : ''}
      </React.Fragment>
    );
  }
}

export default Attendance;
