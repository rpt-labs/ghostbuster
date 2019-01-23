import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Progress from './Progress';
import CommitList from './CommitList';
import { CardGrid } from './Styles/StudentCardStyles';

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
      <Grid.Column width={8}>
        <Grid.Row>
          <CardGrid columns="equal">
            <Grid.Column textAlign="center">
              <Progress student={student} />
            </Grid.Column>
            <Grid.Column floated="right">
              <CommitList
                handleCommitChange={this.handleShowCommitsChange}
                show={showCommits}
                url={githubUrl}
                commits={student.commitMessages}
              />
            </Grid.Column>
          </CardGrid>
        </Grid.Row>
      </Grid.Column>
    );
  }
}

StudentCard.propTypes = {
  student: PropTypes.instanceOf(Object).isRequired,
  repoName: PropTypes.string.isRequired,
};

export default StudentCard;
