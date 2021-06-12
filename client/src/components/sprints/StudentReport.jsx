import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

const StudentReport = props => {
  const { student, report } = props;
  const style = parseInt(report.numCommits, 10) === 0 ? { color: '#F44D63' } : {};
  const message = `Last week: ${report.numCommits} commits, ${report.numChanges} code changes.`;

  return (
    <List>
      <List.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.github.com/${report.github}`}
        >
          {student}
        </a>
      </List.Item>
      <List.Item style={style}>{message}</List.Item>
    </List>
  );
};

StudentReport.propTypes = {
  student: PropTypes.string.isRequired,
  report: PropTypes.instanceOf(Object).isRequired
};

export default StudentReport;
