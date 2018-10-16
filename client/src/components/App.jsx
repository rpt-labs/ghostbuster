import React from 'react';
import axios from 'axios';
import Nav from './Nav';
import Cohort from './Cohort';
import TeamList from './TeamList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprintCohorts: [
        {
          name: 'RPT10',
        },
        {
          name: 'RPT11',
        },
      ],
      teamCohorts: [
        {
          name: 'RPT07',
        },
        {
          name: 'RPT08',
        },
      ],
      display: 'sprints',
      selectedCohort: 'RPT10',
      loading: false,
      currentCommitData: {},
      currentProjectData: {},
    };
    this.handleSelectCohort = this.handleSelectCohort.bind(this);
    this.handleRepoSelect = this.handleRepoSelect.bind(this);
    this.checkSprints = this.checkSprints.bind(this);
    this.checkProjects = this.checkProjects.bind(this);
  }

  handleSelectDisplay(type) {
    const selectedCohort = type === 'sprints' ? 'RPT10' : 'RPT07';
    this.setState({ display: type, selectedCohort });
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

  checkProjects() {
    const { selectedCohort } = this.state;
    this.setState({ loading: true }, () => {
      axios.get(`http://localhost:1234/ghostbuster/teams/projects/${selectedCohort}`)
        .then(response => this.setState({ currentProjectData: response.data.results, loading: false }))
        .catch(error => console.log(error));
    });
  }

  render() {
    const {
      sprintCohorts,
      teamCohorts,
      selectedCohort,
      loading,
      currentCommitData,
      currentProjectData,
      display,
    } = this.state;

    let cohorts;

    if (display === 'projects') {
      cohorts = (
        <div className="ui container">
          <Nav selected={selectedCohort} cohorts={teamCohorts} selectCohort={this.handleSelectCohort} />
          <TeamList checkProjects={this.checkProjects} loading={loading} projects={currentProjectData} />
        </div>);
    } else {
      cohorts = (
        <div className="ui container">
          <Nav selected={selectedCohort} cohorts={sprintCohorts} selectCohort={this.handleSelectCohort} />
          <Cohort repoSelect={this.handleRepoSelect} loading={loading} commits={currentCommitData} />
        </div>
      );
    }

    return (
      <div>
        <h1 onClick={() => this.handleSelectDisplay('sprints')}>Check Sprints</h1>
        <h1 onClick={() => this.handleSelectDisplay('projects')}>Check Projects</h1>
        {cohorts}
      </div>
    );
  }
}
