import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import AttendanceSummary from './AttendanceSummary';

const CohortAttendanceSummary = props => {
  const { students } = props;
  return (
    <Table collapsing celled striped>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Points</Table.HeaderCell>
          <Table.HeaderCell>Attendance Health</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {students.map(student => (
          <AttendanceSummary
            student={student}
            key={`${student.firstName} - ${student.join_time}`}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

CohortAttendanceSummary.propTypes = {
  students: PropTypes.instanceOf(Object).isRequired
};

export default CohortAttendanceSummary;
