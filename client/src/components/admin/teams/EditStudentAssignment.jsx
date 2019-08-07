import React, { Component } from 'react';
import { Checkbox, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class EditStudentAssignments extends Component {
  constructor(props) {
    super(props);
    const { currentStudents } = props;
    this.state = {
      studentsList: currentStudents.map(student => Object.assign(student, { isChecked: false })),
    };
  }

  render() {
    const { studentsList } = this.state;
    return (
      <React.Fragment>
        <Grid columns={2} style={{ marginLeft: '50px' }}>
          {studentsList.map(student => (
            <Grid.Column key={student.github} onClick={e => this.selectStudent(e)}>
              <Checkbox
                label={`${student.firstName} ${student.lastName}`}
                style={{ fontSize: '14px' }}
                checked={student.isChecked}
              />
            </Grid.Column>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default EditStudentAssignments;

EditStudentAssignments.propTypes = {
  currentStudents: PropTypes.instanceOf(Array).isRequired
};
