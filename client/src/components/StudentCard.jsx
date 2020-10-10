import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import Progress from './Progress';
import CommitList from './CommitList';

class StudentCard extends React.Component {
  state = {
    showCommits: false
  };

  handleShowCommitsChange = () => {
    const { showCommits } = this.state;
    this.setState({ showCommits: !showCommits });
  };

  render() {
    const { student, repoName } = this.props;
    const { showCommits } = this.state;
    const githubUrl = `http://www.github.com/${student.github}/${student.cohort}-${repoName}`;

    return (
      <Card style={{ minHeight: '150px' }}>
        <Card.Content>
          <span>
            <a target="_blank" rel="noopener noreferrer" href={githubUrl}>
              <Progress student={student} style={{ marginLeft: '20px' }} />
            </a>
            <div style={{ marginTop: '-100px', marginLeft: '200px' }}>
              <CommitList
                handleCommitChange={this.handleShowCommitsChange}
                show={showCommits}
                url={githubUrl}
                commits={student.commitMessages}
                sprint={repoName}
              />
            </div>
          </span>
        </Card.Content>
      </Card>
    );
  }
}

StudentCard.propTypes = {
  student: PropTypes.instanceOf(Object).isRequired,
  repoName: PropTypes.string.isRequired
};

export default StudentCard;
