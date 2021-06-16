import { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CreateTeams from './CreateTeams';

const { GHOSTBUSTER_BASE_URL } = process.env;

class TeamsView extends Component {
  constructor(props) {
    super(props);
    const { cohorts, studentsListByCohort } = this.props;
    this.state = {
      cohorts,
      studentsListByCohort,
      selectedCohort: {},
      selectedCohortStudents: [],
      teamsListForSelectedCohort: []
    };
  }

  componentDidMount() {
    this.handleSelectionChange();
  }

  handleSelectionChange = cohortName => {
    const { cohorts } = this.state;
    const newCohortList = cohorts.slice();
    newCohortList.forEach(e => {
      e.isChecked = e.name === cohortName;
    });
    const selectedCohort = newCohortList.filter(cohort => cohort.isChecked);
    this.setState({
      cohorts: newCohortList,
      selectedCohortStudents: [],
      teamsListForSelectedCohort: [],
      selectedCohort: selectedCohort.length
        ? { name: selectedCohort[0].name.toLowerCase(), id: selectedCohort[0].id }
        : { name: '', id: undefined }
    });
  };

  showDetails = () => {
    const { selectedCohort, studentsListByCohort } = this.state;
    const { id } = selectedCohort;
    const selectedCohortDetails = studentsListByCohort.find(
      cohort => cohort.name === selectedCohort.name
    );

    if (selectedCohortDetails) {
      this.setState({
        selectedCohortStudents: selectedCohortDetails.students
      });
    }
    axios.get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/teams/cohort/${id}`).then(response => {
      if (response.data) {
        const teamsListForSelectedCohort = response.data.teamsList || [];
        this.setState({ teamsListForSelectedCohort });
      }
    });
  };

  showTeamDetails = () => {
    const { selectedCohort } = this.state;
    const { id } = selectedCohort;

    axios.get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/teams/cohort/${id}`).then(response => {
      if (response.data) {
        const teamsListForSelectedCohort = response.data.teamsList || [];
        this.setState({ teamsListForSelectedCohort });
      }
    });
  };

  render() {
    const {
      cohorts,
      selectedCohortStudents,
      selectedCohort,
      teamsListForSelectedCohort
    } = this.state;

    const activeCohorts = cohorts.filter(cohort => cohort.status.toLowerCase() === 'current');

    return (
      <>
        <Segment>
          <CreateTeams
            cohorts={activeCohorts}
            handleRadioButtonChange={this.handleSelectionChange}
            showDetails={this.showDetails}
            selectedCohortStudents={selectedCohortStudents}
            selectedCohort={selectedCohort}
            showTeamDetails={this.showTeamDetails}
            teamsListForSelectedCohort={teamsListForSelectedCohort}
          />
        </Segment>
      </>
    );
  }
}

export default TeamsView;

TeamsView.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  studentsListByCohort: PropTypes.instanceOf(Array).isRequired
};
