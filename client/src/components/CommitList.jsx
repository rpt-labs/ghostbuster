/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { List, Label, Icon } from 'semantic-ui-react';
import { StarIconGreen, StarIconGrey } from './Styles/StudentCardStyles';
import sprints from '../../../server/config/sprints';

const CommitList = props => {
  const { commits, url, show, handleCommitChange, sprint } = props;

  //  TODO: need to update while using DB
  const { messages } = sprints.allSprints[sprint];
  const milestoneCommits = messages.map(message => message.message);
  const commitsWithMilestoneCommitMessage = commits.filter(commit =>
    milestoneCommits.includes(commit.trim().toLowerCase())
  );

  const uniqueMilestoneCommits = [
    ...new Set(commitsWithMilestoneCommitMessage.map(message => message.toLowerCase()))
  ];

  const commitList = show ? (
    commits.map((commit, i) =>
      milestoneCommits.includes(commit.toLowerCase()) ? (
        <List.Item key={i}>
          <StarIconGreen name="star" />
          <List.Content style={{ textAlign: 'left' }}>
            <a target="_blank" rel="noopener noreferrer" href={url}>
              <strong style={{ color: 'green' }}>{commit}</strong>
            </a>
          </List.Content>
        </List.Item>
      ) : (
        <List.Item key={i}>
          <StarIconGrey name="star" />
          <List.Content style={{ textAlign: 'left' }}>
            <a target="_blank" rel="noopener noreferrer" href={url} style={{ color: 'grey' }}>
              {commit}
            </a>
          </List.Content>
        </List.Item>
      )
    )
  ) : (
    <List />
  );

  return (
    <React.Fragment>
      <Label.Group>
        <Label as="a" color="teal" onClick={handleCommitChange} size="large">
          <Icon name="github" />
          Total # of Commits:
          <Label.Detail>{commits.length ? commits.length : 0}</Label.Detail>
        </Label>
        <Label as="a" color="blue" onClick={handleCommitChange} size="large">
          # of Milestone Commits:
          <Label.Detail>
            {uniqueMilestoneCommits.length ? uniqueMilestoneCommits.length : 0}
          </Label.Detail>
        </Label>
      </Label.Group>
      <List divided relaxed>
        {commitList}
      </List>
    </React.Fragment>
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
