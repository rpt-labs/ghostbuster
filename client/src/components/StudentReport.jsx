import React from 'react';
import PropTypes from 'prop-types';

const StudentReport = (props) => {
  const { student, report } = props;
  const style = parseInt(report.numCommits, 10) === 0 ? { color: '#F44D63' } : {};
  return (
    <div className="column">
      <div className="item">
        <div className="content">
          <a className="header">{student}</a>
          <div style={style} className="description">
            Last week: {report.numCommits} commits, {report.numChanges} code changes.
          </div>
        </div>
      </div>
    </div>
  );
};

StudentReport.propTypes = {
  student: PropTypes.string.isRequired,
  report: PropTypes.instanceOf(Object).isRequired,
};

export default StudentReport;
