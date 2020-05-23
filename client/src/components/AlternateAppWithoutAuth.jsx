import React from 'react';
import axios from 'axios';

// components
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './Home';
import TopNav from './TopNav';
import Cohort from './Cohort';
import ToyProblems from './toyProblems/ToyProblems';
import Admin from './admin/Admin';
import Attendance from './attendance/Attendance';
import StudentAttendancePreview from './attendance/StudentAttendancePreview';
// routing

// auth

// queries
// import { getAllCohorts } from '../queries/queries';
import { getAllCohortsNoDb } from '../queries/queries';

const { GHOSTBUSTER_BASE_URL } = process.env;

/*
  eslint no-underscore-dangle: ["error", { "allowAfterThis": true }]
*/

function onAuthRequired({ history }) {
  history.push('/login');
}

export default class AlternateApp extends React.Component {
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
        const sprintCohorts = allCohorts.filter(cohort => cohort.phase === 'sprint');
        const teamCohorts = allCohorts.filter(cohort => cohort.phase === 'project');
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
      // display,
    } = this.state;

    return (
      <Router>

        <div>
          <TopNav />

          <Container>
            <Route path="/" exact component={Home} />
            <Route path="/admin" component={Admin} />
            <Route exact path="/attendance" component={Attendance} />
            <Route path="/attendance/preview" component={StudentAttendancePreview} />
            <Route
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
            <Route path="/toyproblems" render={() => <ToyProblems />} />
          </Container>
        </div>
      </Router>
    );
  }
}
