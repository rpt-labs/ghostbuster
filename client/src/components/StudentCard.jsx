import React from 'react';
import PropTypes from 'prop-types';
import Progress from './Progress';
import CommitList from './CommitList';

class StudentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommits: false,
    };
    this.handleShowCommitsChange = this.handleShowCommitsChange.bind(this);
  }

  handleShowCommitsChange() {
    const { showCommits } = this.state;
    this.setState({ showCommits: !showCommits });
  }

  render() {
    const { student, repoName } = this.props;
    const { showCommits } = this.state;
    const githubUrl = `http://www.github.com/${student.github}/${student.cohort}-${repoName}`;

    return (
      <div className="eight wide column">
        <div className="ui two column center aligned stackable grid">
          <div className="student-card row">
            <div className="six wide column">
              <Progress student={student} />
            </div>
            <div className="ten wide column">
              <CommitList
                handleCommitChange={this.handleShowCommitsChange}
                show={showCommits}
                url={githubUrl}
                commits={student.commitMessages}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentCard.propTypes = {
  student: PropTypes.instanceOf(Object).isRequired,
  repoName: PropTypes.string.isRequired,
};

export default StudentCard;
