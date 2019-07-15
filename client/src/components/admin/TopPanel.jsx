import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import StudentsView from './student/StudentsView';
import Cohorts from './Cohorts';
import Sprints from './Sprints';
import TeamsView from './teams/TeamsView';
import { getAllCohorts } from '../../queries/queries';

const RenderedContent = ({ tabName = 'Students', cohorts }) => {
  if (tabName === 'Students') return <StudentsView cohorts={cohorts} />;
  if (tabName === 'Cohorts') return <Cohorts />;
  if (tabName === 'Teams') return <TeamsView />;
  return <Sprints />;
};

RenderedContent.propTypes = {
  tabName: PropTypes.string.isRequired,
  cohorts: PropTypes.instanceOf(Array).isRequired
};

class TopPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Students',
      cohorts: [],
      studentsListByCohort: []
    };
    this.handleItemClick = this.handleItemClick.bind(this);
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

  render() {
    const { activeItem, cohorts } = this.state;
    return (
      <div>
        <Menu tabular>
          <Menu.Item
            name="Students"
            active={activeItem === 'Students'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Cohorts"
            active={activeItem === 'Cohorts'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Sprints"
            active={activeItem === 'Sprints'}
            onClick={this.handleItemClick}
          />
          <Menu.Item name="Teams" active={activeItem === 'Teams'} onClick={this.handleItemClick} />
        </Menu>
        <RenderedContent tabName={activeItem} cohorts={cohorts} />
      </div>
    );
  }
}

export default TopPanel;
