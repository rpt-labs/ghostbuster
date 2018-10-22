import React from 'react';
import axios from 'axios';
import TabNav from './TabNav';
import TopNav from './TopNav';
import Cohort from './Cohort';
import TeamList from './TeamList';
import { fakeData, fakeTeamData, fakeContributionData } from '../../../fakeData';

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
      projectData: {
        'RPT07': {
          fetched: false,
          weekThesisData: {
            'five-of-seven':{},
            'dynamicDuo': {},
          },
          lifetimeData: {
            'five-of-seven': {},
            'dynamicDuo': {},
          },
        },
        'RPT08': {
          fetched: false,
          weekThesisData: {
            'Naboo': {},
            'Tatooine': {},
            'Kashyyk': {},
          },
          lifetimeData: {
            'Naboo': {},
            'Tatooine': {},
            'Kashyyk': {},
          },
        },
      },
      display: 'sprints',
      selectedCohort: 'RPT10',
      loading: false,
      showSegment: false,
      currentCommitData: {},
      currentProjectData: {},
      thesisData: {},
    };
    this.handleSelectCohort = this.handleSelectCohort.bind(this);
    this.handleSelectDisplay = this.handleSelectDisplay.bind(this);
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
    this.setState({ loading: true, showSegment: true }, () => {
      axios.get(`http://localhost:1234/ghostbuster/sprints/${repoString}?cohort=${selectedCohort}`)
        .then(response => this.setState({ currentCommitData: response.data, loading: false, showSegment: true }))
        .catch(error => console.log(error));
    });
  }

  checkProjects() {
    const { selectedCohort, projectData } = {...this.state};
    this.setState({ loading: true, showSegment: true }, () => {
      axios.get(`http://localhost:1234/ghostbuster/teams/contributions/${selectedCohort}/thesis`)
      .then(response => {
        projectData[selectedCohort]['lifetimeData'] = response.data;
        this.setState({ projectData });
      })
      .catch(error => console.log(error));
      axios.get(`http://localhost:1234/ghostbuster/teams/projects/${selectedCohort}`)
        .then(response => {
          projectData[selectedCohort]['weekThesisData'] = response.data.results;
          projectData[selectedCohort].fetched = true;
          this.setState({ projectData, currentProjectData: response.data.results, loading: false })
        })
        .catch(error => console.log(error));
    });
  }

  render() {
    const {
      sprintCohorts,
      teamCohorts,
      selectedCohort,
      loading,
      showSegment,
      currentCommitData,
      currentProjectData,
      display,
      projectData,
    } = this.state;

    let cohorts;

    if (display === 'projects') {
      cohorts = (
        <div className="ui container">
          <TabNav selected={selectedCohort} cohorts={teamCohorts} selectCohort={this.handleSelectCohort} />
          <TeamList selectedCohort={selectedCohort} checkProjects={this.checkProjects} loading={loading} showSegment={showSegment} projects={projectData} />
        </div>);
    } else {
      cohorts = (
        <div className="ui container">
          <TabNav selected={selectedCohort} cohorts={sprintCohorts} selectCohort={this.handleSelectCohort} />
          <Cohort repoSelect={this.handleRepoSelect} loading={loading} showSegment={showSegment} commits={currentCommitData} />
        </div>
      );
    }

    return (
      <div>
        <TopNav handleSelectDisplay={this.handleSelectDisplay} />
        {cohorts}
      </div>
    );
  }
}
