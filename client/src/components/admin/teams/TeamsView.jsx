/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Grid, Menu, Segment, List, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CreateTeams from './CreateTeams';
import EditTeams from './EditTeams';
import CreateTeamModal from './CreateTeamModal';
import { getAllCohorts } from '../../../queries/queries';

const RenderedContent = props => {
  const { cohorts, handleRadioButtonChange, showDetails, tabName } = props;

  if (tabName === 'Manage Teams')
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
  constructor(props) {
    super(props);
    const { cohorts, studentsListByCohort } = this.props;
    this.state = {
      activeItem: 'Create Teams',
      cohorts,
      studentsListByCohort,
      selectedCohort: '',
      selectedCohortStudents: []
    };

    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.showDetails = this.showDetails.bind(this);
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
    const selectedCohort = newCohortList.filter(cohort => cohort.isChecked);
    this.setState({
      cohorts: newCohortList,
      selectedCohort:
        selectedCohort.length && selectedCohort[0].name ? selectedCohort[0].name.toLowerCase() : ''
    });
  }

  showDetails() {
    const { selectedCohort, studentsListByCohort } = this.state;
    const selectedCohortDetails = studentsListByCohort.find(
      cohort => cohort.name === selectedCohort
    );

    if (selectedCohortDetails) {
      this.setState({
        selectedCohortStudents: selectedCohortDetails.students
      });
    }
  }

  render() {
    const { cohorts, activeItem, selectedCohortStudents } = this.state;
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
              />
            </Segment>
            <div>
              {selectedCohortStudents.length ? (
                <React.Fragment>
                  <List>
                    {selectedCohortStudents.map(student => (
                      <List.Item key={student.github}>
                        <Checkbox label={`${student.firstName} ${student.lastName}`} />
                      </List.Item>
                    ))}
                  </List>
                  <CreateTeamModal />
                </React.Fragment>
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

TeamsView.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  studentsListByCohort: PropTypes.instanceOf(Array).isRequired
};
