import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import StudentSummary from './StudentSummary';

const AttendanceSummary = props => {
  const { students } = props;
  return (
    <div>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Time In</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {students.map(student => (
            <StudentSummary student={student} key={`${student.firstName} - ${student.join_time}`} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

AttendanceSummary.propTypes = {
  students: PropTypes.instanceOf(Object).isRequired
};

export default AttendanceSummary;
