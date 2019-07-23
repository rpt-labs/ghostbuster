import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CreateTeams from './CreateTeams';
import EditTeams from './EditTeams';

const RenderedContent = props => {
  const {
    cohorts,
    handleRadioButtonChange,
    showDetails,
    tabName,
    selectedCohortStudents,
    selectedCohort
  } = props;

  const activeCohorts = cohorts.filter(cohort => cohort.status.toLowerCase() === 'current');

  if (tabName === 'Manage Teams')
    return (
      <EditTeams
        cohorts={activeCohorts}
        handleRadioButtonChange={handleRadioButtonChange}
        showDetails={showDetails}
      />
    );
  return (
    <CreateTeams
      cohorts={activeCohorts}
      handleRadioButtonChange={handleRadioButtonChange}
      showDetails={showDetails}
      selectedCohortStudents={selectedCohortStudents}
      selectedCohort={selectedCohort}
    />
  );
};

RenderedContent.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  selectedCohortStudents: PropTypes.instanceOf(Array).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showDetails: PropTypes.instanceOf(Object).isRequired,
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
      selectedCohortStudents: []
    };

    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  handleRadioButtonChange(cohortName) {
    const { cohorts } = this.state;
    const newCohortList = cohorts.slice();
    newCohortList.forEach(e => {
      e.isChecked = e.name === cohortName;
    });
    const selectedCohort = newCohortList.filter(cohort => cohort.isChecked);
    this.setState({
      cohorts: newCohortList,
      selectedCohortStudents: [],
      selectedCohort: selectedCohort.length
        ? { name: selectedCohort[0].name.toLowerCase(), id: selectedCohort[0].id }
        : { name: '', id: undefined }
    });
  }

  showDetails() {
    const { selectedCohort, studentsListByCohort } = this.state;
    const selectedCohortDetails = studentsListByCohort.find(
      cohort => cohort.name === selectedCohort.name
    );

    if (selectedCohortDetails) {
      this.setState({
        selectedCohortStudents: selectedCohortDetails.students
      });
    }
  }

  render() {
    const { cohorts, activeItem, selectedCohortStudents, selectedCohort } = this.state;
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
                active={activeItem === 'View/ Edit Teams'}
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
                selectedCohortStudents={selectedCohortStudents}
                selectedCohort={selectedCohort}
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
