import { Component } from 'react';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';
import RadioButtonList from '../shared/RadioButtonList';
import { getAllCohortsNoDb } from '../../queries/queries';
import StudentsCommitsList from './StudentsCommitsList';

const { GHOSTBUSTER_BASE_URL } = process.env;

class Projects extends Component {
  state = {
    cohorts: [],
    showDetails: false,
    selectedCohort: '',
    studentsList: [],
    commitDetails: '',
    isLoading: false
  };

  componentDidMount() {
    this.getCohortsList();
  }

  getCohortsList = () => {
    const cohortsQuery = getAllCohortsNoDb;
    cohortsQuery().then(result => {
      const cohortsList = result.data.data.cohorts
        .filter(cohort => cohort.status.toLowerCase() === 'current' && cohort.phase === 'project')
        .map(e => e.name.toUpperCase());
      const cohortsListWithFecSuffix = cohortsList.map(cohort => `${cohort}-FEC`);
      const cohortsListWithSdcSuffix = cohortsList.map(cohort => `${cohort}-SDC`);
      const cohortsListWithPhaseName = [...cohortsListWithFecSuffix, ...cohortsListWithSdcSuffix];
      this.setState({
        cohorts: cohortsListWithPhaseName.map(e => ({
          name: e,
          isChecked: false
        }))
      });
    });
  };

  // eslint-disable-next-line react/sort-comp
  handleRadioButtonChange = cohort => {
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
  };

  showDetails = () => {
    const { cohorts } = this.state;
    this.setState({ isLoading: true });
    const selectedCohort = cohorts.find(e => e.isChecked === true).name.toLowerCase();
    const projectPhase = selectedCohort.split('-')[1] || 'fec';
    axios
      .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/projects?cohort=${selectedCohort.split('-')[0]}`)
      .then(response => {
        const { studentsList = [] } = response && response.data ? response.data : {};
        const urls = [];
        studentsList.forEach(student =>
          urls.push(
            ...student[`${projectPhase}Urls`]
              .split(',')
              .map(url => `${url}/commits?author=${student.github}`)
          )
        );
        return axios
          .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/projects/repolist?urls=${urls}`)
          .then(res => {
            this.setState({
              commitDetails: res.data.commits,
              studentsList,
              showDetails: true,
              selectedCohort,
              isLoading: false
            });
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    const {
      cohorts,
      studentsList,
      showDetails,
      selectedCohort,
      commitDetails,
      isLoading
    } = this.state;
    return (
      <>
        <Grid textAlign="center" style={{ padding: '30px' }}>
          <RadioButtonList
            cohorts={cohorts}
            handleRadioButtonChange={this.handleRadioButtonChange}
            showDetails={this.showDetails}
            buttonLabel="Project Status"
          />
        </Grid>
        {!isLoading && showDetails && studentsList && studentsList.length && (
          <StudentsCommitsList
            studentsList={studentsList}
            selectedCohort={selectedCohort}
            commitDetails={commitDetails}
          />
        )}
        {isLoading && (
          <Segment placeholder>
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          </Segment>
        )}
      </>
    );
  }
}

export default Projects;
