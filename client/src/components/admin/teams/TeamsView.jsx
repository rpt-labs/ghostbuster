import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CreateTeams from './CreateTeams';
import ManageTeams from './ManageTeams';

const { GHOSTBUSTER_BASE_URL } = process.env;

const RenderedContent = props => {
  const {
    cohorts,
    handleRadioButtonChange,
    showDetails,
    showTeamDetails,
    tabName,
    selectedCohortStudents,
    selectedCohort,
    teamsListForSelectedCohort
  } = props;

  const activeCohorts = cohorts.filter(cohort => cohort.status.toLowerCase() === 'current');

  if (tabName === 'Manage Teams')
    return (
      <ManageTeams
        cohorts={activeCohorts}
        handleRadioButtonChange={handleRadioButtonChange}
        showTeamDetails={showTeamDetails}
        selectedCohort={selectedCohort}
        teamsListForSelectedCohort={teamsListForSelectedCohort}
      />
    );
  return (
    <CreateTeams
      cohorts={activeCohorts}
      handleRadioButtonChange={handleRadioButtonChange}
      showDetails={showDetails}
      selectedCohortStudents={selectedCohortStudents}
      selectedCohort={selectedCohort}
      showTeamDetails={showTeamDetails}
      teamsListForSelectedCohort={teamsListForSelectedCohort}
    />
  );
};

RenderedContent.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  selectedCohortStudents: PropTypes.instanceOf(Array).isRequired,
  teamsListForSelectedCohort: PropTypes.instanceOf(Array).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  showTeamDetails: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
  selectedCohort: PropTypes.instanceOf(Object).isRequired
};

class TeamsView extends Component {
  constructor(props) {
    super(props);
    const { cohorts, studentsListByCohort } = this.props;
    this.state = {
      activeItem: 'Create Teams',
      cohorts,
      studentsListByCohort,
      selectedCohort: {},
      selectedCohortStudents: [],
      teamsListForSelectedCohort: []
    };
  }

  handleRadioButtonChange = cohortName => {
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

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const {
      cohorts,
      activeItem,
      selectedCohortStudents,
      selectedCohort,
      teamsListForSelectedCohort
    } = this.state;

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item
                name="Create Teams"
                active={activeItem === 'Create Teams'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Manage Teams"
                active={activeItem === 'Manage Teams'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <Segment>
              <RenderedContent
                tabName={activeItem}
                cohorts={cohorts}
                handleRadioButtonChange={this.handleRadioButtonChange}
                showDetails={this.showDetails}
                showTeamDetails={this.showTeamDetails}
                selectedCohortStudents={selectedCohortStudents}
                selectedCohort={selectedCohort}
                teamsListForSelectedCohort={teamsListForSelectedCohort}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default TeamsView;

TeamsView.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  studentsListByCohort: PropTypes.instanceOf(Array).isRequired
};
