import React, { Component } from 'react';
import { List, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CreateTeamModal from './CreateTeamModal';

class StudentsList extends Component {
  constructor(props) {
    const { currentStudents } = props;
    super(props);
    this.state = {
      studentsList: currentStudents.map(student => Object.assign(student, { isChecked: false }))
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = e => console.log('Click', e.target.innerHTML);

  render() {
    const { studentsList } = this.state;
    return (
      <React.Fragment>
        <h2>Enrolled Students</h2>
        <List>
          {studentsList.map(student => (
            <List.Item key={student.github}>
              <Checkbox
                label={`${student.firstName} ${student.lastName}`}
                onClick={this.handleClick}
              />
            </List.Item>
          ))}
        </List>
        <CreateTeamModal />
      </React.Fragment>
    );
  }
}

export default StudentsList;

StudentsList.propTypes = {
  currentStudents: PropTypes.instanceOf(Array).isRequired
};
