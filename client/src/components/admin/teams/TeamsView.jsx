import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import CreateTeams from './CreateTeams';
import EditTeams from './EditTeams';
import { getAllCohorts } from '../../../queries/queries';

const RenderedContent = (props, { tabName = 'Create Teams' }) => {
  console.log('props', props);

  const { cohorts, handleRadioButtonChange, showDetails } = props;

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

class TeamsView extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'Create Teams',
      cohorts: []
    };

    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.getCohortsList = this.getCohortsList.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    this.getCohortsList();
  }

  getCohortsList() {
    getAllCohorts().then(result => {
      const cohortsList = result.data.data.cohorts.map(e => e.name.toUpperCase());
      this.setState({
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
    this.setState({ cohorts: newCohortList });
  }

  showDetails() {
    console.log('TODO: display list of students for the selected cohort');
  }

  render() {
    const { cohorts, activeItem } = this.state;
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
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default TeamsView;
