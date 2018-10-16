import React from 'react';
import PropTypes from 'prop-types';
import StudentReport from './StudentReport';

const Team = (props) => {
  const { students, team } = props;
  const names = Object.keys(students);
  const reportList = names.map(name => <StudentReport key={name} student={name} report={students[name]} />);

  return (
    <div>
      <h1>{team}</h1>
      {reportList}
    </div>
  );
};

Team.propTypes = {
  students: PropTypes.instanceOf(Object).isRequired,
  team: PropTypes.string.isRequired,
};

export default Team;
