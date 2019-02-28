import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const StudentInfo = props => {
  const { student } = props;
  const timeIn = student.join_time || 'Absent';

  return (
    <Table.Row key={`${student.firstName} - ${timeIn}`}>
      <Table.Cell>{`${student.firstName} ${student.lastName}`}</Table.Cell>
      <Table.Cell>{timeIn}</Table.Cell>
    </Table.Row>
  );
};

StudentInfo.propTypes = {
  student: PropTypes.instanceOf(Object).isRequired
};

export default StudentInfo;
