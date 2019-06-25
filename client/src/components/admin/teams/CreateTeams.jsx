import React, { Component } from 'react';
import RadioButtonList from '../../shared/RadioButtonList';
import { getAllCohorts } from '../../../queries/queries';

class CreateTeams extends Component {
  constructor() {
    super();
    this.state = {
      cohorts: []
    };
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
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
    console.log('TODO: display list of students for the selected cohort');
  }

  render() {
    const { cohorts } = this.state;

    return (
      <React.Fragment>
        <RadioButtonList
          cohorts={cohorts}
          handleRadioButtonChange={this.handleRadioButtonChange}
          showDetails={this.showDetails}
          buttonLabel="SHOW DETAILS"
        />
      </React.Fragment>
    );
  }
}

export default CreateTeams;
