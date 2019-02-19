import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import RadioButtonList from './RadioButtonList';
import StudentsList from './StudentsList';
import { getAllCohorts } from '../../queries/queries';

const studentsRecord = [
  { name: 'Jessey', timeJoined: '4:45 p.m', cohort: 'RPT09' },
  { name: 'Jon', timeJoined: '4:50 p.m', cohort: 'RPT09' },
  { name: 'jonny', timeJoined: '4:55 p.m', cohort: 'RPT14' },
  { name: 'Jonn', timeJoined: '4:50 p.m', cohort: 'RPT09' }
];

class Attendance extends Component {
  constructor() {
    super();
    this.state = {
      selectedCohortResult: [],
      cohorts: []
    };
    this.handleRadioButtonChangeChange = this.handleRadioButtonChangeChange.bind(this);
    this.showAttendance = this.showAttendance.bind(this);
    this.getCohortsList = this.getCohortsList.bind(this);
  }

  componentDidMount() {
    this.getCohortsList();
  }

  getCohortsList() {
    getAllCohorts().then(result => {
      const cohortsList = result.data.data.cohorts.map(e => e.name.toUpperCase());
      this.setState({
        cohorts: cohortsList.map(e => ({
          name: e,
          isChecked: false
        }))
      });
    });
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
