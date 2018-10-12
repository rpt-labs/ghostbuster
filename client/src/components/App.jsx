import React from 'react';
import axios from 'axios';
import Nav from './Nav';
import Cohort from './Cohort';
import fakeData from '../../../fakeData';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cohorts: [
        {
          name: 'RPT07',
        },
        {
          name: 'RPT08',
        },
        {
          name: 'RPT09',
        },
        {
          name: 'RPT10',
        },
        {
          name: 'RPT11',
        },
      ],
      selectedCohort: 'RPT07',
      loading: false,
      currentCommitData: {},
    };
    this.handleSelectCohort = this.handleSelectCohort.bind(this);
    this.handleRepoSelect = this.handleRepoSelect.bind(this);
    this.checkSprints = this.checkSprints.bind(this);
  }

  handleSelectCohort(e) {
    this.setState({ selectedCohort: e.target.innerHTML, currentCommitData: {} });
  }

  handleRepoSelect(repos) {
    this.setState({ repos }, () => {
      this.checkSprints();
    });
  }

  checkSprints() {
    const { repos, selectedCohort } = this.state;
    const repoString = repos.join('+');
    this.setState({ loading: true }, () => {
      axios.get(`http://localhost:1234/ghostbuster/sprints/${repoString}?cohort=${selectedCohort}`)
        .then(response => this.setState({ currentCommitData: response.data, loading: false }))
        .catch(error => console.log(error));
    });
  }

  render() {
    const {
      cohorts,
      selectedCohort,
      loading,
      currentCommitData,
    } = this.state;

    return (
      <div className="ui container">
        <Nav selected={selectedCohort} cohorts={cohorts} selectCohort={this.handleSelectCohort} />
        <Cohort repoSelect={this.handleRepoSelect} loading={loading} commits={currentCommitData} />
      </div>);
  }
}
