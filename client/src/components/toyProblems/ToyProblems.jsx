import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import StudentPrDetails from './StudentPrDetails';

// TODO: Get cohortslist from DB/ config
const COHORTS = ['RPT13', 'RPT14', 'RPT15'];
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
    this.setState({ allCohorts: COHORTS });
  }

  onButtonClick(e) {
    const selectedCohort = e.target.innerHTML.toLowerCase();
    this.setState({ selectedCohort }, () => this.checkToyProblems());
  }

  checkToyProblems() {
    const { selectedCohort } = { ...this.state };
    axios
      .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/toyproblems?cohort=${selectedCohort}`)
      .then(response =>
        this.setState({ pullRequestsList: response.data.toyProblems, showDetails: true })
      )
      .catch(error => {
        throw error;
      });
  }

  render() {
    const { allCohorts, pullRequestsList, showDetails } = this.state;
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
        {showDetails ? <StudentPrDetails pullRequestsList={pullRequestsList} /> : <div />}
      </div>
    );
  }
}
