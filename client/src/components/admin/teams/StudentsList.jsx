import React, { Component } from 'react';
import { List, Checkbox, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CreateTeamModal from './CreateTeamModal';

class StudentsList extends Component {
  constructor(props) {
    super(props);
    const { currentStudents } = props;
    this.state = {
      studentsList: currentStudents.map(student => Object.assign(student, { isChecked: false })),
      selectedStudents: [],
      open: false,
      size: 'tiny'
    };
    this.selectStudent = this.selectStudent.bind(this);
  }

  selectStudent = e => {
    const { studentsList } = this.state;
    const currentList = studentsList.slice();
    const name = e.target.innerHTML;
    const firstName = name
      .substring(0, name.indexOf(' '))
      .trim()
      .toLowerCase();
    const lastName = name
      .substring(name.indexOf(' '))
      .trim()
      .toLowerCase();
    const matchedStudent = studentsList.find(
      student =>
        student.firstName.toLowerCase() === firstName && student.lastName.toLowerCase() === lastName
    );
    if (matchedStudent) {
      const index = currentList.indexOf(matchedStudent);
      matchedStudent.isChecked = !matchedStudent.isChecked;
      currentList[index] = matchedStudent;
    }

    this.setState({
      studentsList: currentList
    });
  };

  close = () => {
    this.setState({
      open: false
    });
  };

  handleButtonClick = () => {
    const { studentsList } = this.state;
    this.setState({
      selectedStudents: studentsList.filter(student => student.isChecked),
      open: true
    });
  };

  render() {
    const { studentsList, size, open, selectedStudents } = this.state;
    return (
      <React.Fragment>
        <h2>Enrolled Students</h2>
        <List>
          {studentsList.map(student => (
            <List.Item key={student.github} onClick={e => this.selectStudent(e)}>
              <Checkbox label={`${student.firstName} ${student.lastName}`} />
            </List.Item>
          ))}
        </List>
        <Button onClick={() => this.handleButtonClick()}>Create Team</Button>
        <CreateTeamModal
          close={this.close}
          selectedStudents={selectedStudents}
          size={size}
          open={open}
        />
      </React.Fragment>
    );
  }
}

export default StudentsList;

StudentsList.propTypes = {
  currentStudents: PropTypes.instanceOf(Array).isRequired
};
