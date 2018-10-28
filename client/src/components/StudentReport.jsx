import React from 'react';
import PropTypes from 'prop-types';

const StudentReport = (props) => {
  const { student, report } = props;
  const style = parseInt(report.numCommits, 10) === 0
    ? { color: '#F44D63' }
    : {};
  const message = `Last week: ${report.numCommits} commits, ${report.numChanges} code changes.`;

  return (
    <div className="column">
      <div className="item">
        <div className="content">
          <a href={`https://www.github.com/${report.github}`} className="header">{student}</a>
          <div style={style} className="description">
            <span>
              <p>{message}</p>
            </span>
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
