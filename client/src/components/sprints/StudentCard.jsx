import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import Progress from './Progress';
import CommitList from './CommitList';

class StudentCard extends React.Component {
  state = {
    showCommits: false,
    showMilestoneCommits: false
  };

  handleShowCommitsChange = () => {
    const { showCommits } = this.state;
    this.setState({
      showCommits: !showCommits,
      showMilestoneCommits: false
    });
  };

  handleShowMilestoneCommitsChange = () => {
    const { showMilestoneCommits } = this.state;
    this.setState({
      showMilestoneCommits: !showMilestoneCommits,
      showCommits: false
    });
  };

  render() {
    const { student, repoName } = this.props;
    const { showCommits, showMilestoneCommits } = this.state;
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
                showMilestoneCommits={showMilestoneCommits}
                handleMilestoneCommitsChange={this.handleShowMilestoneCommitsChange}
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
