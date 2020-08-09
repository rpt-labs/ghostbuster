import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import RadioButtonList from '../shared/RadioButtonList';
import { getAllCohortsNoDb } from '../../queries/queries';

const { GHOSTBUSTER_BASE_URL } = process.env;

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
    this.setState({ selectedCohort });
  }

  getCohortsList() {
    const cohortsQuery = getAllCohortsNoDb;
    cohortsQuery().then(result => {
      const cohortsList = result.data.data.cohorts
        .filter(cohort => cohort.status.toLowerCase() === 'current' && cohort.phase === 'project')
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
    const { cohorts } = this.state;
    const selectedCohort = cohorts.find(e => e.isChecked === true).name.toLowerCase();
    axios
      .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/projects?cohort=${selectedCohort}`)
      .then(response => {
        if (response && response.data) {
          console.log('response.......', response)
        }
        // this.setState({ pullRequestsList, showDetails: true, selectedCohort });
      })
      .catch(error => {
        throw error;
      });
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
            buttonLabel="Project Status"
          />
        </Grid>
      </React.Fragment>
    );
  }
}

export default Projects;
