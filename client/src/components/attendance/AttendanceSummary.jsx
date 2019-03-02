import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AttendanceSummary = props => {
  const { student } = props;
  const timeIn = student.join_time || 'Absent';
  let statusColor = 'green';

  if (student.attendanceHealth > 65 && student.attendanceHealth < 85) {
    statusColor = 'yellow';
  }
  if (student.attendanceHealth < 65) {
    statusColor = 'red';
  }

  return (
    <Table.Row key={`${student.firstName} - ${timeIn}`} textAlign="center">
      <Table.Cell>{`${student.firstName} ${student.lastName}`}</Table.Cell>
      <Table.Cell>{student.absencePoints}</Table.Cell>
      <Table.Cell>
        {/* {console.log(student)} */}
        <Link
          to={{
            pathname: `/preview`,
            search: `?cohort=${student.cohort}&lastName=${student.lastName}&firstName=${
              student.firstName
            }`
          }}
        >
          <Button color={statusColor}>{student.attendanceHealth}</Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

AttendanceSummary.propTypes = {
  student: PropTypes.instanceOf(Object).isRequired
};

export default AttendanceSummary;
