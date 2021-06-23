/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { List, Label, Icon } from 'semantic-ui-react';
import { StarIconGreen, StarIconGrey } from '../Styles/StudentCardStyles';
import sprints from '../../../../server/config/sprints';
import utils from '../../../../common/utils';

const CommitList = props => {
  const {
    commits,
    url,
    show,
    showMilestoneCommits,
    handleCommitChange,
    handleMilestoneCommitsChange,
    sprint
  } = props;
  const isNoFork = commits.length === 1 && commits[0].message === 'no fork';

  //  TODO: need to update while using DB
  const { messages } = sprints.allSprints[sprint];
  const milestoneCommits = messages.map(message => message.message);
  const commitsWithMilestoneCommitMessage = commits.filter(
    commit =>
      milestoneCommits.includes(commit.normalizedMessage) ||
      milestoneCommits.some(
        message => utils.getSimilarityPercentage(message, commit.normalizedMessage) >= 0.87
      )
  );

  const uniqueMilestoneCommits = [
    ...new Set(commitsWithMilestoneCommitMessage.map(message => message.normalizedMessage))
  ];

  const commitList = show ? (
    commits.map((commit, i) =>
      milestoneCommits.includes(commit.normalizedMessage) ||
      milestoneCommits.some(
        message => utils.getSimilarityPercentage(message, commit.normalizedMessage) >= 0.87
      ) ? (
        <List.Item key={i}>
          <StarIconGreen name="star" />
          <List.Content style={{ textAlign: 'left' }}>
            <a target="_blank" rel="noopener noreferrer" href={url}>
              <strong style={{ color: 'green' }}>{commit.message}</strong>
            </a>
          </List.Content>
        </List.Item>
      ) : (
        <List.Item key={i}>
          <StarIconGrey name="star" />
          <List.Content style={{ textAlign: 'left' }}>
            <a target="_blank" rel="noopener noreferrer" href={url} style={{ color: 'grey' }}>
              {commit.message}
            </a>
          </List.Content>
        </List.Item>
      )
    )
  ) : (
    <List />
  );

  const filteredMilestoneCommitMessages = [
    ...new Set(
      commits
        .filter(
          commit =>
            milestoneCommits.includes(commit.normalizedMessage) ||
            milestoneCommits.some(
              message => utils.getSimilarityPercentage(message, commit.normalizedMessage) >= 0.87
            )
        )
        .map(item => item.message)
    )
  ];

  const milestoneCommitsList = showMilestoneCommits ? (
    filteredMilestoneCommitMessages.map((message, i) => (
      <List.Item key={i}>
        <StarIconGreen name="star" />
        <List.Content style={{ textAlign: 'left' }}>
          <a target="_blank" rel="noopener noreferrer" href={url}>
            <strong style={{ color: 'green' }}>{message}</strong>
          </a>
        </List.Content>
      </List.Item>
    ))
  ) : (
    <List />
  );

  const noForkMessage = (
    <Label basic color="red" size="huge">
      No Fork
    </Label>
  );

  const commitDetails = (
    <>
      <Label.Group>
        <Label as="a" color="teal" onClick={handleCommitChange} size="large">
          <Icon name="github" />
          Total # of Commits:
          <Label.Detail>{commits.length && !isNoFork ? commits.length : 0}</Label.Detail>
        </Label>
        <Label as="a" color="blue" onClick={handleMilestoneCommitsChange} size="large">
          # of Milestone Commits:
          <Label.Detail>
            {uniqueMilestoneCommits.length ? uniqueMilestoneCommits.length : 0}
          </Label.Detail>
        </Label>
      </Label.Group>
      <List divided relaxed>
        {show && !showMilestoneCommits ? commitList : milestoneCommitsList}
      </List>
    </>
  );

  return (
    <>
      {isNoFork && noForkMessage}
      {!isNoFork && commitDetails}
    </>
  );
};

CommitList.propTypes = {
  commits: PropTypes.instanceOf(Object).isRequired,
  url: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleCommitChange: PropTypes.func.isRequired,
  sprint: PropTypes.string.isRequired
};

export default CommitList;
