import React from 'react';
import PropTypes from 'prop-types';

const StudentReport = (props) => {
  const { student, report } = props;
  const reportList = (
    <div>
      <p>
        Commits:
        {report.numCommits}
      </p>
      <p>
        Changes:
        {report.numChanges}
      </p>
    </div>
  );

  return (
    <div>
      <h1>{student}</h1>
      {reportList}
    </div>
  );
};

StudentReport.propTypes = {
  student: PropTypes.string.isRequired,
  report: PropTypes.instanceOf(Object).isRequired,
};

export default StudentReport;
