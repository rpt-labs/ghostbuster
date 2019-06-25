import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import RadioButtonList from '../shared/RadioButtonList';
import CohortAttendanceSummary from './CohortAttendanceSummary';
import { getAllCohorts } from '../../queries/queries';
import { attendanceSummary } from '../../../data/demoData';

class Attendance extends Component {
  constructor() {
    super();
    this.state = {
      selectedCohortResult: [],
      cohorts: []
    };
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.showDetails = this.showDetails.bind(this);
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

  handleRadioButtonChange(cohort) {
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

  showDetails() {
    const { cohorts } = this.state;
    const selectedCohort = cohorts.filter(e => e.isChecked === true);
    const selectedCohortData = attendanceSummary.filter(e => {
      return e.cohort === selectedCohort[0].name;
    });
    this.setState({ selectedCohortResult: selectedCohortData });
  }

  render() {
    const { cohorts, selectedCohortResult } = this.state;

    return (
      <React.Fragment>
        <Grid textAlign="center" style={{ padding: '30px' }}>
          <RadioButtonList
            cohorts={cohorts}
            handleRadioButtonChange={this.handleRadioButtonChange}
            showDetails={this.showDetails}
            buttonLabel="SHOW ATTENDANCE"
          />
        </Grid>
        <Grid textAlign="center">
          {selectedCohortResult.length ? (
            <CohortAttendanceSummary students={selectedCohortResult} />
          ) : (
            ''
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default Attendance;
