import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import RadioButtonList from '../shared/RadioButtonList';
import { getAllCohorts, getAllReleasedToyProblems } from '../../queries/queries';
import StudentPrDetails from './StudentPrDetails';

const { GHOSTBUSTER_BASE_URL } = process.env;

class ToyProblems extends Component {
  constructor() {
    super();
    this.state = {
      cohorts: [],
      pullRequestsList: [],
      showDetails: false,
      selectedCohort: '',
      releasedToyProblems: []
    };
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.getCohortsList = this.getCohortsList.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.checkReleasedToyProblemsGql = this.checkReleasedToyProblemsGql.bind(this);
  }

  componentDidMount() {
    this.getCohortsList();
  }

  onButtonClick(e) {
    const selectedCohort = e.target.innerHTML.toLowerCase();
    this.setState({ selectedCohort }, () => this.checkToyProblems());
  }

  getCohortsList() {
    getAllCohorts().then(result => {
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
    const { cohorts } = this.state;
    const selectedCohort = cohorts.find(e => e.isChecked === true).name.toLowerCase();

    this.checkReleasedToyProblemsGql(selectedCohort);
    let pullRequestsList = [];
    axios
      .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/toyproblems?cohort=${selectedCohort}`)
      .then(response => {
        if (response && response.data && response.data.toyProblems) {
          pullRequestsList = response.data.toyProblems;
        }
        this.setState({ pullRequestsList, showDetails: true, selectedCohort });
      })
      .catch(error => {
        throw error;
      });
  }

  checkReleasedToyProblemsGql = async selectedCohort => {
    const response = await getAllReleasedToyProblems(selectedCohort);
    if (response && response.data && response.data.data) {
      const { releasedToyProblems } = response.data.data;
      this.setState({ releasedToyProblems });
    }
  };

  render() {
    const {
      cohorts,
      selectedCohort,
      pullRequestsList,
      showDetails,
      releasedToyProblems
    } = this.state;

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
        {showDetails && pullRequestsList && pullRequestsList.length && (
          <StudentPrDetails
            pullRequestsList={pullRequestsList}
            selectedCohort={selectedCohort}
            releasedToyProblems={releasedToyProblems}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ToyProblems;
