import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

const COHORTS = ['RPT13', 'RPT14', 'RPT15'];
const { GHOSTBUSTER_BASE_URL } = process.env;

export default class ToyProblems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCohorts: [],
      selectedCohort: '',
      pullRequestList: []
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
      .then(response => console.log(response))
      .catch(error => {
        throw error;
      });
  }

  render() {
    const { allCohorts } = this.state;
    return (
      <div>
        {allCohorts.map(cohort => {
          return (
            <Button primary key={cohort} onClick={e => this.onButtonClick(e)}>
              {cohort}
            </Button>
          );
        })}
      </div>
    );
  }
}
