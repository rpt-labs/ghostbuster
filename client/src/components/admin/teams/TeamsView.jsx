import React, { Component } from 'react';
import { Grid, Menu, Segment, List, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CreateTeams from './CreateTeams';
import EditTeams from './EditTeams';
import { getAllCohorts } from '../../../queries/queries';

const RenderedContent = props => {
  const { cohorts, handleRadioButtonChange, showDetails, tabName } = props;

  if (tabName === 'View and Edit Teams')
    return (
      <EditTeams
        cohorts={cohorts}
        handleRadioButtonChange={handleRadioButtonChange}
        showDetails={showDetails}
      />
    );
  return (
    <CreateTeams
      cohorts={cohorts}
      handleRadioButtonChange={handleRadioButtonChange}
      showDetails={showDetails}
    />
  );
};

RenderedContent.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showDetails: PropTypes.instanceOf(Object).isRequired,
  tabName: PropTypes.string.isRequired
};

class TeamsView extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'Create Teams',
      cohorts: [],
      studentsListByCohort: [],
      selectedCohort: '',
      studentsListForSelectedCohort: []
    };

    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.getCohortsList = this.getCohortsList.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount() {
    this.getCohortsList();
  }

  getCohortsList() {
    getAllCohorts().then(result => {
      const studentsListByCohort = result.data.data.cohorts;
      const cohortsList = result.data.data.cohorts.map(e => e.name.toUpperCase());
      this.setState({
        studentsListByCohort,
        cohorts: cohortsList.map(e => ({
          name: e,
          isChecked: false
        }))
      });
    });
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  handleRadioButtonChange(cohort) {
    const { cohorts } = this.state;
    const newCohortList = cohorts.slice();
    newCohortList.forEach(e => {
      if (e.name === cohort) {
        e.isChecked = true;
      } else {
        e.isChecked = false;
      }
    });
    const selectedCohort = newCohortList.filter(c => c.isChecked);
    this.setState({
      cohorts: newCohortList,
      selectedCohort:
        selectedCohort.length && selectedCohort[0].name ? selectedCohort[0].name.toLowerCase() : ''
    });
  }

  showDetails() {
    const { selectedCohort, studentsListByCohort } = this.state;
    const selectedCohortDetails = studentsListByCohort.filter(
      cohort => cohort.name === selectedCohort
    );
    if (selectedCohortDetails && selectedCohortDetails.length) {
      this.setState({
        studentsListForSelectedCohort: selectedCohortDetails[0].students
      });
    }
  }

  render() {
    const { cohorts, activeItem, studentsListForSelectedCohort } = this.state;
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
                name="View and Edit Teams"
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
                studentsListForSelectedCohort={studentsListForSelectedCohort}
              />
            </Segment>
            <div>
              {studentsListForSelectedCohort.length ? (
                <List>
                  {studentsListForSelectedCohort.map(student => (
                    <List.Item key={student.github}>
                      <Checkbox label={`${student.firstName} ${student.lastName}`} />
                    </List.Item>
                  ))}
                </List>
              ) : (
                <div />
              )}
            </div>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default TeamsView;
