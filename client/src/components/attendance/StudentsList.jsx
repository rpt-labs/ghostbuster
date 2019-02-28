import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import StudentInfo from './StudentInfo';

const StudentsList = props => {
  const { students } = props;
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Time In</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {students.map(student => (
          <StudentInfo student={student} key={`${student.firstName} - ${student.join_time}`} />
        ))}
      </Table.Body>
    </Table>
  );
};

StudentsList.propTypes = {
  students: PropTypes.instanceOf(Object).isRequired
};

export default StudentsList;
