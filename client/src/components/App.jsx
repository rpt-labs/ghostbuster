import React from 'react';
import axios from 'axios';

//components
import TabNav from './TabNav';
import TopNav from './TopNav';
import Cohort from './Cohort';
import TeamList from './TeamList';

//queries
import { getAllCohorts } from '../queries/queries';

/*
  eslint no-underscore-dangle: ["error", { "allowAfterThis": true }]
*/

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCohorts: [],
      sprintCohorts: [],
      teamCohorts: [],
      display: '',
      selectedCohort: '',
      loading: false,
      showSegment: true,
      currentCommitData: {},
      projectData: {},
    };
    this.handleSelectCohort = this.handleSelectCohort.bind(this);
    this.handleSelectDisplay = this.handleSelectDisplay.bind(this);
    this.handleRepoSelect = this.handleRepoSelect.bind(this);
    this.checkSprints = this.checkSprints.bind(this);
    this.checkProjects = this.checkProjects.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getCohorts();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getCohorts() {
    getAllCohorts().then((result) => {
      const allCohorts = result.data.data.cohorts;
      const sprintCohorts = allCohorts.filter(cohort => cohort.phase === 'sprint');
      const teamCohorts = allCohorts.filter(cohort => cohort.phase === 'project');
      const projectData = {};
      teamCohorts.forEach((cohort) => {
        projectData[cohort.name] = {};
        projectData[cohort.name].fetched = false;
      });

      if (this._isMounted) {
        this.setState({
          sprintCohorts,
          teamCohorts,
          allCohorts,
          selectedCohort: sprintCohorts[0].name,
          projectData,
        });
      }
    }).catch(error => console.log(error));
  }

  handleSelectDisplay(type) {
    const { sprintCohorts, teamCohorts } = { ...this.state };
    const selectedCohort = type === 'sprints'
      ? sprintCohorts[0].name
      : teamCohorts[0].name;
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
    const { repos, selectedCohort } = { ...this.state };
    const repoString = repos.join('+');
    this.setState({ loading: true, showSegment: true }, () => {
      axios.get(`http://localhost:1234/ghostbuster/sprints/${repoString}?cohort=${selectedCohort}`)
        .then(response => this.setState({
          currentCommitData: response.data,
          loading: false,
          showSegment: true,
        }))
        .catch(error => console.log(error));
    });
  }

  checkProjects() {
    const { selectedCohort, projectData } = { ...this.state };
    this.setState({ loading: true, showSegment: true }, () => {
      axios.get(`http://localhost:1234/ghostbuster/teams/contributions/${selectedCohort}/thesis`)
        .then((response) => {
          projectData[selectedCohort].lifetimeData = response.data;
        })
        .catch(error => console.log(error));
      axios.get(`http://localhost:1234/ghostbuster/teams/projects/${selectedCohort}`)
        .then((response) => {
          projectData[selectedCohort].weekThesisData = response.data.results;
          projectData[selectedCohort].fetched = true;
          this.setState({ projectData, loading: false });
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
      projectData,
      display,
    } = this.state;

    let cohorts;

    if (display === 'projects') {
      cohorts = (
        <div className="ui container">
          <TabNav
            selected={selectedCohort}
            cohorts={teamCohorts}
            selectCohort={this.handleSelectCohort}
          />
          <TeamList
            selectedCohort={selectedCohort}
            checkProjects={this.checkProjects}
            loading={loading}
            showSegment={showSegment}
            projects={projectData}
          />
        </div>
      );
    } else {
      cohorts = (
        <div className="ui container">
          <TabNav
            selected={selectedCohort}
            cohorts={sprintCohorts}
            selectCohort={this.handleSelectCohort}
          />
          <Cohort
            repoSelect={this.handleRepoSelect}
            loading={loading}
            showSegment={showSegment}
            commits={currentCommitData}
          />
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
