import { Component } from 'react';
import { Grid, Loader, Segment, Dimmer } from 'semantic-ui-react';
import axios from 'axios';
import RadioButtonList from '../shared/RadioButtonList';
import { getAllCohorts, getAllReleasedToyProblems, getAllCohortsNoDb } from '../../queries/queries';
import StudentPrDetails from './StudentPrDetails';

const { GHOSTBUSTER_BASE_URL } = process.env;
const useDB = false;
const useApi = false;

class ToyProblems extends Component {
  state = {
    cohorts: [],
    pullRequestsList: [],
    showDetails: false,
    selectedCohort: '',
    releasedToyProblems: [],
    isLoading: false
  };

  componentDidMount() {
    if (useApi) {
      this.getCohortsListFromApi();
    } else {
      this.getCohortsList();
    }
  }

  onButtonClick = e => {
    const selectedCohort = e.target.innerHTML.toLowerCase();
    this.setState({ selectedCohort }, () => this.checkToyProblems());
  };

  getCohortsList = () => {
    const cohortsQuery = useDB ? getAllCohorts : getAllCohortsNoDb;
    cohortsQuery().then(result => {
      const cohortsList = result.data.data.cohorts
        .filter(cohort => cohort.status.toLowerCase() === 'current')
        .map(e => e.name.toUpperCase());
      this.setState({
        cohorts: cohortsList.map(e => ({
          name: e,
          isChecked: false
        }))
      });
    });
  };

  getCohortsListFromApi = () => {
    axios.get(`${GHOSTBUSTER_BASE_URL}/api/cohorts/current`).then(response => {
      if (response) {
        const cohorts = response.data.map(cohort => ({
          name: cohort.cohort_id,
          isChecked: false
        }));

        this.setState({ cohorts });
      }
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
    const selectedCohort = cohorts.find(e => e.isChecked === true).name.toLowerCase();
    this.setState({ isLoading: true });
    this.checkReleasedToyProblemsGql(selectedCohort);
    let pullRequestsList = [];
    axios
      .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/toyproblems?cohort=${selectedCohort}`)
      .then(response => {
        if (response && response.data && response.data.toyProblems) {
          pullRequestsList = response.data.toyProblems;
        }
        this.setState({ pullRequestsList, showDetails: true, selectedCohort, isLoading: false });
      })
      .catch(error => {
        throw error;
      });
  };

  checkReleasedToyProblemsGql = async selectedCohort => {
    const response = await getAllReleasedToyProblems(selectedCohort);
    if (response && response.data && response.data.data) {
      const { releasedToyProblems } = response.data.data;
      this.setState({ releasedToyProblems });
    }
  };

  render() {
    const {
      cohorts,
      selectedCohort,
      pullRequestsList,
      showDetails,
      releasedToyProblems,
      isLoading
    } = this.state;

    return (
      <>
        <Grid textAlign="center" style={{ padding: '30px' }}>
          <RadioButtonList
            cohorts={cohorts}
            handleRadioButtonChange={this.handleRadioButtonChange}
            showDetails={this.showDetails}
            buttonLabel="Toy Problems Status"
          />
        </Grid>
        {!isLoading && showDetails && pullRequestsList && pullRequestsList.length && (
          <StudentPrDetails
            pullRequestsList={pullRequestsList}
            selectedCohort={selectedCohort}
            releasedToyProblems={releasedToyProblems}
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

export default ToyProblems;
