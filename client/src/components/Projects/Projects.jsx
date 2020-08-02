import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import RadioButtonList from '../shared/RadioButtonList';
import { getAllCohortsNoDb } from '../../queries/queries';

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      cohorts: [],
      showDetails: false,
      selectedCohort: '',
    };
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.getCohortsList = this.getCohortsList.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    this.getCohortsList();
  }

  onButtonClick(e) {
    const selectedCohort = e.target.innerHTML.toLowerCase();
    this.setState({ selectedCohort }, () => this.checkToyProblems());
  }

  getCohortsList() {
    const cohortsQuery = getAllCohortsNoDb;
    cohortsQuery().then(result => {
      const cohortsList = result.data.data.cohorts
        .filter(cohort => cohort.status.toLowerCase() === 'current')
        .map(e => e.name.toUpperCase());
      this.setState({
        cohorts: cohortsList.map(e => ({
          name: e,
          isChecked: false
        }))
      });
    });
  }

  // eslint-disable-next-line react/sort-comp
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
    console.log('hello');
  }

  render() {
    const { cohorts } = this.state;

    return (
      <React.Fragment>
        <Grid textAlign="center" style={{ padding: '30px' }}>
          <RadioButtonList
            cohorts={cohorts}
            handleRadioButtonChange={this.handleRadioButtonChange}
            showDetails={this.showDetails}
            buttonLabel="Toy Problems Status"
          />
        </Grid>
      </React.Fragment>
    );
  }
}

export default Projects;
