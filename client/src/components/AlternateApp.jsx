import React, { Component } from 'react';
import axios from 'axios';

// components
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './auth/Login';
import TopNav from './TopNav';
import Cohort from './Cohort';
import TeamList from './TeamList';
import ToyProblems from './toyProblems/ToyProblems';
import Admin from './admin/Admin';
import Attendance from './attendance/Attendance';
import StudentAttendancePreview from './attendance/StudentAttendancePreview';

// queries
// import { getAllCohorts } from '../queries/queries';
import { getAllCohortsNoDb } from '../queries/queries';

const { OKTA_BASE_URL } = process.env;
const { OKTA_CLIENT_ID } = process.env;
const { OKTA_URL } = process.env;
const { GHOSTBUSTER_BASE_URL } = process.env;

/*
  eslint no-underscore-dangle: ["error", { "allowAfterThis": true }]
*/

function onAuthRequired({ history }) {
  history.push('/login');
}

export default class AlternateApp extends Component {
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
      projectData: {}
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

  // use getAllCohorts if using graphQL & DB
  // use getAllCohortsNoDb if using config files only
  getCohorts() {
    // const cohortsQuery = getAllCohorts;
    const cohortsQuery = getAllCohortsNoDb;
    cohortsQuery()
      .then(result => {
        const allCohorts = result.data.data.cohorts;
        const sprintCohorts = allCohorts.filter(
          cohort => cohort.phase === 'sprint' && cohort.status === 'current'
        );
        const teamCohorts = allCohorts.filter(
          cohort => cohort.phase === 'project' && cohort.status === 'current'
        );
        const projectData = {};
        teamCohorts.forEach(cohort => {
          projectData[cohort.cohort_name] = {};
          projectData[cohort.cohort_name].fetched = false;
        });

        if (this._isMounted) {
          this.setState({
            sprintCohorts,
            teamCohorts,
            allCohorts,
            selectedCohort: sprintCohorts[0].cohort_name,
            projectData
          });
        }
      })
      .catch(error => {
        throw error;
      });
  }

  handleSelectDisplay(type) {
    const { sprintCohorts, teamCohorts } = { ...this.state };
    const selectedCohort =
      type === 'sprints' ? sprintCohorts[0].cohort_name : teamCohorts[0].cohort_name;
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
      axios
        .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/sprints/${repoString}?cohort=${selectedCohort}`)
        .then(response =>
          this.setState({
            currentCommitData: response.data,
            loading: false,
            showSegment: true
          })
        )
        .catch(error => {
          throw error;
        });
    });
  }

  checkProjects() {
    const { selectedCohort, projectData } = { ...this.state };
    this.setState({ loading: true, showSegment: true }, () => {
      axios
        .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/teams/projects/${selectedCohort}/thesis/lifetime`)
        .then(response => {
          projectData[selectedCohort].lifetimeData = response.data;
        })
        .catch(error => {
          throw error;
        });
      axios
        .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/teams/projects/${selectedCohort}`)
        .then(response => {
          projectData[selectedCohort].weekThesisData = response.data.results;
          projectData[selectedCohort].fetched = true;
          this.setState({ projectData, loading: false });
        })
        .catch(error => {
          throw error;
        });
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
      projectData
    } = this.state;

    return (
      <Router>
        <Security
          issuer={OKTA_URL}
          clientId={OKTA_CLIENT_ID}
          redirectUri={`${window.location.origin}/implicit/callback`}
          onAuthRequired={onAuthRequired}
        >
          <div>
            <TopNav />

            <Container>
              <SecureRoute path="/" exact component={Home} />
              <SecureRoute path="/admin" component={Admin} />
              <SecureRoute exact path="/attendance" component={Attendance} />
              <SecureRoute path="/attendance/preview" component={StudentAttendancePreview} />
              <SecureRoute
                path="/sprints"
                render={props => (
                  <Cohort
                    {...props}
                    selected={selectedCohort}
                    cohorts={sprintCohorts}
                    selectCohort={this.handleSelectCohort}
                    repoSelect={this.handleRepoSelect}
                    loading={loading}
                    showSegment={showSegment}
                    commits={currentCommitData}
                  />
                )}
              />

              <SecureRoute
                path="/projects"
                render={props => (
                  <TeamList
                    {...props}
                    cohorts={teamCohorts}
                    selectCohort={this.handleSelectCohort}
                    selectedCohort={selectedCohort}
                    checkProjects={this.checkProjects}
                    loading={loading}
                    showSegment={showSegment}
                    projects={projectData}
                  />
                )}
              />

              <SecureRoute
                path="/toyproblems"
                render={() => <ToyProblems cohorts={sprintCohorts} />}
              />

              <Route path="/login" render={() => <Login baseUrl={OKTA_BASE_URL} />} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </Container>
          </div>
        </Security>
      </Router>
    );
  }
}
