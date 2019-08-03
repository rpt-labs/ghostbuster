import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import StudentPrDetails from './StudentPrDetails';
import { getAllCohorts } from '../../queries/queries';

const { GHOSTBUSTER_BASE_URL } = process.env;

export default class ToyProblems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCohorts: [],
      selectedCohort: '',
      pullRequestsList: [],
      showDetails: false
    };
    this.checkToyProblems = this.checkToyProblems.bind(this);
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
    getAllCohorts().then(result => {
      const cohorts = result.data.data.cohorts
        .filter(cohort => cohort.status === 'current')
        .map(cohort => cohort.name.toUpperCase());
      this.setState({
        allCohorts: cohorts
      });
    });
  }

  checkToyProblems() {
    const { selectedCohort } = { ...this.state };
    let pullRequestsList = [];
    axios
      .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/toyproblems?cohort=${selectedCohort}`)
      .then(response => {
        if (response && response.data && response.data.toyProblems) {
          pullRequestsList = response.data.toyProblems;
        }
        this.setState({ pullRequestsList, showDetails: true });
      })
      .catch(error => {
        throw error;
      });
  }

  render() {
    const { allCohorts, selectedCohort, pullRequestsList, showDetails } = this.state;
    return (
      <div>
        <div>
          {allCohorts.map(cohort => {
            return (
              <Button primary key={cohort} onClick={e => this.onButtonClick(e)}>
                {cohort}
              </Button>
            );
          })}
        </div>
        {showDetails && pullRequestsList && pullRequestsList.length ? (
          <StudentPrDetails pullRequestsList={pullRequestsList} selectedCohort={selectedCohort} />
        ) : (
          <div style={{ margin: '30px', fontSize: '40px', fontWeight: 'bold' }}>
            Select a cohort to view details
          </div>
        )}
      </div>
    );
  }
}
