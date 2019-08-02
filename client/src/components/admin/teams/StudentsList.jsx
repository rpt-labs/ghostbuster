import React, { Component } from 'react';
import { Checkbox, Button, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CreateTeamModal from './CreateTeamModal';
import { PaddedGrid } from '../../Styles/TeamStyles';

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
      studentsList: currentList,
      selectedStudents: studentsList.filter(student => student.isChecked)
    });
  };

  close = () => {
    const { studentsList } = this.state;
    this.setState({
      open: false,
      studentsList: studentsList.map(student => Object.assign(student, { isChecked: false })),
      selectedStudents: []
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
    const { selectedCohort, showDetails } = this.props;
    return (
      <React.Fragment>
        <Header as="h2" style={{ textAlign: 'center', marginTop: '15px' }}>
          {`${selectedCohort.name.toUpperCase()} - Enrolled Students`}
        </Header>
        <PaddedGrid columns={3} style={{ marginLeft: '50px' }}>
          {studentsList.map(student => (
            <Grid.Column key={student.github} onClick={e => this.selectStudent(e)}>
              <Checkbox
                label={`${student.firstName} ${student.lastName}`}
                style={{ fontSize: '18px' }}
                checked={student.isChecked}
              />
            </Grid.Column>
          ))}
        </PaddedGrid>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button primary onClick={() => this.handleButtonClick()}>
            Create Team
          </Button>
        </div>
        <CreateTeamModal
          close={this.close}
          selectedStudents={selectedStudents}
          size={size}
          open={open}
          selectedCohort={selectedCohort}
          showDetails={showDetails}
        />
      </React.Fragment>
    );
  }
}

export default StudentsList;

StudentsList.propTypes = {
  currentStudents: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.instanceOf(Object).isRequired,
  showDetails: PropTypes.func.isRequired
};
