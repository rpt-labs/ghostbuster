import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';

const StudentSummary = props => {
  const { student } = props;
  const timeIn = student.join_time || 'Absent';
  let statusButton = <Button color="green">{student.attendanceHealth}</Button>;
  if (student.attendanceHealth > 65 && student.attendanceHealth < 85) {
    statusButton = <Button color="yellow">{student.attendanceHealth}</Button>;
  }
  if (student.attendanceHealth < 65) {
    statusButton = <Button color="red">{student.attendanceHealth}</Button>;
  }

  return (
    <Table.Row key={`${student.firstName} - ${timeIn}`}>
      <Table.Cell>{`${student.firstName} ${student.lastName}`}</Table.Cell>
      <Table.Cell>{student.absencePoints}</Table.Cell>
      <Table.Cell>{statusButton}</Table.Cell>
    </Table.Row>
  );
};

StudentSummary.propTypes = {
  student: PropTypes.instanceOf(Object).isRequired
};

export default StudentSummary;
